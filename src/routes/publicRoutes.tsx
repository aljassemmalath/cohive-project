import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));

export const publicRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/login', element: <LoginPage /> },
      { path: '/auth/register', element: <RegisterPage /> },
    ],
  },
];
