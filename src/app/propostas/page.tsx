'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import PropostasTable from '@/components/dashboard/PropostasTable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast-1';
import { Spinner } from '@/components/ui/spinner';

export default function PropostasPage() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

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
        <DashboardHeader currentPage="propostas" />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <PropostasTable />
        </main>
      </div>
    </ToastProvider>
  );
}
