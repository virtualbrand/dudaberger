import type { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import InspiracoesList from '@/components/pages/inspiracoes/InspiracoesList';

const BASE_URL = 'https://dudaberger.com.br';

const DEFAULT_METADATA: Metadata = {
  title: 'Inspirações | Duda Berger',
  description: 'Explore a galeria de bolos da Duda Berger e encontre a inspiração perfeita para o seu grande dia.',
  openGraph: {
    title: 'Inspirações | Duda Berger',
    description: 'Explore a galeria de bolos da Duda Berger e encontre a inspiração perfeita para o seu grande dia.',
    url: `${BASE_URL}/inspiracoes`,
    siteName: 'Duda Berger | Confeitaria',
    locale: 'pt_BR',
    type: 'website',
  },
};

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams;
  if (!id) return DEFAULT_METADATA;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return DEFAULT_METADATA;

  const client = createClient(supabaseUrl, supabaseAnonKey);
  const num = parseInt(id, 10);
  if (isNaN(num)) return DEFAULT_METADATA;

  const { data } = await client
    .from('galeria_fotos')
    .select('url, tags, numero')
    .eq('numero', num)
    .single();

  if (!data) return DEFAULT_METADATA;

  const formattedId = String(data.numero).padStart(4, '0');
  const title = `Referência #${formattedId} | Conto Atelier de Bolos`;
  const description = (data.tags as string[]).join(', ');
  const imageUrl = data.url as string;
  const pageUrl = `${BASE_URL}/inspiracoes?id=${formattedId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Duda Berger | Confeitaria',
      images: [{ url: imageUrl, width: 1200, height: 1200, alt: title }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'og:image:secure_url': imageUrl,
    },
  };
}

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
