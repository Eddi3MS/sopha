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
import { LoginSchema, LoginSchemaType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { feedback, setFeedback } = useFormFeedback()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginSchemaType) => {
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      navigate('/tasks')
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
          Bem-vindo de volta
        </h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
              {loading ? <Loader2Icon className="animate-spin" /> : 'Entrar'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link to="/register">Não tem uma conta? registre-se.</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Login
