'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(
        result.error.includes('prób logowania')
          ? result.error
          : 'Nieprawidłowy email lub hasło'
      );
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFD] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-12 mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-funnel)] font-bold text-2xl text-[#122056]">Panel administracyjny</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#122056] mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-[#122056] mb-1.5">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B65DC] text-white font-semibold py-3 rounded-xl hover:bg-[#4a53c7] transition-colors disabled:opacity-60"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  );
}
