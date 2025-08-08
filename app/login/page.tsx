'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthBackground from '@/components/AuthBackground';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login failed');
    } else {
      router.push('/');
    }
  }

  return (
    <>
      <AuthBackground />
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="bg-black/50 border border-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-white text-2xl font-semibold tracking-tight">Admin Access</h1>
            <p className="text-sm text-white/60 mt-1">Authorized personnel only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-md font-medium transition"
            >
              Login
            </button>

            {error && (
              <p className="text-red-400 text-xs text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
