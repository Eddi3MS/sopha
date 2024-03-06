import { priorities, statuses } from '@/lib/dictionary'
import { TaskSchemaDTOType } from '@/schemas'
import { Edit, Trash } from 'lucide-react'
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
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog'
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
          <Dialog>
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
              <UpdateTask onSubmitCallback={handleUpdateTask} task={task} />
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            size="smallIcon"
            onClick={handleDeleteTask.bind(null, id)}
            disabled={blocked}
          >
            <Trash size={16} />
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
          />
          <Label htmlFor={`concluded_${id}`} className="cursor-pointer">
            Concluir?
          </Label>
        </div>
      </CardFooter>
    </Card>
  )
}
