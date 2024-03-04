import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { Button } from '@/components/ui/Button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase-config'

const Layout = () => {
  const { user } = useAppSelector((state) => state.user)
  console.log('🚀 ~ Layout ~ user:', user)
  return (
    <>
      <header className="flex justify-between w-full p-4 bg-slate-600">
        <h1 className="text-white">Task Manager</h1>
        {user ? (
          <Button variant="destructive" onClick={() => signOut(auth)}>
            logout
          </Button>
        ) : null}
      </header>
      <main className="flex items-center justify-center flex-1 bg-slate-100">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
