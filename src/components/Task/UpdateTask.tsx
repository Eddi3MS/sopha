import { CreateTaskSchemaType } from '@/schemas'
import { TaskForm } from './TaskForm'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { Edit } from 'lucide-react'
import { useState } from 'react'

export const UpdateTask = ({
  onSubmitCallback,
  task,
  blocked,
}: {
  onSubmitCallback: (task: CreateTaskSchemaType & { id: string }) => void
  task: CreateTaskSchemaType & { id: string }
  blocked: boolean
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="smallIcon"
          className=""
          disabled={blocked}
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <Card className="w-[min(450px,95vw)]">
          <CardHeader>
            <p className="text-2xl font-semibold text-center">
              Atualize uma Task
            </p>
          </CardHeader>
          <CardContent>
            <TaskForm
              update={(task) => {
                onSubmitCallback(task)
                setOpenModal(false)
              }}
              task={task}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
