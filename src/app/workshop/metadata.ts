import { Metadata } from 'next';

export const workshopMetadata: Metadata = {
  title: 'Workshop de Confeitaria | Duda Berger',
  description: 'Aprenda a faturar com confeitaria trabalhando de casa. Workshop completo com mentoria personalizada da Duda Berger.',
  keywords: [
    'workshop confeitaria',
    'curso de bolos',
    'mentoria confeitaria',
    'negócio de bolos',
    'confeiteira profissional',
    'duda berger workshop',
  ],
  openGraph: {
    title: 'Workshop de Confeitaria | Duda Berger',
    description: 'Aprenda a faturar com confeitaria trabalhando de casa. Workshop completo com mentoria personalizada.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dudaberger.com.br/workshop',
    siteName: 'Duda Berger',
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
    title: 'Workshop de Confeitaria | Duda Berger',
    description: 'Aprenda a faturar com confeitaria trabalhando de casa.',
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
};

// Schema.org structured data para o workshop
export const workshopSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalEvent',
  name: 'Workshop de Confeitaria - Duda Berger',
  description: 'Workshop completo de confeitaria com mentoria personalizada para quem quer faturar trabalhando de casa.',
  url: 'https://dudaberger.com.br/workshop',
  image: 'https://dudaberger.com.br/images/workshop-og-image.jpg',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  organizer: {
    '@type': 'Person',
    name: 'Duda Berger',
    url: 'https://dudaberger.com.br',
    sameAs: [
      'https://www.instagram.com/contoatelier',
    ],
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
    description: 'Confeiteira e mentora com experiência em faturar R$ 30 mil/mês com confeitaria.',
  },
};
