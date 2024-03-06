import { CreateTaskSchemaType } from '@/schemas'
import { TaskForm } from './TaskForm'
import { Card, CardContent, CardHeader } from '../ui/Card'

export const CreateTask = ({
  onSubmitCallback,
}: {
  onSubmitCallback: (task: CreateTaskSchemaType) => void
}) => {
  return (
    <Card className="w-[min(450px,95vw)]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Crie uma Task</p>
      </CardHeader>
      <CardContent>
        <TaskForm create={onSubmitCallback} />
      </CardContent>
    </Card>
  )
}