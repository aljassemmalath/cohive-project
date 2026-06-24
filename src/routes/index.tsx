import { createBrowserRouter, Navigate } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import { EmptyLayout } from '../layouts/EmptyLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  ...publicRoutes,
  ...protectedRoutes,
  {
    element: <EmptyLayout />,
    children: [
      { path: '*', element: <div className="p-6 text-white">404 Not Found</div> },
    ],
  },
]);
