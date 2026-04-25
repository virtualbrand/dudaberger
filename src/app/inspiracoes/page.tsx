import type { Metadata } from 'next';
import Image from 'next/image';
import InspiracoesList from '@/components/pages/inspiracoes/InspiracoesList';

export const metadata: Metadata = {
  title: 'Inspirações | Duda Berger',
  description: 'Explore a galeria de bolos da Duda Berger e encontre a inspiração perfeita para o seu grande dia.',
  openGraph: {
    title: 'Inspirações | Duda Berger',
    description: 'Explore a galeria de bolos da Duda Berger e encontre a inspiração perfeita para o seu grande dia.',
    url: 'https://dudaberger.com.br/inspiracoes',
    siteName: 'Duda Berger',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function InsiracoesPage() {
  return (
    <main className="w-full min-h-screen bg-[#d4c4b2] relative overflow-hidden">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>

      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10">
        <InspiracoesList />
      </div>
    </main>
  );
}
