import { Navigate, createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Tasks from '@/views/tasks/Tasks'
import PrivateLayout from '@/layouts/PrivateLayout'
import RootLayout from '@/layouts/RootLayout'

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
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
      {
        path: '/tasks',
        element: <PrivateLayout />,
        children: [
          {
            path: '/tasks',
            element: <Tasks />,
          },
        ],
      },
    ],
  },
])
