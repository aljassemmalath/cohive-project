import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#000614]">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
