import { useAppSelector } from '@/store/hooks'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  const user = useAppSelector((state) => state.user)

  if (!user.user) {
    return <Navigate to="/login" />
  }

  return (
    <main className="flex-1 p-4">
      <Outlet />
    </main>
  )
}

export default PrivateLayout
