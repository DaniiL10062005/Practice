import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { CartPage } from '../pages/cart'
import { LoginPage } from '../pages/login'
import { Layout } from '../components/layout/Layout'
import { RegisterPage } from '../pages/register/RegisterPage'
import { ProfilePage } from '../pages/profile'

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
