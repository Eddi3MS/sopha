import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { cn } from '@/lib/utils'
import { CreateTaskSchema, CreateTaskSchemaType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

type TaskFormProps =
  | {
      update: (task: CreateTaskSchemaType & { id: string }) => void
      task: CreateTaskSchemaType & { id: string }
    }
  | {
      create: (task: CreateTaskSchemaType) => void
    }

export const TaskForm = (props: TaskFormProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      description: 'task' in props ? props.task.description : '',
      priority: 'task' in props ? props.task.priority : 'LP',
      dueDate: 'task' in props ? props.task.dueDate : new Date().toUTCString(),
      status: 'task' in props ? props.task.status : 'todo',
      title: 'task' in props ? props.task.title : '',
    },
  })

  const onSubmit = (values: CreateTaskSchemaType) => {
    startTransition(() => {
      if ('update' in props) {
        return props.update({ id: props.task.id, ...values })
      }

      props.create(values)
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Fazer a cama.."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="antes do almoço.."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'HP'}>Alta Prioridade</SelectItem>
                    <SelectItem value={'MP'}>Média Prioridade</SelectItem>
                    <SelectItem value={'LP'}>Baixa Prioridade</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'done'}>Finalizado</SelectItem>
                    <SelectItem value={'doing'}>Em Andamento</SelectItem>
                    <SelectItem value={'todo'}>Não Iniciado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Data de Vencimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value ? (
                        new Date(value).toLocaleDateString()
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <PopoverTrigger asChild>
                      <Calendar
                        mode="single"
                        selected={new Date(value)}
                        onSelect={(e) => {
                          onChange(e ? e.toUTCString() : null)
                        }}
                        initialFocus
                      />
                    </PopoverTrigger>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending || !form.formState.isDirty} type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
