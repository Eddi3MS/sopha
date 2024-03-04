import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Login from '../views/login/Login'
import Register from '../views/register/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
])
