import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#000614]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-[#28324F] bg-[#0B1020] p-8">
        <h1 className="text-2xl font-bold text-white">COHIVE</h1>
        <p className="text-sm text-[#8C95B1]">Sign in to your account</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 w-full rounded border border-[#28324F] bg-[#12182B] px-3 text-sm text-white placeholder-[#8C95B1] focus:border-[#7A4FE6] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded border border-[#28324F] bg-[#12182B] px-3 text-sm text-white placeholder-[#8C95B1] focus:border-[#7A4FE6] focus:outline-none"
        />
        <button
          type="submit"
          className="h-10 w-full rounded bg-[#7A4FE6] text-sm font-medium text-white transition-colors hover:bg-[#6a3fd4]"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
