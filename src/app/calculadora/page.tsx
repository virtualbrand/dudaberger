import type { Metadata } from 'next';
import CalculatorSection from '@/components/pages/calculadora/CalculatorSection';
import './calculadora.css';

export const metadata: Metadata = {
  title: 'Calculadora de Precificação para Confeitaria',
  description: 'Calculadora profissional de Precificação para Confeitaria. Analise seus custos, defina preços e tome decisões baseadas em dados.',
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
    title: 'Calculadora de Precificação para Confeitaria | Duda Berger',
    description: 'Ferramenta profissional de precificação para confeitarias. Calcule seus custos e defina preços lucrativos.',
    url: 'https://dudaberger.com.br/calculadora',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function CalculadoraPage() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#703535' }}>
      <CalculatorSection />
    </div>
  );
}
