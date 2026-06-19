'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { User, Building2, Shield, Loader2, CheckCircle } from 'lucide-react';

type Role = 'customer' | 'provider' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Mock login - any email works
    setTimeout(() => {
      // Use auth context to login
      login(email, selectedRole);
      setSuccess(true);
      
      // Show success message for 1.5 seconds then redirect
      setTimeout(() => {
        router.push('/');
        router.refresh();
        setLoading(false);
      }, 1500);
    }, 800);
  };

  return (
    <main>
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-ink-raised border border-ink-line rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-stock">Welcome Back</h1>
            <p className="text-stock-dim mt-1">Sign in to your PrintHub SA account</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-confirmed/20 text-confirmed rounded-lg border border-confirmed/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Login successful!</p>
                <p className="text-xs text-confirmed/80">Redirecting to home...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-stock-dim mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="any@email.com"
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-ink-line rounded-lg bg-ink text-stock placeholder-stock-dim focus:outline-none focus:ring-2 focus:ring-signal/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-stock-dim mt-1">Any email works (mock auth)</p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-stock-dim mb-3">
                Sign in as
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => !loading && setSelectedRole('customer')}
                  disabled={loading}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'customer'
                      ? 'border-signal bg-signal/10'
                      : 'border-ink-line hover:border-stock-dim'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <User className={`h-5 w-5 ${
                    selectedRole === 'customer' ? 'text-signal' : 'text-stock-dim'
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedRole === 'customer' ? 'text-signal' : 'text-stock-dim'
                  }`}>
                    Customer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => !loading && setSelectedRole('provider')}
                  disabled={loading}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'provider'
                      ? 'border-signal bg-signal/10'
                      : 'border-ink-line hover:border-stock-dim'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Building2 className={`h-5 w-5 ${
                    selectedRole === 'provider' ? 'text-signal' : 'text-stock-dim'
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedRole === 'provider' ? 'text-signal' : 'text-stock-dim'
                  }`}>
                    Provider
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => !loading && setSelectedRole('admin')}
                  disabled={loading}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === 'admin'
                      ? 'border-signal bg-signal/10'
                      : 'border-ink-line hover:border-stock-dim'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Shield className={`h-5 w-5 ${
                    selectedRole === 'admin' ? 'text-signal' : 'text-stock-dim'
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedRole === 'admin' ? 'text-signal' : 'text-stock-dim'
                  }`}>
                    Admin
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-ink font-semibold py-3 rounded-lg hover:bg-stock transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}