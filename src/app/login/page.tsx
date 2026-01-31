'use client';

import Image from 'next/image';
import { LoginForm } from '@/components/pages/login';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Limpa sessões inválidas ao carregar a página de login
  useEffect(() => {
    const clearInvalidSession = async () => {
      if (supabase && !isAuthenticated && !loading) {
        try {
          // Tenta obter a sessão
          const { error } = await supabase.auth.getSession();
          
          // Se houver erro (token inválido), limpa completamente
          if (error) {
            await supabase.auth.signOut();
            // Limpa localStorage manualmente
            if (typeof window !== 'undefined') {
              const keys = Object.keys(localStorage);
              keys.forEach(key => {
                if (key.startsWith('sb-')) {
                  localStorage.removeItem(key);
                }
              });
            }
          }
        } catch (err) {
          console.error('Erro ao limpar sessão:', err);
        }
      }
    };
    
    clearInvalidSession();
  }, [isAuthenticated, loading]);

  // Redireciona para dashboard se já estiver autenticado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <section className="min-h-screen bg-[#d4c4b2] flex items-center justify-center">
        <div className="text-[#703535] text-lg">Carregando...</div>
      </section>
    );
  }

  // Não renderiza se já estiver autenticado
  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="min-h-screen bg-[#d4c4b2] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      
      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>

      <div className="w-full max-w-[500px] mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-unbounded text-[#703535]">
            Duda Berger
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
