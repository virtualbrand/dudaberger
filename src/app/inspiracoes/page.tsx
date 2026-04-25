import type { Metadata } from 'next';
import InspiracoesList from '@/components/pages/inspiracoes/InspiracoesList';
import { createClient } from '@/lib/supabase-server';

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

export default async function InsiracoesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('galeria_fotos')
    .select('id, titulo, tags, url')
    .order('created_at', { ascending: true });

  return (
    <main className="w-full min-h-screen bg-[#FFFFF8]">
      <InspiracoesList initialFotos={data ?? []} />
    </main>
  );
}
