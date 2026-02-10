import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avalie sua experiência | Duda Berger Confeitaria Artesanal',
  description: 'Sua avaliação ajuda outras pessoas a viverem experiências tão especiais quanto a sua. Leva menos de 1 minuto',
  openGraph: {
    title: 'Avalie sua experiência | Duda Berger Confeitaria Artesanal',
    description: 'Sua avaliação ajuda outras pessoas a viverem experiências tão especiais quanto a sua. Leva menos de 1 minuto',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary',
    title: 'Avalie sua experiência | Duda Berger Confeitaria Artesanal',
    description: 'Sua avaliação ajuda outras pessoas a viverem experiências tão especiais quanto a sua. Leva menos de 1 minuto',
  },
};

export default function AvalieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
