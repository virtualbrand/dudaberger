'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Proposta } from '@/types/proposta';
import { format, addDays, differenceInDays, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CircleSmall, CircleDollarSign } from 'lucide-react';
import ImmersiveScrollGallery from '@/components/ui/immersive-scroll-gallery';
import { InteractivePhotoStack } from '@/components/ui/photo-stack';
import BolosGallerySection from '@/components/pages/BolosGallerySection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Spinner } from '@/components/ui/spinner';
import { Timeline } from '@/components/ui/timeline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import './proposta.css';

const dbStatusToUiStatus = (status: string | null | undefined): Proposta['status'] => {
  switch ((status || '').toLowerCase()) {
    case 'rascunho':
      return 'rascunho';
    case 'enviada':
      return 'enviada';
    case 'aceita':
      return 'aceita';
    case 'rejeitada':
    case 'recusada':
      return 'recusada';
    case 'expirada':
      return 'expirada';
    default:
      return 'enviada';
  }
};

export default function PropostaPublicaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [proposta, setProposta] = React.useState<Proposta | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [prazoSelecionado, setPrazoSelecionado] = React.useState<'7dias' | '21dias'>('7dias');
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentStep, setPaymentStep] = React.useState<'choose' | 'pix'>('choose');
  const [copiedCNPJ, setCopiedCNPJ] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'seguir' | 'decidir'>('seguir');
  
  useScrollAnimation();

  const handleCopyCNPJ = () => {
    navigator.clipboard.writeText('59138056000150');
    setCopiedCNPJ(true);
    setTimeout(() => setCopiedCNPJ(false), 2000);
  };

  const handlePaymentChoice = (method: 'pix' | 'card') => {
    if (method === 'pix') {
      setPaymentStep('pix');
    } else {
      // Usar link personalizado baseado no prazo selecionado
      const linkPagamento = prazoSelecionado === '7dias' 
        ? proposta?.linkPagamento7Dias 
        : proposta?.linkPagamento21Dias;
      
      if (linkPagamento) {
        window.open(linkPagamento, '_blank');
      } else {
        window.open('https://app.infinitepay.io/', '_blank');
      }
      setShowPaymentModal(false);
      setPaymentStep('choose');
    }
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setPaymentStep('choose');
    setCopiedCNPJ(false);
  };

  // Fechar modal com ESC
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showPaymentModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showPaymentModal]);

  // Calcular dias restantes e status de vencimento
  const getPropostaStatus = () => {
    if (!proposta?.dataCriacao) return { diasRestantes7: 0, diasRestantes21: 0, vencida: true, prazo7Vencido: true, prazo21Vencido: true };
    
    const dataProposta = new Date(proposta.dataCriacao);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const dataLimite7 = addDays(dataProposta, 7);
    const dataLimite21 = addDays(dataProposta, 21);
    
    const diasRestantes7 = differenceInDays(dataLimite7, hoje);
    const diasRestantes21 = differenceInDays(dataLimite21, hoje);
    
    const prazo7Vencido = diasRestantes7 < 0;
    const prazo21Vencido = diasRestantes21 < 0;
    const vencida = prazo21Vencido;
    
    return { diasRestantes7, diasRestantes21, vencida, prazo7Vencido, prazo21Vencido, dataLimite21 };
  };

  React.useEffect(() => {
    const loadProposta = async () => {
      if (!slug || !supabase) {
        setError('Proposta não encontrada');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await (supabase as any)
          .from('propostas')
          .select('id, titulo, descricao, valor_total, status, data_proposta, validade_ate, created_at, itens, slug, local_festa, numero_convidados, link_pagamento_7_dias, link_pagamento_21_dias')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          setError('Proposta não encontrada');
          setLoading(false);
          return;
        }

        const dataCriacao = data.data_proposta ? `${data.data_proposta}T00:00:00` : String(data.created_at ?? new Date().toISOString());
        const statusOriginal = dbStatusToUiStatus(data.status);
        
        // Verificar se a proposta venceu (21 dias) e não foi aceita
        let statusAtualizado = statusOriginal;
        if (statusOriginal !== 'aceita' && statusOriginal !== 'recusada' && statusOriginal !== 'expirada') {
          const dataLimite21 = addDays(new Date(dataCriacao), 21);
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);
          
          if (isPast(dataLimite21)) {
            statusAtualizado = 'expirada';
            
            // Atualizar status no banco
            await (supabase as any)
              .from('propostas')
              .update({ status: 'expirada' })
              .eq('id', data.id);
          }
        }

        const propostaData: Proposta = {
          id: String(data.id),
          clienteNome: String(data.titulo ?? ''),
          valorTotal: Number(data.valor_total ?? 0),
          status: statusAtualizado,
          dataCriacao,
          dataEvento: data.validade_ate ? `${data.validade_ate}T00:00:00` : '',
          descricao: data.descricao ?? undefined,
          slug: data.slug ?? undefined,
          localFesta: data.local_festa ?? undefined,
          numeroConvidados: data.numero_convidados ?? undefined,
          itens: (Array.isArray(data.itens) ? data.itens : []) as any,
          linkPagamento7Dias: data.link_pagamento_7_dias ?? undefined,
          linkPagamento21Dias: data.link_pagamento_21_dias ?? undefined,
        };

        setProposta(propostaData);
      } catch (err) {
        console.error('Erro ao carregar proposta:', err);
        setError('Erro ao carregar proposta');
      } finally {
        setLoading(false);
      }
    };

    loadProposta();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !proposta) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-unbounded text-[#703535] mb-4">
            Proposta não encontrada
          </h1>
          <p className="text-gray-600">
            A proposta que você está procurando não existe ou foi removida.
          </p>
        </div>
      </div>
    );
  }

  // Se a proposta está em rascunho, recusada ou expirada, mostrar apenas hero com mensagem
  const isRascunho = proposta.status === 'rascunho';
  const isRecusada = proposta.status === 'recusada';
  const isExpirada = proposta.status === 'expirada';
  const isRestrito = isRascunho || isRecusada || isExpirada;

  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      {/* Hero Section com Background Fixo */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ 
            backgroundImage: 'url(/images/casamento/hero-proposta.webp)'
          }}
        >
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          {isRascunho ? (
            <>
              {/* Mensagem de Rascunho */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-unbounded font-bold text-white mb-4 leading-tight animate-fade-in">
                A proposta ainda não está disponível
              </h1>
            </>
          ) : (isRecusada || isExpirada) ? (
            <>
              {/* Mensagem de Recusada ou Expirada */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in">
                Essa proposta não está mais disponível
              </h1>
              <a
                href="https://wa.me/5548991797296?text=Olá, Duda! Gostaria de solicitar outra Proposta pois a minha venceu."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-md inline-flex items-center justify-center gap-2 animate-fade-in"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Solicitar nova proposta
              </a>
            </>
          ) : (
            <>
              {/* Proposta */}
              <div className="mb-8 animate-fade-in">
                <p className="text-white/90 text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase font-light mb-2">
                  Proposta
                </p>
                <div className="w-24 h-px bg-white/60 mx-auto" />
              </div>

              {/* Nome do Casal - Destaque Principal */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in">
                {proposta.clienteNome}
              </h1>

              {/* Duda Berger */}
              <div className="animate-fade-in-delay">
                <div className="w-24 h-px bg-white/60 mx-auto mb-4" />
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase font-light">
                  Duda Berger
                </p>
                <p className="text-white/70 text-xs md:text-sm tracking-wider mt-2">
                  Conto Atelier de bolos
                </p>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
                  <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Resto do conteúdo - apenas se não for rascunho ou recusada */}
      {!isRestrito && (
        <>
          {/* Segunda Seção - Galeria Imersiva */}
          <section className="w-full bg-[#F6EEE1] py-16 md:py-24 px-6 md:px-0">
            <ImmersiveScrollGallery
              images={[
                { src: '/images/casamento/segunda-galeria-1.webp' },
                { src: '/images/casamento/segunda-galeria-10.webp' },
                { src: '/images/casamento/segunda-galeria-3.webp' },
                { src: '/images/casamento/segunda-galeria-8.webp' },
                { src: '/images/casamento/segunda-galeria-9.webp' },
                { src: '/images/casamento/segunda-galeria-2.webp' },
                { src: '/images/casamento/segunda-galeria-7.webp' },
              ]}
            >
              <div>
                <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded mb-8 text-[#D65B58] max-w-2xl mx-auto text-center">
                  O que ninguém conta sobre o bolo de casamento
                </h2>
                <p className="fade-in text-lg md:text-xl text-[#5a2a2a] max-w-sm mx-auto leading-relaxed mb-4 text-left">
                  Nos últimos anos, muitos casais eliminaram o bolo da lista, por quê:
                </p>
                <ul className="max-w-sm mx-auto space-y-2 text-lg md:text-xl text-[#5a2a2a]/90 italic text-left">
                  <li className="flex items-start gap-2">
                    <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5" />
                    <span>"É muito tradicional."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5" />
                    <span>"É coisa antiga."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5" />
                    <span>"Vamos fazer algo mais moderno."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5" />
                    <span>"Bolo de casamento não é bom."</span>
                  </li>
                </ul>
              </div>
            </ImmersiveScrollGallery>
          </section>

          {/* Terceira Seção - Conteúdo com Imagem */}
          <section className="w-full relative overflow-hidden bg-[#d4c4b2] py-16 md:py-24">
            {/* Shadow Background Overlay - Desktop */}
            <div className="absolute inset-0 z-0 opacity-50 hidden lg:block">
              <img
                src="/images/workshop/shadow-bg.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Shadow Background Overlay - Mobile */}
            <div className="absolute inset-0 z-0 opacity-30 lg:hidden">
              <img
                src="/images/workshop/shadow-bg-mobile.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Conteúdo à Esquerda */}
                <div className="space-y-6">
                  <h2 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    Nossos casais que buscam cerimônias significativas acreditam em algo importante:
                  </h2>
                  
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed">
                    "Eliminar uma tradição sem entender seu significado <strong className="text-[#703535]">é jogar fora</strong> uma oportunidade de criar um momento <strong className="text-[#703535]">genuinamente impactante</strong>."
                  </p>

                  <div className="pt-4">
                    <h3 className="fade-in text-md md:text-xl font-bold font-unbounded text-[#D65B58] mb-4">
                      O problema nunca foi o bolo.<br /> O problema é como era feito.
                    </h3>
                    <ul className="fade-in space-y-2 text-base md:text-lg text-[#5a2a2a]">
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Genérico</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Sem conexão com o casal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Focado em "impressionar" ao invés de "significar"</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Mosaico de 4 Imagens à Direita */}
                <div className="relative flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 w-full max-w-xl">
                    {/* Imagem 1 - Top Left */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                      <img
                        src="/images/casamento/bolo-corte-1.webp"
                        alt="Bolo de casamento 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Imagem 2 - Top Right (offset down) */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg mt-4 md:mt-8">
                      <img
                        src="/images/casamento/bolo-corte-2.webp"
                        alt="Bolo de casamento 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Imagem 3 - Bottom Left (offset up) */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg -mt-2 md:-mt-4">
                      <img
                        src="/images/casamento/bolo-corte-3.webp"
                        alt="Bolo de casamento 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Imagem 4 - Bottom Right */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg mt-2 md:mt-4">
                      <img
                        src="/images/casamento/bolo-corte-4.webp"
                        alt="Bolo de casamento 4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quarta Seção - Design Contemporâneo */}
          <section className="w-full bg-[#F6EEE1] py-16 md:py-24 relative z-30">
            <div className="container mx-auto max-w-7xl px-6 md:px-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[600px]">
                {/* Coluna Esquerda - Componente de Fotos */}
                <div className="order-2 md:order-1 relative z-40 flex items-center justify-center">
                  <InteractivePhotoStack
                    items={[
                      {
                        src: "/images/casamento/bolo-gabriel-gabriela.webp",
                        name: "Gabriela e Gabriel O Pensador",
                        description: "Decoração inspirada no mar",
                      },
                      {
                        src: "/images/casamento/bolo-carolina-guilherme.webp",
                        name: "Carolina e Guilherme",
                        description: "Ela pratica esqui, ele snowboard. também pediram que tivesse uma recordação do pet presente",
                      },
                      {
                        src: "/images/casamento/bolo-marcelle-rafael.webp",
                        name: "Marcelle e Rafael",
                        description: "O casal é apaixonado pelo Star Wars",
                      },
                    ]}
                    title=""
                  />
                </div>

                {/* Coluna Direita - Texto */}
                <div className="order-1 md:order-2 space-y-6 flex flex-col justify-center">
                  <h2 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    Hoje, você não precisa escolher entre tradição ou modernidade.<br /> Você pode ter um bolo:
                  </h2>

                  <div>
                    <ul className="fade-in space-y-2 text-base md:text-lg text-[#5a2a2a]">
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Clean e minimalista</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Contemporâneo e sofisticado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>Que seja completamente a cara de vocês</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                        <span>E ainda assim honrar o simbolismo milenar desse momento.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <h3 className="fade-in text-md md:text-xl font-bold font-unbounded text-[#D65B58] mb-6 text-left">
                      É exatamente isso que criamos.<br /> Bolos que unem:
                    </h3>

                    <div>
                      <ul className="fade-in space-y-3 text-base md:text-lg text-[#5a2a2a]">
                        <li className="flex items-start gap-2">
                          <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                          <div>
                            <strong className="text-[#703535]">Design contemporâneo</strong>
                            <span className="text-sm block text-[#5a2a2a]/80">(nada de brega ou ultrapassado)</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                          <div>
                            <strong className="text-[#703535]">Significado profundo</strong>
                            <span className="text-sm block text-[#5a2a2a]/80">(cada detalhe pensado com intenção)</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CircleSmall className="w-4 h-4 flex-shrink-0 mt-1.5 text-[#703535]" />
                          <div>
                            <strong className="text-[#703535]">A essência de vocês</strong>
                            <span className="text-sm block text-[#5a2a2a]/80">(personalização total)</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quinta Seção - Galeria de Bolos */}
          <BolosGallerySection />

          {/* Sexta Seção - Simbolismos */}
          <section className="w-full relative overflow-hidden bg-[#d4c4b2] py-16 md:py-24 z-10 mt-48 md:mt-64 lg:mt-96">
            {/* Shadow Background Overlay - Desktop */}
            <div className="absolute inset-0 z-0 opacity-30 hidden lg:block">
              <img
                src="/images/shadow/shadow-2.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Shadow Background Overlay - Mobile */}
            <div className="absolute inset-0 z-0 opacity-50 lg:hidden">
              <img
                src="/images/shadow/shadow-2-mobile.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10">
              {/* Título */}
              <h2 className="fade-in text-2xl md:text-3xl lg:text-3xl font-bold font-unbounded mb-8 text-[#D65B58] max-w-4xl mx-auto text-center">
                O gesto de cortar o bolo juntos representa<br className="hidden lg:block" /> 4 simbolismos que atravessam gerações
              </h2>

              {/* Grid de Boxes */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {/* Box 1 - União e Parceria */}
                <div className="bg-[#F6EEE1] rounded-xl p-8 md:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    União e parceria
                  </h3>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3">
                    Quando vocês colocam as mãos juntas sobre a mesma espátula, não estão apenas cortando um bolo. Estão simbolizando que, daquele momento em diante, tudo será compartilhado e enfrentado em conjunto.
                  </p>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] font-semibold leading-relaxed">
                    Não existe mais "eu". Só existe "nós".
                  </p>
                </div>

                {/* Box 2 - O Primeiro Ato Oficial */}
                <div className="bg-[#F6EEE1] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    O primeiro ato oficial como casal
                  </h3>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3">
                    Esse é o primeiro gesto prático que vocês fazem em parceria depois do "sim". Um ritual de iniciar a nova fase. Juntos.
                  </p>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] font-semibold leading-relaxed">
                    É por isso que 90% dos convidados param tudo pra ver esse momento: Estão testemunhando o início de vocês como família.
                  </p>
                </div>

                {/* Box 3 - Prosperidade e Abundância */}
                <div className="bg-[#F6EEE1] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    Prosperidade e abundância
                  </h3>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3">
                    Tradicionalmente, o bolo simboliza fertilidade, fartura e boa sorte.
                    Cortá-lo juntos significa abrir caminho para uma vida próspera.
                  </p>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3">
                    É por isso que cada detalhe importa tanto.
                    Não é sobre estética. É sobre intenção.
                  </p>
                </div>

                {/* Box 4 - Compartilhar a Alegria */}
                <div className="bg-[#F6EEE1] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                    Compartilhar a alegria
                  </h3>
                  <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3">
                    Servir o bolo aos convidados simboliza dividir a felicidade do momento com todas as pessoas importantes que testemunharam a união de vocês. Você não está só oferecendo um doce.
                  </p>
                  <p className="fade-in text-base md:text-lg text-[#703535] font-semibold leading-relaxed">
                    Está dizendo: "Essa alegria é nossa, e queremos compartilhar com vocês."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conteúdo Principal */}
          <section className="relative z-10 bg-[#D65B58] min-h-screen">
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
              {/* Coluna Esquerda - Imagem com Overlay e Conteúdo da Proposta */}
              <div className="relative min-h-screen">
                {/* Imagem de fundo */}
                <img
                  src="/images/casamento/investimento-bolo.webp"
                  alt="Bolo de casamento"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/70" />
                
                {/* Conteúdo da Proposta sobreposto */}
                <div className="relative z-10 h-full p-8 md:p-12 lg:p-16 flex items-center justify-center">
                  <div className="w-full max-w-lg space-y-6">
                    {/* Título Proposta */}
                    <div>
                      <h2 className="text-2xl font-bold font-unbounded text-white mb-2">Proposta para os noivos</h2>
                      <h3 className="text-2xl font-bold font-unbounded text-white">{proposta.clienteNome}</h3>
                    </div>

                    {/* Informações do Evento */}
                    <div className="space-y-3 text-white">
                      {proposta.dataEvento && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold">Data da cerimônia:</span>
                          <span>{format(new Date(proposta.dataEvento), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                      )}
                      
                      {proposta.localFesta && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold">Local:</span>
                          <span>{proposta.localFesta}</span>
                        </div>
                      )}
                      
                      {proposta.numeroConvidados && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold">Número de convidados:</span>
                          <span>{proposta.numeroConvidados}</span>
                        </div>
                      )}
                    </div>

                    {/* Separador */}
                    {proposta.descricao && (
                      <hr className="border-white/30" />
                    )}

                    {/* Descrição */}
                    <div>
                      {proposta.descricao && (
                        <div className="space-y-0">
                          {proposta.descricao.split('\n').map((line, index) => {
                            // Detectar título (# texto)
                            if (line.startsWith('# ')) {
                              return (
                                <h3 key={index} className="font-bold font-unbounded text-md text-white mb-2 mt-4">
                                  {line.substring(2)}
                                </h3>
                              );
                            }
                            // Detectar subtítulo (## texto)
                            if (line.startsWith('## ')) {
                              return (
                                <h4 key={index} className="font-bold font-unbounded text-sm text-white mb-2 mt-3">
                                  {line.substring(3)}
                                </h4>
                              );
                            }
                            // Linha vazia - preservar espaço
                            if (line.trim() === '') {
                              return (
                                <div key={index} className="h-4"></div>
                              );
                            }
                            // Texto normal
                            return (
                              <p key={index} className="text-white">{line}</p>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Itens Adicionais */}
                    {proposta.itens && proposta.itens.length > 0 && (
                      <div className="space-y-2">
                        {proposta.itens.map((item) => (
                          <div key={item.id} className="flex items-start">
                            <span className="text-white mr-2 mt-1.5">•</span>
                            <p className="text-white">
                              {item.nome} R${item.valorUnitario.toFixed(0)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Apenas Pricing */}
              <div className="bg-[#b17878] p-8 md:p-12 lg:p-16 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-2xl">
              {/* Investimento e Forma de Pagamento */}
              <div>
                {/* Box de Investimento */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="text-center">
                    {(() => {
                      const status = getPropostaStatus();
                      
                      // Se a proposta venceu (passou 21 dias)
                      if (status.vencida) {
                        return (
                          <div className="space-y-6">
                            <div className="text-center py-8">
                              <p className="text-lg !text-[#703535] mb-2">
                                Sua proposta venceu em
                              </p>
                              <p className="text-xl font-bold font-unbounded text-[#8f645f] mb-6">
                                {status.dataLimite21 && format(status.dataLimite21, "dd/MM/yyyy", { locale: ptBR })}
                              </p>
                              <a
                                href="https://wa.me/5548991797296?text=Olá, minha proposta venceu e gostaria de solicitar uma nova proposta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-sm inline-flex items-center justify-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Solicitar nova proposta
                              </a>
                            </div>
                          </div>
                        );
                      }
                      
                      // Proposta válida - mostrar título Investimento e tabs
                      return (
                        <>
                          {/* Título Investimento */}
                          <h3 className="text-xl font-bold font-unbounded text-[#703535] mb-6">
                            Reserva da data
                          </h3>

                          {/* Toggle de Prazo - Tab Menu */}
                          <div className="flex justify-center mb-6">
                            <div className="inline-flex rounded-full bg-gray-100 p-1">
                              {/* Tab 7 dias - só mostra se não venceu */}
                              {!status.prazo7Vencido && (
                                <button 
                                  onClick={() => setPrazoSelecionado('7dias')}
                                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                                    prazoSelecionado === '7dias' 
                                      ? 'bg-[#b17878] text-white' 
                                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {status.diasRestantes7 === 0 
                                    ? 'Último dia (-20%)'
                                    : status.diasRestantes7 === 1
                                    ? 'Em até 1 dia (-20%)'
                                    : `Em até ${status.diasRestantes7} dias (-20%)`
                                  }
                                </button>
                              )}
                              
                              {/* Tab 21 dias */}
                              <button 
                                onClick={() => setPrazoSelecionado('21dias')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                                  prazoSelecionado === '21dias' 
                                    ? 'bg-[#b17878] text-white' 
                                    : 'bg-transparent text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {status.diasRestantes21 === 0 
                                  ? 'Último dia'
                                  : status.diasRestantes21 === 1
                                  ? 'Em até 1 dia'
                                  : `Em até ${status.diasRestantes21} dias`
                                }
                              </button>
                            </div>
                          </div>

                          {/* Valores */}
                          <div className="mb-6 mt-6">
                            {prazoSelecionado === '7dias' && !status.prazo7Vencido ? (
                              <div className="space-y-2">
                                <div className="text-4xl font-bold font-unbounded text-[#D65B58] text-center">
                                  12x de R$ {Math.ceil((proposta.valorTotal * 1.2) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-lg md:text-xl font-bold font-unbounded text-[#b94946] text-center">
                                  ou R$ {proposta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} à vista
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-4xl font-bold font-unbounded text-[#D65B58] text-center">
                                  12x de R$ {Math.ceil((proposta.valorTotal * 1.4) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-lg md:text-xl font-bold font-unbounded text-[#b94946] text-center">
                                  ou R$ {(proposta.valorTotal * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} à vista
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Botão Quero reservar */}
                          <div className="mb-6">
                            <button
                              onClick={() => setShowPaymentModal(true)}
                              className="btn-primary-sm inline-flex items-center justify-center w-full max-w-xs mx-auto"
                            >
                              Quero reservar minha data
                            </button>
                          </div>

                          {/* Informações adicionais */}
                          <div className="space-y-4 max-w-sm mx-auto">
                            <p className="text-sm text-gray-600">
                              A data é reservada após a confirmação do pagamento integral, via Pix ou cartão de crédito.
                            </p>

                            {/* Validade do Orçamento */}
                            {proposta.dataCriacao && (
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                  Proposta válida até {format(addDays(new Date(proposta.dataCriacao), 21), "dd/MM/yyyy", { locale: ptBR })}
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mensagem de Contato */}
          <section className="bg-[#F6EEE1] py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center">
                <h3 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                  Os próximos passos
              </h3>
              <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-3 mb-6">
                Se você chegou até aqui, provavelmente está sentindo uma mistura de empolgação e reflexão.<br />
                Isso é completamente natural — decisões importantes pedem tempo e presença.<br />
                Aqui, não existe pressão. Existe clareza.
              </p>

              {/* Tabs */}
              <div className="mt-10">
                {/* Tab Headers */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-full bg-gray-100 p-1">
                    <button
                      onClick={() => setActiveTab('seguir')}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === 'seguir'
                          ? 'bg-[#e58684] text-white'
                          : 'bg-transparent text-[#703535] hover:bg-gray-200'
                      }`}
                    >
                      Seguir agora
                    </button>
                    <button
                      onClick={() => setActiveTab('decidir')}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === 'decidir'
                          ? 'bg-[#e58684] text-white'
                          : 'bg-transparent text-[#703535] hover:bg-gray-200'
                      }`}
                    >
                      Decidir com calma
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl p-8 shadow-md mx-auto max-w-xl">
                  {activeTab === 'seguir' ? (
                    <div>
                      <p className="text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-8 text-center">
                        O processo é simples, organizado e pensado para ser leve
                      </p>
                      <Timeline className="max-w-lg mx-auto"
                        items={[
                          {
                            id: "1",
                            title: "1. A confirmação",
                            description: "A confirmação da proposta acontece mediante o pagamento. É a partir desse momento que damos início a todo o processo.",
                            status: "active",
                          },
                          {
                            id: "2",
                            title: "2. A reserva",
                            description: "Após a confirmação do pagamento, formalizamos tudo por meio de contrato e a data é oficialmente reservada para o casamento de vocês.",
                            status: "pending",
                          },
                          {
                            id: "3",
                            title: "3. A degustação",
                            description: "Agendamos a degustação para que vocês possam experimentar 4 sabores do nosso menu, com calma e presença.\nInvestimento da degustação c/ entrega no local onde estiverem hospedados na região: R$ 110.",
                            status: "pending",
                          },
                          {
                            id: "4",
                            title: "4. A criação",
                            description: "Aqui começa a parte mais especial. Com base na história de vocês, referências e estética do casamento, eu crio um bolo exclusivo, pensado com intenção em cada detalhe.",
                            status: "pending",
                          },
                          {
                            id: "5",
                            title: "5. O grande dia",
                            description: "Entrego pessoalmente no local. E garanto que tudo esteja perfeito para um dos momentos mais simbólicos da celebração.",
                            status: "pending",
                          },
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-4">
                        Salve esta proposta com carinho.<br />
                        Mostre para quem caminha com você nessa escolha.<br />
                        Releia, sinta, anote dúvidas.
                      </p>
                      <p className="text-base md:text-lg text-[#5a2a2a] leading-relaxed mt-6">
                        Quando fizer sentido, é só me chamar.<br />
                        Vou estar aqui para conversar com calma.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="mt-12 text-center">
                <h4 className="fade-in text-xl md:text-2xl font-bold font-unbounded text-[#D65B58] mb-4">
                  Sobre a validade da proposta
                </h4>
                <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-6">
                  Esta proposta é válida até {proposta && format(addDays(new Date(proposta.dataCriacao), 21), "dd/MM/yyyy", { locale: ptBR })}.
                  {proposta && (() => {
                    const status = getPropostaStatus();
                    return !status.prazo21Vencido && (
                      <span className="block mt-2 font-semibold">
                        Restam {status.diasRestantes21} {status.diasRestantes21 === 1 ? 'dia' : 'dias'} para a validade total.
                      </span>
                    );
                  })()}
                </p>
                <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed mb-6">
                  Dentro dos primeiros 7 dias, caso a confirmação seja feita por meio do pagamento, oferecemos um benefício especial de <strong className="text-[#D65B58]">20% no valor total</strong> — como uma forma de reconhecer decisões tomadas com clareza e intenção.
                </p>
                <p className="fade-in text-base md:text-lg text-[#5a2a2a] leading-relaxed">
                  Após esse período, a proposta segue válida pelo valor total, sem o benefício aplicado, e sujeita à disponibilidade da data.
                </p>
              </div> */}
            </div>
          </div>
          </section>

          {/* CTA Section - Reservar Data */}
          <section className="relative z-10 bg-[#D65B58] h-screen">
            <div className="h-full grid grid-cols-1 md:grid-cols-2">
              {/* Coluna Esquerda - Conteúdo */}
              <div className="bg-[#b17878] p-8 md:p-12 lg:p-16 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-2xl space-y-8">
                  {/* Investimento e Forma de Pagamento */}
                  <div>
                    {/* Box de Investimento ou Decidir com Calma */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="text-center">
                        {(() => {
                          const status = getPropostaStatus();
                          
                          // Se a proposta venceu (passou 21 dias)
                          if (status.vencida) {
                            return (
                              <div className="space-y-6">
                                <div className="text-center py-8">
                                  <p className="text-lg !text-[#703535] mb-2">
                                    Sua proposta venceu em
                                  </p>
                                  <p className="text-xl font-bold font-unbounded text-[#8f645f] mb-6">
                                    {status.dataLimite21 && format(status.dataLimite21, "dd/MM/yyyy", { locale: ptBR })}
                                  </p>
                                  <a
                                    href="https://wa.me/5548991797296?text=Olá, minha proposta venceu e gostaria de solicitar uma nova proposta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-sm inline-flex items-center justify-center gap-2"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Solicitar nova proposta
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          
                          // Se selecionou "Decidir com calma"
                          if (activeTab === 'decidir') {
                            return (
                              <>
                                <h3 className="text-xl font-bold font-unbounded text-[#703535] mb-2">
                                  Para revisar com tranquilidade
                                </h3>
                                
                                <div className="space-y-4 max-w-lg mx-auto">
                                  <p className="text-base md:text-lg text-[#5a2a2a] leading-relaxed">
                                    Essa proposta fica disponível para vocês revisitarem com tranquilidade.
                                    Conversem, sintam, anotem dúvidas.
                                  </p>
                                  
                                  <p className="text-base md:text-lg text-[#5a2a2a] leading-relaxed">
                                    Quando fizer sentido seguir, a reserva da data garante que esse cuidado esteja dedicado exclusivamente ao casamento de vocês.
                                  </p>
                                </div>

                                <div className="mt-4">
                                  <a
                                    href="https://wa.me/5548991797296?text=Oi, Duda. Estamos analisando a proposta com calma e retomamos a conversa em breve"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-sm inline-flex items-center justify-center gap-2 w-full max-w-xs mx-auto"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Salvar esta proposta
                                  </a>
                                </div>
                              </>
                            );
                          }
                          
                          // Proposta válida - mostrar título Investimento e tabs
                          return (
                            <>
                              {/* Título Investimento */}
                              <h3 className="text-xl font-bold font-unbounded text-[#703535] mb-2">
                                Investimento
                              </h3>
                              <div className="space-y-4 max-w-sm mx-auto">
                                <p className="text-sm text-gray-600 mb-4">
                                  Se, ao longo dessa proposta, vocês sentiram que esse cuidado, esse olhar e esse jeito de criar fazem sentido para a história de vocês, então o próximo passo é simples.
                                </p>
                              </div>

                              {/* Toggle de Prazo - Tab Menu */}
                              <div className="flex justify-center mb-6">
                                <div className="inline-flex rounded-full bg-gray-100 p-1">
                                  {/* Tab 7 dias - só mostra se não venceu */}
                                  {!status.prazo7Vencido && (
                                    <button 
                                      onClick={() => setPrazoSelecionado('7dias')}
                                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                                        prazoSelecionado === '7dias' 
                                          ? 'bg-[#b17878] text-white' 
                                          : 'bg-transparent text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {status.diasRestantes7 === 0 
                                        ? 'Último dia (-20%)'
                                        : status.diasRestantes7 === 1
                                        ? 'Em até 1 dia (-20%)'
                                        : `Em até ${status.diasRestantes7} dias (-20%)`
                                      }
                                    </button>
                                  )}
                                  
                                  {/* Tab 21 dias */}
                                  <button 
                                    onClick={() => setPrazoSelecionado('21dias')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                                      prazoSelecionado === '21dias' 
                                        ? 'bg-[#b17878] text-white' 
                                        : 'bg-transparent text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    {status.diasRestantes21 === 0 
                                      ? 'Último dia'
                                      : status.diasRestantes21 === 1
                                      ? 'Em até 1 dia'
                                      : `Em até ${status.diasRestantes21} dias`
                                    }
                                  </button>
                                </div>
                              </div>

                              {/* Valores */}
                              <div className="mb-6 mt-6">
                                {prazoSelecionado === '7dias' && !status.prazo7Vencido ? (
                                  <div className="space-y-2">
                                    <div className="text-4xl font-bold font-unbounded text-[#D65B58] text-center">
                                      12x de R$ {Math.ceil((proposta.valorTotal * 1.2) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-lg md:text-xl font-bold font-unbounded text-[#b94946] text-center">
                                      ou R$ {proposta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} à vista
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="text-4xl font-bold font-unbounded text-[#D65B58] text-center">
                                      12x de R$ {Math.ceil((proposta.valorTotal * 1.4) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-lg md:text-xl font-bold font-unbounded text-[#b94946] text-center">
                                      ou R$ {(proposta.valorTotal * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} à vista
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Botão Quero reservar */}
                              <div className="mb-6">
                                <button
                                  onClick={() => setShowPaymentModal(true)}
                                  className="btn-primary-sm inline-flex items-center justify-center w-full max-w-xs mx-auto"
                                >
                                  Seguir com a reserva da data
                                </button>
                              </div>

                              {/* Informações adicionais */}
                              <div className="space-y-4 max-w-sm mx-auto">
                                <p className="text-sm text-gray-600">
                                  A data é reservada após a confirmação do pagamento integral, via Pix ou cartão de crédito.
                                </p>

                                {/* Validade do Orçamento */}
                                {proposta.dataCriacao && (
                                  <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                      Proposta válida até {format(addDays(new Date(proposta.dataCriacao), 21), "dd/MM/yyyy", { locale: ptBR })}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Imagem (oculta no mobile) */}
              <div className="hidden md:block relative h-full">
                <img
                  src="/images/casamento/investimento-bolo.webp"
                  alt="Bolo de casamento"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-[#fbf7ef]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="space-y-12">
                <h2 className="text-center fade-in text-2xl md:text-3xl lg:text-4xl font-bold text-[#D65B58] font-unbounded">
                  Dúvidas Frequentes
                </h2>

                <Accordion
                  type="single"
                  collapsible
                  className="-mx-2 sm:mx-0"
                >
                  {[
                    {
                      id: 'item-1',
                      question: "Como funciona o processo após a confirmação?",
                      answer: "Após a confirmação do pagamento, formalizamos tudo por meio de contrato e a data é oficialmente reservada para o casamento de vocês.\n\nEm seguida, agendamos a degustação para que vocês possam experimentar os sabores com calma. Com base na história de vocês, referências e estética do casamento, eu crio um bolo exclusivo, pensado com intenção em cada detalhe.\n\nNo grande dia, entrego pessoalmente no local e garanto que tudo esteja perfeito para um dos momentos mais simbólicos da celebração."
                    },
                    {
                      id: 'item-2',
                      question: "Qual o prazo de antecedência para reservar?",
                      answer: "Esta proposta é válida por 21 dias a partir da data de criação.\n\nDentro dos primeiros 7 dias, oferecemos um benefício especial de 20% no valor total para reservas confirmadas por meio do pagamento — como uma forma de reconhecer decisões tomadas com clareza e intenção.\n\nApós esse período, a proposta segue válida pelo valor total, sem o benefício aplicado, e sujeita à disponibilidade da data."
                    },
                    {
                      id: 'item-3',
                      question: "Atende mais de um casamento na mesma data?",
                      answer: "Trabalhamos com um número limitado de casamentos por data.\n\nEssa organização garante que cada projeto receba a atenção, o cuidado e o tempo necessários, sem comprometer a qualidade ou a experiência de nenhum casal."
                    },
                    {
                      id: 'item-4',
                      question: "O que está incluído no valor da proposta?",
                      answer: "O valor inclui todo o processo de criação personalizada do bolo até a entrega no local do evento.\n\nIsso contempla: consulta para entender a história de vocês, desenvolvimento do design exclusivo, todos os ingredientes de alta qualidade, execução artesanal, e entrega pessoal no local do casamento.\n\nA degustação tem um investimento adicional de R$ 110 com entrega no local onde vocês estiverem hospedados na região."
                    },
                    {
                      id: 'item-5',
                      question: "O bolo pode refletir o estilo e a personalidade do casal?",
                      answer: "Sim. A criação do bolo parte não apenas da estética do casamento, mas da personalidade de vocês.\n\nDurante o processo, levo em conta quem vocês são, o jeito como se expressam, o clima que desejam para a celebração e aquilo que faz sentido para a história que estão construindo juntos.\n\nEssas referências orientam escolhas de design, proporções, texturas e detalhes, para que o bolo represente o casal — e não apenas o evento.\n\nO resultado é uma criação que conversa com o todo, mas que carrega identidade, intenção e verdade."
                    },
                    {
                      id: 'item-6',
                      question: "Como funciona a degustação?",
                      answer: "Após a confirmação da proposta, agendamos a degustação em uma data que seja conveniente para vocês.\n\nVocês terão a oportunidade de experimentar 4 sabores do nosso menu, escolhidos com base nas preferências que vocês compartilharem. A degustação acontece com calma, para que vocês possam sentir e decidir qual sabor faz mais sentido para o momento de vocês.\n\nO investimento da degustação é de R$ 110, com entrega no local onde vocês estiverem hospedados na região de Garopaba e Praia do Rosa."
                    },
                    {
                      id: 'item-7',
                      question: "Posso fazer alterações após confirmar?",
                      answer: "Sim! O processo de criação é colaborativo.\n\nApós a confirmação e durante todo o processo, mantemos contato próximo para garantir que cada detalhe esteja alinhado com a visão de vocês. Alterações podem ser feitas até um prazo definido antes do evento, garantindo tempo suficiente para a execução perfeita do bolo.\n\nO objetivo é que vocês se sintam completamente seguros e empolgados com a escolha."
                    },
                    {
                      id: 'item-8',
                      question: "E se houver imprevistos ou mudanças de data?",
                      answer: "Entendemos que imprevistos podem acontecer.\n\nCaso haja necessidade de alteração de data, avaliamos cada situação individualmente, sempre buscando a melhor solução possível, de acordo com a disponibilidade da agenda e o estágio do processo de criação.\n\nTudo é tratado com cuidado, diálogo e transparência, respeitando tanto a história de vocês quanto o planejamento necessário para garantir a qualidade da entrega."
                    },
                    {
                      id: 'item-9',
                      question: "Como é feita a entrega?",
                      answer: "A entrega é feita pessoalmente por mim no local do casamento.\n\nChego com antecedência para garantir que o bolo seja posicionado perfeitamente e que todos os detalhes estejam impecáveis para o momento do corte. Também fico disponível para orientar a equipe do evento se necessário.\n\nMeu compromisso é garantir que este momento seja exatamente como vocês imaginaram."
                    }
                  ].map((item) => (
                    <div className="group" key={item.id}>
                      <AccordionItem
                        value={item.id}
                        className="peer rounded-xl border-none px-5 py-1 md:px-7 data-[state=open]:bg-[#fefdfb] data-[state=open]:shadow-sm fade-in"
                      >
                        <AccordionTrigger className="cursor-pointer text-lg hover:no-underline text-left font-semibold text-[#703535]">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-foreground text-left text-base whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                      <hr className="mx-5 -mb-px group-last:hidden peer-data-[state=open]:hidden md:mx-7 border-[#e8d4d4]" />
                    </div>
                  ))}
                </Accordion>

                <p className="text-muted-foreground text-center fade-in">
                  Não encontrou o que procura? Entre em contato{' '}
                  <a
                    href="https://wa.me/5548991797296?text=Olá, Duda! Tenho uma dúvida sobre a proposta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D65B58] font-medium hover:underline cursor-pointer"
                  >
                    pelo WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Sobre Section */}
          <section className="py-20 bg-[#F6EEE1]">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                  <img
                    alt="Duda Berger - Confeiteira especializada em bolos de casamento"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                    loading="lazy"
                    fetchPriority="auto"
                    decoding="async"
                    src="/images/casamento/sobre-casamento.webp"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="fade-in text-2xl md:text-3xl font-bold mb-8 text-[#D65B58] font-unbounded">
                    Quem estará com vocês nesse processo
                  </h2>
                  <div className="space-y-4 leading-relaxed text-[#703535]">
                    <p className="fade-in">
                      Criar bolos de casamento nunca foi apenas uma entrega técnica para mim.
                      É um trabalho que exige escuta, presença e intenção.
                    </p>
                    <p className="fade-in">
                      Quando vocês escolhem ter o bolo do casamento criado aqui, estão escolhendo alguém que entende que esse não é apenas mais um evento — é um marco na história de vocês.
                    </p>
                    <p className="fade-in">
                      Cada projeto é tratado como único. Por que ele é.<br/>
                      Cada decisão importa, porque faz parte de um momento que não se repete.
                    </p>
                    <p className="fade-in">
                      Enquanto crio, penso no casal, na história, no clima da celebração e no significado que esse gesto carrega.
                      Nada é automático. Nada é genérico.
                    </p>
                    <p className="fade-in">
                      Meu compromisso é garantir que o resultado final esteja à altura do dia que vocês estão construindo — com cuidado, respeito e atenção a cada detalhe.
                    </p>
                    <p className="fade-in">
                      No fim, não é apenas sobre bolo.
                      É sobre honrar um dos dias mais importantes da vida de vocês.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-[#f9f3e7] rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            {/* Botão fechar X */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {paymentStep === 'choose' ? (
              <>
                <h3 className="text-xl font-bold font-unbounded text-[#703535] mb-2 text-center">
                  Escolha a forma de pagamento
                </h3>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  Selecione a melhor forma de pagamento para você
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handlePaymentChoice('pix')}
                    className="btn-primary-md-outline w-full flex items-center justify-center gap-3"
                  >
                    <CircleDollarSign className="w-6 h-6" />
                    Pix à vista
                  </button>
                  
                  <button
                    onClick={() => handlePaymentChoice('card')}
                    className="btn-primary-md w-full flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    12x no cartão
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold font-unbounded text-[#703535] mb-2 text-center">
                  Pagamento via PIX
                </h3>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  Use o CNPJ abaixo para realizar o pagamento
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-md font-bold font-mono text-[#703535]">
                      59.138.056/0001-50
                    </p>
                    <button
                      onClick={handleCopyCNPJ}
                      className="p-2 bg-[#703535] text-white rounded-lg hover:bg-[#5a2a2a] transition-all"
                      title="Copiar CNPJ"
                    >
                      {copiedCNPJ ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {copiedCNPJ && (
                    <p className="text-sm text-green-600 text-center mt-2">CNPJ copiado!</p>
                  )}
                </div>

                <p className="text-sm text-gray-600 text-center mb-6">
                  Após realizar o pagamento, envie o comprovante pelo WhatsApp
                </p>

                <div className="flex justify-center">
                  <a
                    href="https://wa.me/5548991797296?text=Olá, realizei o pagamento via PIX e gostaria de enviar o comprovante"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#a9cebf] text-[#183D32] rounded-full hover:opacity-90 transition-all duration-300 font-unbounded font-bold text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enviar comprovante
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
