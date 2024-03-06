import { CreateTask } from '@/components/Task/CreateTask'
import { Task } from '@/components/Task/Task'
import { db } from '@/firebase-config'
import {
  TaskSchemaDTOType,
  TasksSchemaDTOType,
  tasksSchemaDTO,
} from '@/schemas'
import { useAppSelector } from '@/store/hooks'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Tasks = () => {
  const [tasks, setTasks] = useState<TasksSchemaDTOType>([])
  const user = useAppSelector((state) => state.user.user)!
  const userCollection = `todos_${user.id}`

  useEffect(() => {
    const q = query(collection(db, userCollection))

    const unsubscribe = onSnapshot(q, (qSnap) => {
      const tasksArr: TasksSchemaDTOType = []
      qSnap.forEach((task) => {
        const taskData = task.data() as Omit<TaskSchemaDTOType, 'id'>

        tasksArr.push({ ...taskData, id: task.id })
      })

      const parsedData = tasksSchemaDTO.safeParse(tasksArr)

      if (parsedData.success) {
        setTasks(tasksArr)
      }
    })

    return () => unsubscribe()
  }, [userCollection])

  const updateTask = async (
    todo: { id: string } & Partial<Omit<TaskSchemaDTOType, 'id'>>
  ) => {
    const { id, ...rest } = todo
    await updateDoc(doc(db, userCollection, id), {
      ...rest,
    })
  }

  const createTask = async (
    todo: Omit<TaskSchemaDTOType, 'id' | 'blocked' | 'concluded'>
  ) => {
    await addDoc(collection(db, userCollection), {
      ...todo,
      blocked: false,
      concluded: false,
    })
  }

  const deleteTask = async (todoId: TaskSchemaDTOType['id']) => {
    await deleteDoc(doc(db, userCollection, todoId))
  }

  return (
    <div className="w-[min(98%,1240px)] mx-auto h-full py-4 grid gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-accent-foreground font-bold text-2xl">
          Olá, {user.name}!
        </h2>

        <CreateTask onSubmitCallback={createTask} />
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            handleDeleteTask={deleteTask}
            handleUpdateTask={updateTask}
          />
        ))}
      </div>
    </div>
  )
}

export default Tasks
