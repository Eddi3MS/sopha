import { FormFeedback } from '@/components/FormFeedback'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { auth } from '@/firebase-config'
import { useFormFeedback } from '@/hooks/useFormFeedback'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const Register = () => {
  const { feedback, setFeedback } = useFormFeedback()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (data) => {
          signOut(auth)

          await updateProfile(data.user, {
            displayName: values.name,
          })

          await sendEmailVerification(data.user, {
            url: import.meta.env.VITE_URL,
          })

          setFeedback({
            type: 'success',
            message: 'Verifique seu e-mail para finalizar o registro.',
          })
        })
        .catch(() => {
          setFeedback({
            type: 'error',
            message: 'Algo deu errado, tente novamente mais tarde.',
          })
        })
    })
  }

  return (
    <Card className="w-[min(400px,96%)] shadow-md">
      <CardHeader>
        <h2 className="text-lg font-semibold text-center text-accent-foreground">
          Bem-vindo
        </h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="João da Silva"
                        type="text"
                        error={!!form.formState.errors.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="joão.silva@example.com"
                        type="email"
                        error={!!form.formState.errors.email}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        error={!!form.formState.errors.password}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {feedback && (
              <FormFeedback message={feedback.message} type={feedback.type} />
            )}

            <Button disabled={isPending} type="submit" className="w-full">
              Registrar
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link to="/login">Já tem uma conta? faça login.</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Register
