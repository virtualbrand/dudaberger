'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button-1';
import { AlertTriangle } from 'lucide-react';

export default function LeadsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Leads error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-4">
            <AlertTriangle className="size-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#703535] mb-2">
          Algo deu errado
        </h1>
        
        <p className="text-gray-600 mb-6">
          Ocorreu um erro ao carregar os leads. Por favor, tente novamente.
        </p>

        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            variant="primary"
            size="md"
          >
            Tentar novamente
          </Button>

          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="secondary"
            size="md"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
