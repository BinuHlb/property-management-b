'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to Supabase or desired auth provider
    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Image/Visual with Momentum Colors */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-momentum-ocean-blue via-momentum-pale-violet to-momentum-powder-pink overflow-hidden">
        <div className="absolute inset-0 bg-momentum-ocean-blue/90"></div>
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-momentum-diamond-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-momentum-powder-pink/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-momentum-crayola-yellow/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white mx-auto">
          <div className="max-w-md space-y-6">
            <Logo className="text-2xl mb-6 text-momentum-diamond-blue" />
            <h2 className="text-[3.25rem] font-bold leading-tight text-white">
              Find your perfect property
            </h2>
            <p className="text-base text-white/90 leading-relaxed">
              Discover premium properties in prime locations. Modern living spaces designed for your lifestyle.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-momentum-powder-pink"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-momentum-pale-violet"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-momentum-crayola-yellow"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Trusted by 10,000+ users</p>
                <p className="text-xs text-white/70">Join our community today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-[var(--font-playfair)] font-bold text-momentum-ocean-blue leading-tight mb-2">
                Welcome back
              </h1>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2">
                <span className="text-foreground/70 text-sm">to</span>
                <Logo className="text-xl md:text-2xl" />
              </div>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-md">
              Sign in to your account to access your properties and continue your search
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-border bg-card focus:border-momentum-ocean-blue focus:ring-1 focus:ring-momentum-ocean-blue/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-border bg-card focus:border-momentum-ocean-blue focus:ring-1 focus:ring-momentum-ocean-blue/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-border text-momentum-ocean-blue focus:ring-momentum-ocean-blue/20"
                />
                <Label htmlFor="remember" className="text-sm text-foreground/70 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link
                href="#"
                className="text-sm text-momentum-ocean-blue hover:text-momentum-ocean-blue/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 transition-colors shadow-md hover:shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="text-center lg:text-left pt-4 border-t border-border/50">
            <p className="text-sm text-foreground/70">
              Don't have an account?{' '}
              <Link
                href="#"
                className="text-momentum-ocean-blue hover:text-momentum-ocean-blue/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
