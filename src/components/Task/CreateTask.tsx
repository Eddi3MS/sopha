import { CreateTaskSchemaType } from '@/schemas'
import { TaskForm } from './TaskForm'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog'
import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { useState } from 'react'

export const CreateTask = ({
  onSubmitCallback,
}: {
  onSubmitCallback: (task: CreateTaskSchemaType) => void
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus size={18} />
          <span className="sr-only">criar nova task?</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <Card className="w-[min(450px,95vw)]">
          <CardHeader>
            <p className="text-2xl font-semibold text-center">Crie uma Task</p>
          </CardHeader>
          <CardContent>
            <TaskForm
              create={(task) => {
                onSubmitCallback(task)
                setOpenModal(false)
              }}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
