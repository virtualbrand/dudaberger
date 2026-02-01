'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (data.session) {
        // Aguarda um momento para garantir que o cookie foi setado
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Força refresh e redireciona - isso garante que o middleware reconheça a nova sessão
        router.refresh();
        window.location.href = '/dashboard';
      } else {
        setError('Erro ao fazer login. Tente novamente.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703535] focus:border-transparent outline-none transition-all"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703535] focus:border-transparent outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
        <LogIn className="w-4 h-4" />
      </button>
    </form>
  );
};

export default LoginForm;
