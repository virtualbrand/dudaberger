import { Metadata } from 'next';

const baseUrl = 'https://dudaberger.com.br';
const imageUrl = `${baseUrl}/images/casamento/thumb-proposta.webp`;

export const metadata: Metadata = {
  title: 'Briefing dos Noivos | Duda Berger - Conto Atelier de bolos',
  description:
    'Preencha o briefing e receba uma proposta personalizada de bolo de casamento. Conte-nos sobre o seu grande dia para criarmos algo único para vocês.',
  openGraph: {
    title: 'Briefing dos Noivos | Duda Berger - Conto Atelier de bolos',
    description:
      'Preencha o briefing e receba uma proposta personalizada de bolo de casamento. Conte-nos sobre o seu grande dia para criarmos algo único para vocês.',
    url: `${baseUrl}/wedding`,
    siteName: 'Duda Berger | Confeitaria',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'Briefing dos Noivos — Duda Berger Confeitaria',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Briefing dos Noivos | Duda Berger - Conto Atelier de bolos',
    description:
      'Preencha o briefing e receba uma proposta personalizada de bolo de casamento.',
    images: [imageUrl],
  },
  other: {
    'og:image:secure_url': imageUrl,
  },
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
