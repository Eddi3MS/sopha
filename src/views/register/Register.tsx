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
import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/user/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Register = () => {
  const { feedback, setFeedback } = useFormFeedback()
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: RegisterSchemaType) => {
    setLoading(true)

    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      await updateProfile(data.user, {
        displayName: values.name,
      })

      dispatch(
        setUser({
          email: values.email,
          id: data.user.uid,
          name: values.name,
        })
      )
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Algo deu errado, tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
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
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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

            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <Loader2Icon className="animate-spin" /> : 'Registrar'}
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
