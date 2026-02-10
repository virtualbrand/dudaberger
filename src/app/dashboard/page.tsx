'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast-1';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const { loading, isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  const [reviewClicks, setReviewClicks] = React.useState<number>(0);
  const [loadingStats, setLoadingStats] = React.useState(true);
  
  // Date range - default: mês atual
  const getMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return { start, end };
  };
  
  const { start: monthStart, end: monthEnd } = getMonthRange();
  const [startDate, setStartDate] = React.useState<string>(monthStart.toISOString().split('T')[0]);
  const [endDate, setEndDate] = React.useState<string>(monthEnd.toISOString().split('T')[0]);

  // Marca como montado apenas no cliente
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Redireciona para login se não estiver autenticado
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('Dashboard: Não autenticado, redirecionando para login');
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Busca estatísticas de clicks
  React.useEffect(() => {
    if (isAuthenticated && mounted) {
      loadReviewStats();
    }
  }, [isAuthenticated, mounted, startDate, endDate]);

  const loadReviewStats = async () => {
    try {
      setLoadingStats(true);
      
      // Converte datas para timestamp com hora
      const startDateTime = new Date(startDate + 'T00:00:00').toISOString();
      const endDateTime = new Date(endDate + 'T23:59:59').toISOString();
      
      const { count, error } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'review_click')
        .gte('created_at', startDateTime)
        .lte('created_at', endDateTime);

      if (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } else {
        setReviewClicks(count || 0);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoadingStats(false);
    }
  };
  
  const handleResetToCurrentMonth = () => {
    const { start, end } = getMonthRange();
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  // Mostra loading enquanto verifica autenticação ou enquanto não montou
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Não renderiza o conteúdo se não estiver autenticado
  if (!isAuthenticated) {
    console.log('Dashboard: Usuário não autenticado');
    return null;
  }

  console.log('Dashboard: Renderizando com usuário:', user?.email);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F6EEE1]">
        <DashboardHeader currentPage="dashboard" />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] mb-2">
                  Dashboard
                </h2>
                <p className="text-sm text-gray-600">
                  Acompanhe as métricas do seu negócio
                </p>
              </div>
              
              {/* Filtro de período */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">De:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Até:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]"
                  />
                </div>
                <button
                  onClick={handleResetToCurrentMonth}
                  className="px-3 py-2 text-sm text-[#703535] hover:text-[#D65B58] border border-gray-300 rounded-lg hover:border-[#D65B58] transition-colors"
                >
                  Mês atual
                </button>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card de Clicks em Avaliações */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Star className="size-6 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Clicks no Link de Avaliação
                  </h3>
                </div>
              </div>
              
              {loadingStats ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner size="sm" />
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-[#703535]">
                      {reviewClicks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <TrendingUp className="size-4" />
                    <span>Total de clicks registrados</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a
                      href="/avalie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#703535] hover:underline"
                    >
                      Testar link de avaliação →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
