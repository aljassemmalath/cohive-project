import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../auth/guards/ProtectedRoute';

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const ProjectsPage = lazy(() => import('../pages/projects/ProjectsPage'));
const TemplatesPage = lazy(() => import('../pages/templates/TemplatesPage'));
const TasksPage = lazy(() => import('../pages/tasks/TasksPage'));
const DependenciesPage = lazy(() => import('../pages/dependencies/DependenciesPage'));
const FilesPage = lazy(() => import('../pages/files/FilesPage'));
const MessagesPage = lazy(() => import('../pages/messages/MessagesPage'));
const ApprovalsPage = lazy(() => import('../pages/approvals/ApprovalsPage'));
const ReportsPage = lazy(() => import('../pages/reports/ReportsPage'));
const PeoplePage = lazy(() => import('../pages/people/PeoplePage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const NotificationsPage = lazy(() => import('../pages/notifications/NotificationsPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const ComponentsPage = lazy(() => import('../pages/components/ComponentsPage'));
const ProjectDetailsPage = lazy(() => import('../pages/projects/ProjectDetailsPage'));

export const protectedRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, path: '/dashboard', element: <DashboardPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/templates', element: <TemplatesPage /> },
      { path: '/projects/:projectId', element: <ProjectDetailsPage /> },
      { path: '/tasks', element: <TasksPage /> },
      { path: '/tasks/dependencies', element: <DependenciesPage /> },
      { path: '/files', element: <FilesPage /> },
      { path: '/messages', element: <MessagesPage /> },
      { path: '/approvals', element: <ApprovalsPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '/people', element: <PeoplePage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/components', element: <ComponentsPage /> },
    ],
  },
];
