'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import CasamentoLeadsKanban from '@/components/dashboard/CasamentoLeadsKanban';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast-1';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardPage() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Redireciona para login se não estiver autenticado
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Não renderiza o conteúdo se não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F6EEE1]">
        <DashboardHeader currentPage="leads" />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] mb-4">
              Leads
            </h2>
            {/* Barra de busca */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar leads..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              />
            </div>
          </div>
          <CasamentoLeadsKanban searchQuery={searchQuery} />
        </main>
      </div>
    </ToastProvider>
  );
}
