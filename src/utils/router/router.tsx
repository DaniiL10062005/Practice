import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../../components'
import { HomePage } from '../../pages/home'
import { CartPage } from '../../pages/cart'
import { ProfilePage } from '../../pages/profile'
import { ControlPage } from '../../pages/control/ControlPage'
import { LoginPage } from '../../pages/login'
import { RegisterPage } from '../../pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/control',
        element: <ControlPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
