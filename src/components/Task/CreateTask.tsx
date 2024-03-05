import { cn } from '@/lib/utils'
import { CreateTaskSchema, CreateTaskSchemaType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Calendar } from '../ui/Calendar'
import { Card, CardContent, CardHeader } from '../ui/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { DialogTrigger } from '../ui/Dialog'

export const CreateTask = ({
  onSubmitCallback,
}: {
  onSubmitCallback: (task: CreateTaskSchemaType) => void
}) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      description: '',
      priority: 'LP',
      dueDate: new Date().toLocaleDateString(),
      status: 'todo',
      title: '',
    },
  })

  const onSubmit = (values: CreateTaskSchemaType) => {
    startTransition(() => {
      onSubmitCallback(values)
    })
  }

  return (
    <Card className="w-[min(450px,95vw)]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Crie uma Task</p>
      </CardHeader>
      <CardContent>
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
                        <Calendar
                          mode="single"
                          selected={new Date(value)}
                          onSelect={(e) => {
                            onChange(e ? e.toUTCString() : null)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogTrigger asChild>
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
              >
                Salvar
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
