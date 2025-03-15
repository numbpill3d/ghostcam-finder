
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { LogIn, Loader2 } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await signIn(email, password);
    
    if (success) {
      navigate('/discover');
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="bg-black/60 p-8 rounded-lg border border-primary/30 shadow-glow">
          <h1 className="text-2xl font-bold mb-6 text-center terminal-text">SYSTEM.ACCESS</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-mono text-primary">
                EMAIL.IDENTIFIER
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-mono bg-black/50 border-primary/30 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-mono text-primary">
                SECURE.PASSKEY
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-mono bg-black/50 border-primary/30 focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-primary text-white font-mono rounded-md hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="size-5 animate-spin mr-2" />
              ) : (
                <LogIn className="size-5 mr-2" />
              )}
              AUTHENTICATE
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New to OmniEye?{' '}
              <Link to="/sign-up" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
