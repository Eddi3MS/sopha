import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const tasksSchemaDTO = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    dueDate: z.string().min(1),
    priority: z.enum(['HP', 'MP', 'LP']),
    blocked: z.boolean(),
    concluded: z.boolean(),
    status: z.enum(['todo', 'doing', 'done']),
  })
  .array()

export type TasksSchemaDTOType = z.infer<typeof tasksSchemaDTO>
export type TaskSchemaDTOType = z.infer<typeof tasksSchemaDTO.element>

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.string().min(1),
  priority: z.enum(['HP', 'MP', 'LP']),
  status: z.enum(['todo', 'doing', 'done']),
})

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>
