'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Building2, Shield } from 'lucide-react';

type Role = 'customer' | 'provider' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login - any email works
    setTimeout(() => {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email,
        role: selectedRole,
        name: email.split('@')[0],
        loggedIn: true,
      }));
      
      // Redirect based on role
      if (selectedRole === 'customer') {
        router.push('/dashboard/customer');
      } else if (selectedRole === 'provider') {
        router.push('/dashboard/provider');
      } else if (selectedRole === 'admin') {
        router.push('/dashboard/admin');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <main>
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-ink dark:text-stock">Welcome Back</h1>
            <p className="text-board-600 dark:text-board-400 mt-1">Sign in to your PrintHub SA account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-board-700 dark:text-board-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="any@email.com"
                required
                className="w-full px-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-700 text-ink dark:text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
              />
              <p className="text-xs text-board-500 dark:text-board-400 mt-1">Any email works (mock auth)</p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-board-700 dark:text-board-300 mb-3">
                Sign in as
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('customer')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'customer'
                      ? 'border-signal bg-signal/5 dark:bg-signal/10'
                      : 'border-stock-200 dark:border-ink-700 hover:border-stock-300 dark:hover:border-ink-600'
                  }`}
                >
                  <User className="h-5 w-5 text-board-600 dark:text-board-400" />
                  <span className="text-xs font-medium text-board-700 dark:text-board-300">Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('provider')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'provider'
                      ? 'border-signal bg-signal/5 dark:bg-signal/10'
                      : 'border-stock-200 dark:border-ink-700 hover:border-stock-300 dark:hover:border-ink-600'
                  }`}
                >
                  <Building2 className="h-5 w-5 text-board-600 dark:text-board-400" />
                  <span className="text-xs font-medium text-board-700 dark:text-board-300">Provider</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'admin'
                      ? 'border-signal bg-signal/5 dark:bg-signal/10'
                      : 'border-stock-200 dark:border-ink-700 hover:border-stock-300 dark:hover:border-ink-600'
                  }`}
                >
                  <Shield className="h-5 w-5 text-board-600 dark:text-board-400" />
                  <span className="text-xs font-medium text-board-700 dark:text-board-300">Admin</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-ink font-semibold py-3 rounded-lg hover:bg-stock transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}