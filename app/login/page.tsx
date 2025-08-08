'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AuthBackground from '@/components/AuthBackground';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login failed');
      setIsLoading(false);
    } else {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }

  return (
    <>
      <AuthBackground />

      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-white text-4xl font-mono font-semibold tracking-[0.2em] mb-10 select-none"
        >
          SSISTUDIO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-black/50 border border-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-sm"
        >
          <div className="mb-6 text-center">
            <motion.h2
              className="text-white text-xl font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Admin Access
            </motion.h2>
            <p className="text-sm text-white/60 mt-1">Authorized personnel only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 text-white placeholder-white/40 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/30 transition"
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 text-white placeholder-white/40 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/30 transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md font-medium transition duration-200 ${
                isLoading
                  ? 'bg-white/10 text-white cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              }`}
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
            {error && (
              <motion.p
                className="text-red-400 text-xs text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140 }}
            >
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-sm tracking-wide">Verifying credentials...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
