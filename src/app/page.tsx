import type { Metadata } from 'next';
import HeroSection from '@/components/pages/links/HeroSection';

export const metadata: Metadata = {
  title: 'Duda Berger | Links',
  description: 'Links úteis e importantes da Duda Berger - Confeiteira e Mentora.',
  openGraph: {
    title: 'Duda Berger | Links',
    description: 'Links úteis e importantes da Duda Berger - Confeiteira.',
    url: 'https://dudaberger.com.br',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      <HeroSection />
    </main>
  );
}
