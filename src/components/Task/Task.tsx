import { priorities, statuses } from '@/lib/dictionary'
import { TaskSchemaDTOType } from '@/schemas'
import { Trash } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card'
import { Checkbox } from '../ui/Checkbox'
import { Label } from '../ui/Label'
import { UpdateTask } from './UpdateTask'

export const Task = ({
  blocked,
  concluded,
  handleDeleteTask,
  handleUpdateTask,
  ...task
}: TaskSchemaDTOType & {
  handleDeleteTask: (id: string) => void
  handleUpdateTask: (
    id: { id: string } & Partial<Omit<TaskSchemaDTOType, 'id'>>
  ) => void
}) => {
  const { description, dueDate, id, priority, status, title } = task
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-4">
          <UpdateTask
            onSubmitCallback={handleUpdateTask}
            task={task}
            blocked={blocked}
          />

          <Button
            variant="destructive"
            size="smallIcon"
            onClick={handleDeleteTask.bind(null, id)}
            disabled={blocked}
          >
            <Trash size={16} />
            <span className="sr-only">deletar task?</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex  justify-between">
          <div className="flex gap-2">
            <Badge>{statuses[status]}</Badge>
            <Badge className={priorities[priority].bg}>
              {priorities[priority].text}
            </Badge>
          </div>
          <span>{new Date(dueDate).toLocaleDateString()}</span>
        </div>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex gap-8">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`blocked_${id}`}
            defaultChecked={blocked}
            onCheckedChange={(checked) =>
              handleUpdateTask({ blocked: !!checked, id })
            }
            aria-label="bloquear task?"
          />
          <Label htmlFor={`blocked_${id}`} className="cursor-pointer">
            Bloquear?
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            defaultChecked={concluded}
            id={`concluded_${id}`}
            onCheckedChange={(checked) => {
              handleUpdateTask({
                concluded: !!checked,
                id,
              })
            }}
            aria-label="marcar como concluída?"
          />
          <Label htmlFor={`concluded_${id}`} className="cursor-pointer">
            Concluir?
          </Label>
        </div>
      </CardFooter>
    </Card>
  )
}
