export function assetPath(path: string): string {
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const clean = path.replace(/^(\.\/|\/)/, '');
  if (import.meta.env.DEV) {
    return `/${clean}`;
  }
  return `./${clean}`;
}
