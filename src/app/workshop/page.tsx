'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';
import SectionErrorBoundary from '@/components/SectionErrorBoundary';

// Dynamic imports APENAS com SSR para o Hero (above the fold)
const HeroSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.HeroSection })), {
  ssr: true
});

// Lazy load sem SSR para seções abaixo da dobra
const SecondSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.SecondSection })), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: false
});

const PainSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.PainSection })), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: false
});

const HowToSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.HowToSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: false
});

const CronogramaSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.CronogramaSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: false
});

const PricingSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: false
});

const FAQSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="min-h-[500px]" />,
  ssr: false
});

const AboutSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: false
});

const DisclaimerSection = dynamic(() => import('@/components/pages/workshop').then(mod => ({ default: mod.DisclaimerSection })), {
  loading: () => <div className="min-h-[300px]" />,
  ssr: false
});

export default function WorkshopPage() {
  const workshopSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalEvent',
    name: 'Workshop: R$ 10.000/mês trabalhando de casa com Confeitaria',
    description: '2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa. Aprenda produto, precificação e vendas que realmente funcionam.',
    url: 'https://dudaberger.com.br/workshop',
    image: 'https://dudaberger.com.br/images/workshop-og-image.jpg',
    startDate: '2025-12-13T19:00:00-03:00',
    endDate: '2025-12-14T21:00:00-03:00',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://dudaberger.com.br/workshop',
    },
    organizer: {
      '@type': 'Person',
      name: 'Duda Berger',
      url: 'https://dudaberger.com.br',
      sameAs: ['https://www.instagram.com/contoatelier'],
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '997',
      priceCurrency: 'BRL',
      url: 'https://dudaberger.com.br/workshop',
      validFrom: '2024-01-01',
    },
    performer: {
      '@type': 'Person',
      name: 'Duda Berger',
      description: 'Confeiteira e mentora especializada em ensinar confeiteiras a faturar R$ 10.000/mês trabalhando de casa.',
      image: 'https://dudaberger.com.br/images/duda-about-presets.webp',
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD para SEO otimizado */}
      <Script
        id="workshop-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopSchema) }}
        strategy="beforeInteractive"
      />
      
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
