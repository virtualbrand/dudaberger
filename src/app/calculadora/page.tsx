import type { Metadata } from 'next';
import CalculatorSection from '@/components/pages/calculadora/CalculatorSection';

export const metadata: Metadata = {
  title: 'Calculadora de Margem de Contribuição',
  description: 'Calculadora profissional de Margem de Contribuição e Ponto de Equilíbrio para confeitarias. Analise seus custos, defina preços e tome decisões baseadas em dados.',
  keywords: [
    'calculadora margem contribuição',
    'ponto de equilíbrio',
    'precificação confeitaria',
    'custos fixos',
    'custos variáveis',
    'análise financeira',
    'margem de lucro',
    'confeitaria',
  ],
  openGraph: {
    title: 'Calculadora de Margem de Contribuição | Duda Berger',
    description: 'Ferramenta profissional para calcular margem de contribuição e ponto de equilíbrio da sua confeitaria.',
    url: 'https://dudaberger.com.br/calculadora',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function CalculadoraPage() {
  return (
    <main className="w-full min-h-screen">
      <CalculatorSection />
    </main>
  );
}
