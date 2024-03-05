import { useAppSelector } from '@/store/hooks'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  const user = useAppSelector((state) => state.user)

  if (!user.user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateLayout
