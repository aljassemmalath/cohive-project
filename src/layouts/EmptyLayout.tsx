import { Outlet } from 'react-router-dom';

export function EmptyLayout() {
  return (
    <div className="min-h-screen bg-[#000614]">
      <Outlet />
    </div>
  );
}
