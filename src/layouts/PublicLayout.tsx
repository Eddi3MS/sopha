import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const PublicLayout = () => {
  const { user } = useAppSelector((state) => state.user)

  if (user) {
    return <Navigate to="/tasks" />
  }

  return (
    <main className="flex items-center justify-center flex-1 bg-slate-100">
      <Outlet />
    </main>
  )
}

export default PublicLayout
