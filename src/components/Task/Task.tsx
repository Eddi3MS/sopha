import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card'
import { Button } from '../ui/Button'
import { Edit, Trash } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Checkbox } from '../ui/Checkbox'
import { Label } from '../ui/Label'
import { TaskSchemaDTOType } from '@/schemas'
import { priorities, statuses } from '@/lib/dictionary'

export const Task = ({
  title,
  status,
  priority,
  dueDate,
  id,
  description,
  blocked,
  concluded,
  handleDeleteTask,
  handleUpdateTask,
}: TaskSchemaDTOType & {
  handleDeleteTask: (id: string) => void
  handleUpdateTask: (
    id: { id: string } & Partial<Omit<TaskSchemaDTOType, 'id'>>
  ) => void
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-4">
          <Button variant="outline" size="smallIcon" className="">
            <Edit size={16} />
          </Button>
          <Button
            variant="destructive"
            size="smallIcon"
            onClick={handleDeleteTask.bind(null, id)}
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
