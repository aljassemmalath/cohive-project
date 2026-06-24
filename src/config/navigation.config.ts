import type { NavigationSection } from '../types';

export const navigationConfig: NavigationSection[] = [
  {
    label: 'Workspace',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: './svg/dashboard-default.svg',
        iconHover: './svg/dashboard-hover.svg',
        iconActive: './svg/dashboard-active.svg',
        roles: ['admin', 'manager', 'member', 'viewer'],
      },
    ],
  },
  {
    label: 'Work',
    items: [
      {
        label: 'Projects',
        path: '/projects',
         icon: './svg/folder-default.svg',
        iconHover: './svg/folder-hover.svg',
        iconActive: './svg/folder-active.svg',
        roles: ['admin', 'manager', 'member', 'viewer'],
        children: [
          { label: 'All Projects', path: '/projects', icon: '', iconHover: '', iconActive: '', roles: ['admin', 'manager', 'member', 'viewer'] },
          { label: 'Templates', path: '/projects/templates', icon: '', iconHover: '', iconActive: '', roles: ['admin', 'manager'] },
        ],
      },
      {
        label: 'Tasks',
        path: '/tasks',
        icon: './svg/clipboard-list-default.svg',
        iconHover: './svg/clipboard-list-hover.svg',
        iconActive: './svg/clipboard-list-active.svg',
        roles: ['admin', 'manager', 'member', 'viewer'],
        children: [
          { label: 'All Tasks', path: '/tasks', icon: '', iconHover: '', iconActive: '', roles: ['admin', 'manager', 'member', 'viewer'] },
          { label: 'Dependencies', path: '/tasks/dependencies', icon: '', iconHover: '', iconActive: '', roles: ['admin', 'manager'] },
        ],
      },
    ],
  },
  {
    label: 'Collaborate',
    items: [
      {
        label: 'Messages',
        path: '/messages',
        icon: './svg/messages-default.svg',
        iconHover: './svg/messages-hover.svg',
        iconActive: './svg/messages-active.svg',
        roles: ['admin', 'manager', 'member'],
      },
      {
        label: 'Approvals',
        path: '/approvals',
        icon: './svg/shield-check-default.svg',
        iconHover: './svg/shield-check-hover.svg',
        iconActive: './svg/shield-check-active.svg',
        roles: ['admin', 'manager'],
        permissions: ['approvals:read', 'approvals:approve'],
      },
    ],
  },
  {
    label: 'Insights',
    items: [
      {
        label: 'Reports',
        path: '/reports',
        icon: './svg/file-chart-default.svg',
        iconHover: './svg/file-chart-hover.svg',
        iconActive: './svg/file-chart-active.svg',
        roles: ['admin', 'manager'],
        permissions: ['reports:view'],
      },
    ],
  },
  {
    label: 'Playground',
    items: [
      {
        label: 'Components',
        path: '/components',
        icon: './svg/dashboard-default.svg',
        iconHover: './svg/dashboard-hover.svg',
        iconActive: './svg/dashboard-active.svg',
        roles: ['admin', 'manager', 'member', 'viewer'],
      },
    ],
  },
];
