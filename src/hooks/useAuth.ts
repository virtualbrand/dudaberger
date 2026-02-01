import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Obtém a sessão inicial
    supabase.auth.getSession().then(({ data, error }: { data: { session: Session | null }, error: AuthError | null }) => {
      // Se houver erro (token inválido/expirado), limpa a sessão
      if (error) {
        console.error('Erro ao obter sessão:', error);
        if (supabase) {
          supabase.auth.signOut();
        }
        setSession(null);
        setUser(null);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    }).catch((error: Error) => {
      // Captura erros não tratados
      console.error('Erro inesperado ao obter sessão:', error);
      if (supabase) {
        supabase.auth.signOut();
      }
      setSession(null);
      setUser(null);
      setLoading(false);
    });

    // Escuta mudanças no estado de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      // Se houver erro de autenticação, limpa a sessão
      if (event === 'TOKEN_REFRESHED' && !session) {
        if (supabase) {
          supabase.auth.signOut();
        }
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!session,
  };
}
