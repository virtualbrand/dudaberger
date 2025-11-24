import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SectionErrorBoundary from '@/components/SectionErrorBoundary';

// Dynamic imports com loading states para reduzir bundle inicial
const HeroSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-amaranth-500)]" /></div>,
  ssr: true
});

const SecondSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.SecondSection })), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
});

const PainSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.PainSection })), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: true
});

const HowToSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.HowToSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: true
});

const CronogramaSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.CronogramaSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: true
});

const PricingSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: true
});

const FAQSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: true
});

const AboutSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
});

const DisclaimerSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.DisclaimerSection })), {
  loading: () => <div className="min-h-[300px]" />,
  ssr: true
});

export const metadata: Metadata = {
  title: 'R$ 10.000/mês trabalhando de casa com Confeitaria | Workshop Ao Vivo',
  description: '2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa. Aprenda produto, precificação e vendas que realmente funcionam. 13 e 14 de dezembro no Zoom.',
  openGraph: {
    title: 'R$ 10.000/mês trabalhando de casa com Confeitaria | Workshop Ao Vivo',
    description: '2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa.',
    url: 'https://dudaberger.com.br/workshop',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
  },
  other: {
    'event:name': 'Workshop: R$ 10.000/mês trabalhando de casa com Confeitaria',
    'event:start_date': '2025-12-13',
    'event:end_date': '2025-12-14',
  },
};

export default function WorkshopPage() {
  return (
    <>
      <SectionErrorBoundary sectionName="Hero">
        <HeroSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Apresentação">
        <SecondSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Problemas">
        <PainSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Como Funciona">
        <HowToSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Cronograma">
        <CronogramaSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Investimento">
        <PricingSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Perguntas Frequentes">
        <FAQSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Sobre a Duda">
        <AboutSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Aviso Legal">
        <DisclaimerSection />
      </SectionErrorBoundary>
    </>
  );
}
