import { CreateTaskSchemaType } from '@/schemas'
import { TaskForm } from './TaskForm'
import { Card, CardContent, CardHeader } from '../ui/Card'

export const UpdateTask = ({
  onSubmitCallback,
  task,
}: {
  onSubmitCallback: (task: CreateTaskSchemaType & { id: string }) => void
  task: CreateTaskSchemaType & { id: string }
}) => {
  return (
    <Card className="w-[min(450px,95vw)]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Atualize uma Task</p>
      </CardHeader>
      <CardContent>
        <TaskForm update={onSubmitCallback} task={task} />
      </CardContent>
    </Card>
  )
}
