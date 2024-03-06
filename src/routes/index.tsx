import { Loading } from '@/components/Loading'
import PrivateLayout from '@/layouts/PrivateLayout'
import RootLayout from '@/layouts/RootLayout'
import { Suspense, lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
const Register = lazy(() => import('../views/register/Register'))
const Login = lazy(() => import('../views/login/Login'))
const Tasks = lazy(() => import('../views/tasks/Tasks'))

/* todo lazy loading */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/login" />,
          },
          {
            path: '/login',
            element: (
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: '/register',
            element: (
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/tasks',
        element: <PrivateLayout />,
        children: [
          {
            path: '/tasks',
            element: (
              <Suspense fallback={<Loading />}>
                <Tasks />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])
