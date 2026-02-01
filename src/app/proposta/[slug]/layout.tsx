import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

// Função para buscar a proposta
async function getProposta(slug: string) {
  if (!supabase) return null;
  
  const { data, error } = await (supabase as any)
    .from('propostas')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

// Gera os metadados dinamicamente
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposta = await getProposta(slug);
  
  // O campo no banco é 'titulo' (que contém o nome do cliente)
  const nomeCliente = proposta?.titulo || 'Casal';
  const baseUrl = 'https://dudaberger.com.br';
  const imageUrl = `${baseUrl}/images/casamento/thumb-proposta.webp`;

  return {
    title: `Proposta para ${nomeCliente} | Duda Berger`,
    description: `Proposta exclusiva de bolo de casamento para ${nomeCliente}. Uma criação única e personalizada para o dia mais especial de vocês.`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title: `Proposta para ${nomeCliente}`,
      description: `Proposta exclusiva de bolo de casamento para ${nomeCliente}. Uma criação única e personalizada para o dia mais especial de vocês.`,
      url: `${baseUrl}/proposta/${slug}`,
      siteName: 'Duda Berger | Confeitaria',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Proposta de bolo de casamento para ${nomeCliente}`,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Proposta para ${nomeCliente}`,
      description: `Proposta exclusiva de bolo de casamento para ${nomeCliente}. Uma criação única e personalizada.`,
      images: [imageUrl],
    },
    other: {
      'og:image:secure_url': imageUrl,
    },
  };
}

export default function PropostaLayout({ children }: Props) {
  return <>{children}</>;
}
