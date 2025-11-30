'use client';

import { notFound } from 'next/navigation';
import { PropostaHero } from '@/components/pages/proposta';
import { PropostaGallery } from '@/components/pages/proposta';
import { PropostaStory } from '@/components/pages/proposta';
import { PropostaOffer } from '@/components/pages/proposta';
import { PropostaSymbolism } from '@/components/pages/proposta';
import { PropostaDetails } from '@/components/pages/proposta';
import { PropostaNextSteps } from '@/components/pages/proposta';
import { PropostaPortfolio } from '@/components/pages/proposta';
import { PropostaFinal } from '@/components/pages/proposta';

// Mock data - depois será dinâmico
const getPropostaData = (slug: string) => {
  // Exemplo: casamento-joao-maria
  const proposals = {
    'casamento-leticia-joao': {
      couple: 'Letícia e João',
      title: 'PROPOSTA',
      subtitle: 'Duda Berger | Para Letícia e João',
      heroImage: '/images/workshop/workshop-1.webp', // Placeholder
    }
  };

  return proposals[slug as keyof typeof proposals] || null;
};

export default function PropostaPage({ params }: { params: { slug: string } }) {
  const proposta = getPropostaData(params.slug);

  if (!proposta) {
    notFound();
  }

  return (
    <div className="w-full">
      <PropostaHero 
        title={proposta.title}
        subtitle={proposta.subtitle}
        heroImage={proposta.heroImage}
      />
      <PropostaGallery />
      <PropostaStory />
      <PropostaOffer />
      <PropostaSymbolism />
      <PropostaDetails />
      <PropostaNextSteps />
      <PropostaPortfolio />
      <PropostaFinal />
    </div>
  );
}
