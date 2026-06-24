export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: string;
  version: string;
  uploader: { initials: string; name: string };
  uploadedAt: string;
  previousVersions: { version: string; date: string; note?: string; uploader: string }[];
  outdated: boolean;
  task?: string;
  decision?: string;
}

export const FILES: ProjectFile[] = [
  {
    id: '1',
    name: 'Dashboard Design',
    type: 'figma',
    size: '12 MB',
    version: 'v2.3',
    uploader: { initials: 'OM', name: 'Olivia M.' },
    uploadedAt: '2h ago',
    previousVersions: [
      { version: 'v2.2', date: '3d ago', uploader: 'Olivia M.' },
      { version: 'v2.1', date: '1w ago', uploader: 'Alex H.' },
    ],
    outdated: false,
    task: '142',
  },
  {
    id: '2',
    name: 'API Spec v3',
    type: 'pdf',
    size: '2.4 MB',
    version: 'v3.1',
    uploader: { initials: 'SK', name: 'Samuel K.' },
    uploadedAt: '1d ago',
    previousVersions: [],
    outdated: true,
    decision: '8',
  },
  {
    id: '3',
    name: 'User Research Report',
    type: 'doc',
    size: '8.1 MB',
    version: 'v1.0',
    uploader: { initials: 'JH', name: 'Jessica H.' },
    uploadedAt: '3d ago',
    previousVersions: [],
    outdated: false,
  },
];
