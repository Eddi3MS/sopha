import { Button } from '@/components/ui/Button'
import { auth } from '@/firebase-config'
import { useAppSelector } from '@/store/hooks'
import { signOut } from 'firebase/auth'
import { Loader2Icon, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  const user = useAppSelector((state) => state.user.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <>
      <header className="w-full p-4 bg-slate-600 h-[80px] fade-in sticky top-0 flex items-center">
        <div className="w-[min(98%,1240px)] mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">Task Manager</h1>
          {user ? (
            <Button
              variant="destructive"
              onClick={() => signOut(auth)}
              className="p-0 w-[40px]"
            >
              <LogOut size={18} />
            </Button>
          ) : null}
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default RootLayout
