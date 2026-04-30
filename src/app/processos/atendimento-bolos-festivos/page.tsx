'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageCircle, Calendar, Coffee, Package, Palette,
  CreditCard, Truck, MapPin, ChevronRight, ArrowRight,
  AlertCircle, Clock, ChevronDown, ChevronUp, Copy, Check,
  HelpCircle,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */
interface Etapa {
  numero: number;
  icone: React.ReactNode;
  titulo: string;
  cor: string;
  bgCor: string;
  objetivo: string;
  conteudo: React.ReactNode;
}

/* ─── Helpers ────────────────────────────────────────────── */
function Mensagem({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false);

  function getText(): string {
    function extract(node: React.ReactNode): string {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extract).join('');
      if (React.isValidElement(node)) {
        const el = node as React.ReactElement<{ children?: React.ReactNode }>;
        return extract(el.props.children);
      }
      return '';
    }
    return extract(children);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-sm">
      <div
        onClick={handleCopy}
        title="Copiar mensagem"
        className="cursor-pointer w-full text-left bg-[#e7f3ef] border border-[#a9cebf] rounded-2xl rounded-tl-sm overflow-hidden transition-all active:scale-[0.99] hover:border-[#7db09a] select-none"
      >
        <div className="px-4 pt-3 pb-2 text-sm font-normal font-kumbh text-[#183D32] leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
        <div className="flex items-center justify-end gap-1.5 px-3 py-1.5 border-t border-[#a9cebf]/40">
          {copied ? (
            <span className="flex items-center gap-1 text-[10px] font-kumbh text-[#2e7042]">
              <Check className="w-3 h-3" />
              Copiado!
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-kumbh text-[#7db09a]">
              <Copy className="w-3 h-3" />
              Copiar
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Tag({ children, cor }: { children: React.ReactNode; cor: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: `${cor}18`, color: cor }}
    >
      {children}
    </span>
  );
}

function Regra({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-700">
      <div className="w-4 h-4 rounded-full bg-[#a9cebf] flex items-center justify-center shrink-0 mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#183D32]" />
      </div>
      {children}
    </li>
  );
}

/* ─── Flow Overview ─────────────────────────────────────── */
const flowSteps = [
  { num: 1, label: 'Entrada do Lead', icon: <MessageCircle className="w-4 h-4" /> },
  { num: 2, label: 'Data do Pedido', icon: <Calendar className="w-4 h-4" /> },
  { num: 3, label: 'Sabor', icon: <Coffee className="w-4 h-4" /> },
  { num: 4, label: 'Tamanho e Valores', icon: <Package className="w-4 h-4" /> },
  { num: 5, label: 'Decoração', icon: <Palette className="w-4 h-4" /> },
  { num: 6, label: 'Pagamento e Retirada', icon: <CreditCard className="w-4 h-4" /> },
  { num: 7, label: 'Entrega', icon: <Truck className="w-4 h-4" /> },
];

/* ─── Etapas Data ────────────────────────────────────────── */
function buildEtapas(): Etapa[] {
  return [
    {
      numero: 1,
      icone: <MessageCircle className="w-5 h-5" />,
      titulo: 'Entrada do Lead',
      cor: '#D65B58',
      bgCor: '#fdf0d8',
      objetivo: 'Responder a dúvida inicial do cliente e abrir o fluxo de atendimento.',
      conteudo: (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Dúvidas mais comuns na primeira mensagem</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Tamanho do bolo',
                'Sabores disponíveis',
                'Opções de decoração',
                'Tem entrega?',
                'Onde é a retirada?',
                'Aceita data específica?',
              ].map((q) => (
                <div key={q} className="flex items-center gap-2 bg-[#fdf0d8] border border-[#D65B58]/20 rounded-xl px-3 py-2.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D65B58] shrink-0" />
                  <span className="text-xs text-[#703535] font-medium leading-tight">{q}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Regra principal</p>
            <div className="bg-[#fff8f0] border-l-4 border-[#D65B58] rounded-r-xl px-4 py-3 text-sm text-[#703535]">
              Responda primeiro a dúvida específica do cliente, depois conduza naturalmente para o fluxo padronizado.
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Mensagem de abertura (modelo)</p>
            <Mensagem>{`Oi [Nome]! 💛 Que bom te ter por aqui!

[Resposta à dúvida do cliente]

Me conta um pouquinho mais sobre o pedido — a data, a ocasião... assim consigo te ajudar melhor ✨`}</Mensagem>
          </div>
        </div>
      ),
    },
    {
      numero: 2,
      icone: <Calendar className="w-5 h-5" />,
      titulo: 'Data do Pedido',
      cor: '#9b6e20',
      bgCor: '#fdf8ed',
      objetivo: 'Confirmar a data do evento e verificar disponibilidade de produção.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Pra qual data você precisa do bolo? 💛

Com a data em mãos, já consigo verificar a disponibilidade aqui na agenda e te confirmar se conseguimos atender ✨`}</Mensagem>
          <div className="flex flex-wrap gap-2 mt-2">
            <Tag cor="#9b6e20"><Clock className="w-3 h-3" />Verificar agenda antes de confirmar</Tag>
            <Tag cor="#703535">Data confirmada antes de seguir</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 3,
      icone: <Coffee className="w-5 h-5" />,
      titulo: 'Sabor',
      cor: '#b17878',
      bgCor: '#fdf0d8',
      objetivo: 'Definir o sabor do bolo para apresentar os tamanhos disponíveis.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Ótimo! Agora me conta — qual sabor você teria em mente? 🥰

Temos uma seleção especial e, dependendo do sabor escolhido, os tamanhos e valores podem variar um pouquinho ✨`}</Mensagem>
          <div className="flex flex-wrap gap-2 mt-2">
            <Tag cor="#b17878">Sabor define os tamanhos disponíveis</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 4,
      icone: <Package className="w-5 h-5" />,
      titulo: 'Tamanho e Valores',
      cor: '#2e7042',
      bgCor: '#e4f2e8',
      objetivo: 'Apresentar as opções de tamanho com peso e valores para o sabor escolhido.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Perfeito! No sabor [SABOR], trabalho com os seguintes tamanhos:

🍰 [TAMANHO 1] — [X porções] · [Xkg]
R$ [VALOR]

🎂 [TAMANHO 2] — [X porções] · [Xkg]
R$ [VALOR]

🎂 [TAMANHO 3] — [X porções] · [Xkg]
R$ [VALOR]

Qual deles faz mais sentido pro seu evento? 💛`}</Mensagem>
          <div className="flex flex-wrap gap-2 mt-2">
            <Tag cor="#2e7042">Valores sem decoração personalizada</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 5,
      icone: <Palette className="w-5 h-5" />,
      titulo: 'Decoração',
      cor: '#703535',
      bgCor: '#fdf0d8',
      objetivo: 'Definir o estilo de decoração e informar o valor adicional se houver personalização.',
      conteudo: (
        <div className="space-y-4">
          <Mensagem>{`Quanto à decoração, tem duas possibilidades 💛

A decoração clássica / naked já está incluída no valor ✨

Ou, se quiser algo mais personalizado — com tema, flores, toppers ou detalhes específicos — é só me contar a ideia que faço um orçamento separado pra decoração 🥰`}</Mensagem>

          {/* Bifurcação visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="border-2 border-[#a9cebf] rounded-xl p-4 bg-[#e4f2e8]">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-[#2e7042]" />
                <span className="text-sm font-semibold text-[#2e7042] font-unbounded">Clássica / Naked</span>
              </div>
              <p className="text-xs text-[#183D32] font-medium mb-1">Do menu</p>
              <p className="text-xs text-gray-600">Decoração padrão incluída no valor base</p>
              <div className="mt-2 text-xs text-[#2e7042] bg-white rounded-lg px-2 py-1">
                ✅ Sem custo adicional
              </div>
            </div>
            <div className="border-2 border-[#D65B58]/30 rounded-xl p-4 bg-[#fff5f5]">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-[#D65B58]" />
                <span className="text-sm font-semibold text-[#D65B58] font-unbounded">Personalizada</span>
              </div>
              <p className="text-xs text-[#703535] font-medium mb-1">Sob orçamento</p>
              <p className="text-xs text-gray-600">Tema, flores, toppers, detalhes específicos</p>
              <div className="mt-2 text-xs text-[#D65B58] bg-white rounded-lg px-2 py-1">
                💬 Valor adicional conforme o pedido
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      numero: 6,
      icone: <CreditCard className="w-5 h-5" />,
      titulo: 'Pagamento e Retirada',
      cor: '#D65B58',
      bgCor: '#fdf0d8',
      objetivo: 'Detalhar o pedido, formas de pagamento e informações de retirada.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Ótimo! Deixa eu te confirmar o pedido 💛

🎂 Bolo: [SABOR]
📏 Tamanho: [TAMANHO] ([X porções] · [Xkg])
🎨 Decoração: [DECORAÇÃO]
📅 Data: [DATA]
💰 Total: R$ [VALOR TOTAL]

Para o pagamento, aceitamos:
• Pix (à vista)
• Cartão de crédito (link de pagamento)

🏠 Retirada: [ENDEREÇO / HORÁRIO DE RETIRADA]

Confirma pra eu reservar a data pra você? ✨`}</Mensagem>
          <div className="flex flex-wrap gap-2 mt-2">
            <Tag cor="#D65B58">Confirmar pedido por escrito antes de cobrar</Tag>
            <Tag cor="#2e7042">Pagamento confirma a reserva</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 7,
      icone: <Truck className="w-5 h-5" />,
      titulo: 'Entrega (Opcional)',
      cor: '#6b4d8a',
      bgCor: '#ede8f5',
      objetivo: 'Informar sobre entrega e calcular o valor com base no endereço do cliente.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Sim, temos entrega disponível! 💛

Pra calcular o frete certinho, você pode me passar o endereço completo de entrega? ✨

Assim confirmo o valor pra você.`}</Mensagem>
          <div className="flex flex-wrap gap-2 mt-2">
            <Tag cor="#6b4d8a"><MapPin className="w-3 h-3" />Calcular frete após receber o endereço</Tag>
            <Tag cor="#703535">Informar valor de entrega separado do bolo</Tag>
          </div>
        </div>
      ),
    },
  ];
}

/* ─── Accordion Card ─────────────────────────────────────── */
function EtapaCard({ etapa, open, onToggle }: { etapa: Etapa; open: boolean; onToggle: () => void }) {
  return (
    <div
      id={`etapa-${etapa.numero}`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all"
      style={{ borderLeftWidth: 4, borderLeftColor: etapa.cor }}
    >
      <button
        onClick={onToggle}
        className="cursor-pointer w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${etapa.cor}18`, color: etapa.cor }}
        >
          {etapa.icone}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-medium text-gray-400">Etapa {etapa.numero}</span>
          </div>
          <p className="font-semibold text-[#703535] font-unbounded text-sm">{etapa.titulo}</p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{etapa.objetivo}</p>
        </div>
        <div className="shrink-0 text-gray-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100">
          <div className="mb-3">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Objetivo</span>
            <p className="text-sm text-gray-700 mt-1">{etapa.objetivo}</p>
          </div>
          {etapa.conteudo}
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function AtendimentoBolosFestivosPage() {
  const etapas = buildEtapas();
  const [openStates, setOpenStates] = React.useState<Record<number, boolean>>({});

  function handleFlowClick(num: number) {
    setOpenStates(prev => ({ ...prev, [num]: true }));
    setTimeout(() => {
      document.getElementById(`etapa-${num}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/processos" className="cursor-pointer hover:text-[#D65B58] transition-colors">Processos</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#703535] font-medium">Atendimento — Bolos Festivos</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hero */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-[#D65B58]/10 text-[#D65B58] px-2.5 py-1 rounded-full font-medium">Comercial</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">7 etapas</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-unbounded font-bold text-[#703535] mb-3">
            Atendimento — Bolos Festivos
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Converter leads em pedidos confirmados, respondendo às dúvidas iniciais com acolhimento e conduzindo o cliente por um fluxo claro de sabor, tamanho, decoração e pagamento.
          </p>
        </div>

        {/* Fluxo Visual */}
        <div>
          <h2 className="text-sm font-unbounded font-semibold text-[#703535] uppercase tracking-widest mb-5">
            Visão Geral do Fluxo
          </h2>

          {/* Steps row */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
            <div className="flex items-start gap-0 min-w-max">
              {flowSteps.map((step, i) => (
                <React.Fragment key={step.num}>
                  <button
                    onClick={() => handleFlowClick(step.num)}
                    className="flex flex-col items-center gap-2 w-20 group cursor-pointer focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#703535] flex items-center justify-center text-white shrink-0 group-hover:bg-[#D65B58] transition-colors">
                      {step.icon}
                    </div>
                    <p className="text-xs text-center text-gray-600 leading-tight group-hover:text-[#D65B58] transition-colors">{step.label}</p>
                  </button>
                  {i < flowSteps.length - 1 && (
                    <div className="flex items-start pt-[12px] mx-1 shrink-0">
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Decoração bifurcação */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#e4f2e8] border border-[#a9cebf] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-[#2e7042]" />
                <span className="text-sm font-semibold text-[#2e7042] font-unbounded">Decoração Clássica / Naked</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#183D32]">
                <span className="bg-white rounded-full px-2 py-1">Tamanho</span>
                <ArrowRight className="w-3 h-3 text-[#2e7042]" />
                <span className="bg-white rounded-full px-2 py-1">Fechamento</span>
              </div>
              <p className="text-xs text-[#2e7042] mt-3 bg-white/60 rounded-lg px-3 py-2">
                ✅ Sem custo adicional — decoração incluída no valor
              </p>
            </div>
            <div className="bg-[#fff5f5] border border-[#D65B58]/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-[#D65B58]" />
                <span className="text-sm font-semibold text-[#D65B58] font-unbounded">Decoração Personalizada</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#703535]">
                <span className="bg-white rounded-full px-2 py-1">Tamanho</span>
                <ArrowRight className="w-3 h-3 text-[#D65B58]" />
                <span className="bg-white rounded-full px-2 py-1">Orçamento Deco</span>
                <ArrowRight className="w-3 h-3 text-[#D65B58]" />
                <span className="bg-white rounded-full px-2 py-1">Fechamento</span>
              </div>
              <p className="text-xs text-[#D65B58] mt-3 bg-white/60 rounded-lg px-3 py-2">
                💬 Valor adicional conforme o pedido de personalização
              </p>
            </div>
          </div>
        </div>

        {/* Etapas */}
        <div>
          <h2 className="text-sm font-unbounded font-semibold text-[#703535] uppercase tracking-widest mb-5">
            Etapas Detalhadas
          </h2>
          <div className="space-y-3">
            {etapas.map(e => (
              <EtapaCard
                key={e.numero}
                etapa={e}
                open={!!openStates[e.numero]}
                onToggle={() => setOpenStates(prev => ({ ...prev, [e.numero]: !prev[e.numero] }))}
              />
            ))}
          </div>
        </div>

        {/* Regras */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#ede8f5] flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-[#6b4d8a]" />
            </div>
            <h2 className="text-sm font-unbounded font-semibold text-[#703535] uppercase tracking-widest">
              Regras Operacionais
            </h2>
          </div>
          <ul className="space-y-3">
            <Regra>Responder a dúvida específica do cliente antes de conduzir ao fluxo.</Regra>
            <Regra>Confirmar a data do pedido e verificar disponibilidade na agenda antes de seguir.</Regra>
            <Regra>O sabor deve ser definido antes de apresentar tamanhos e valores.</Regra>
            <Regra>Valores apresentados são do bolo <strong>sem</strong> decoração personalizada incluída.</Regra>
            <Regra>Decoração clássica / naked do menu está incluída no valor base.</Regra>
            <Regra>Decoração personalizada tem custo adicional — orçar separadamente.</Regra>
            <Regra>Confirmar o pedido por escrito antes de enviar o link de pagamento.</Regra>
            <Regra>Valor de entrega só é informado após receber o endereço completo.</Regra>
            <Regra>Pagamento confirma a reserva da data de produção.</Regra>
          </ul>
        </div>

      </div>
    </div>
  );
}
