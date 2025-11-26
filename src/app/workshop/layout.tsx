import type { Metadata } from 'next';

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

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        href="/images/workshop/logo.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
