import type { Metadata } from 'next';
import { 
  HeroSection, 
  HowToSection,
  PainSection, 
  PricingSection, 
  FAQSection, 
  AboutSection,
  CronogramaSection,
  DisclaimerSection, 
  SecondSection
} from '@/components/pages/workshop';

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
    'vanta:preload': 'true', // Preload Vanta scripts
  },
};

export default function WorkshopPage() {
  return (
    <>
      <HeroSection />
      <SecondSection />
      <PainSection />
      <HowToSection />
      <CronogramaSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
      <DisclaimerSection />
    </>
  );
}
