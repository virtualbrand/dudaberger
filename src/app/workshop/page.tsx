import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
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
  keywords: [
    'workshop confeitaria',
    'curso de bolos',
    'mentoria confeitaria',
    'faturar com confeitaria',
    'negócio de bolos',
    'confeiteira profissional',
    'trabalhar de casa',
    'duda berger',
  ],
  openGraph: {
    title: 'R$ 10.000/mês trabalhando de casa com Confeitaria | Workshop Ao Vivo',
    description: '2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa.',
    url: 'https://dudaberger.com.br/workshop',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://dudaberger.com.br/images/workshop-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Workshop de Confeitaria - Duda Berger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R$ 10.000/mês trabalhando de casa com Confeitaria',
    description: '2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa.',
    images: ['https://dudaberger.com.br/images/workshop-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://dudaberger.com.br/workshop',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  other: {
    'event:name': 'Workshop: R$ 10.000/mês trabalhando de casa com Confeitaria',
    'event:start_date': '2025-12-13',
    'event:end_date': '2025-12-14',
  },
};

// Schema.org structured data para SEO
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

export default function WorkshopPage() {
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
