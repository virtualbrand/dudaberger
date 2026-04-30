'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageCircle, Heart, FileText, Image, GitBranch,
  Coffee, Send, RefreshCw, FileCheck, CreditCard, Star,
  ChevronRight, ArrowRight, AlertCircle, Clock, Calendar,
  ChevronDown, ChevronUp, Copy, Check,
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
  { num: 2, label: 'Acolhimento', icon: <Heart className="w-4 h-4" /> },
  { num: 3, label: 'Briefing', icon: <FileText className="w-4 h-4" /> },
  { num: 4, label: 'Inspirações', icon: <Image className="w-4 h-4" /> },
  { num: 5, label: 'Direcionamento', icon: <GitBranch className="w-4 h-4" /> },
  { num: 6, label: 'Follow-up', icon: <RefreshCw className="w-4 h-4" /> },
  { num: 7, label: 'Fechamento', icon: <FileCheck className="w-4 h-4" /> },
  { num: 8, label: 'Pagamento', icon: <CreditCard className="w-4 h-4" /> },
  { num: 9, label: 'Pós-venda', icon: <Star className="w-4 h-4" /> },
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
      objetivo: 'Responder rapidamente e iniciar conexão.',
      conteudo: (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Origem</p>
              <p className="text-sm font-medium text-gray-700">WhatsApp</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag cor="#D65B58"><Clock className="w-3 h-3" />Responder em até 5 minutos</Tag>
            <Tag cor="#703535">Tom humano e acolhedor</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 2,
      icone: <Heart className="w-5 h-5" />,
      titulo: 'Acolhimento',
      cor: '#b17878',
      bgCor: '#fdf0d8',
      objetivo: 'Gerar conexão e abertura.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Oi [Nome]! 💛

Que alegria receber tua mensagem, tudo bem?

Já imagino que esse momento esteja cheio de expectativas por aí ✨ me conta um pouquinho sobre o casamento de vocês!`}</Mensagem>
        </div>
      ),
    },
    {
      numero: 3,
      icone: <FileText className="w-5 h-5" />,
      titulo: 'Briefing',
      cor: '#703535',
      bgCor: '#fdf0d8',
      objetivo: 'Coletar informações e qualificar o lead.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Pra eu conseguir te enviar uma proposta bem alinhada com o que vocês imaginam, o primeiro passo é responder nosso briefing de noivos ✨

É rapidinho e super importante — através dele eu entendo cada detalhe com carinho, desde o estilo até o que é mais especial pra vocês nesse dia 💛

https://dudaberger.com.br/wedding`}</Mensagem>
          <div className="flex gap-2 mt-2">
            <Tag cor="#D65B58">Obrigatório antes da proposta</Tag>
          </div>
        </div>
      ),
    },
    {
      numero: 4,
      icone: <Image className="w-5 h-5" />,
      titulo: 'Inspirações',
      cor: '#9b6e20',
      bgCor: '#fdf0d8',
      objetivo: 'Entender preferências visuais e estilo.',
      conteudo: (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mensagem modelo</p>
          <Mensagem>{`Se vocês tiverem alguma referência de bolo ou estilo que gostam, podem me mandar também 🥰

Isso ajuda muito a gente a criar algo bem único e com a cara de vocês ✨`}</Mensagem>
        </div>
      ),
    },
    {
      numero: 5,
      icone: <GitBranch className="w-5 h-5" />,
      titulo: 'Direcionamento',
      cor: '#2e7042',
      bgCor: '#e4f2e8',
      objetivo: 'Guiar o lead para o próximo passo: degustação ou proposta.',
      conteudo: (
        <div className="space-y-4">
          <Mensagem>{`Agora me conta uma coisa ✨

Vocês preferem receber a proposta primeiro pra entender valores e estrutura, ou gostariam de fazer a degustação antes?

Ah, e um detalhe importante pra te explicar com transparência 💛

Quando enviamos a proposta, ela vem com uma condição especial de 17% OFF válida por 7 dias — é algo que conseguimos oferecer só nesse primeiro momento.`}</Mensagem>

          {/* Bifurcação visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="border-2 border-[#a9cebf] rounded-xl p-4 bg-[#e4f2e8]">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-[#2e7042]" />
                <span className="text-sm font-semibold text-[#2e7042] font-unbounded">Caminho A</span>
              </div>
              <p className="text-xs text-[#183D32] font-medium mb-1">Degustação</p>
              <p className="text-xs text-gray-600">Degustação → Proposta → Fechamento</p>
              <div className="mt-2 text-xs text-[#2e7042] bg-white rounded-lg px-2 py-1">
                ⭐ 17% OFF válido se fechar em 7 dias após a proposta
              </div>
            </div>
            <div className="border-2 border-[#D65B58]/30 rounded-xl p-4 bg-[#fff5f5]">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-4 h-4 text-[#D65B58]" />
                <span className="text-sm font-semibold text-[#D65B58] font-unbounded">Caminho B</span>
              </div>
              <p className="text-xs text-[#703535] font-medium mb-1">Proposta Direto</p>
              <p className="text-xs text-gray-600">Proposta → Fechamento</p>
              <div className="mt-2 text-xs text-[#D65B58] bg-white rounded-lg px-2 py-1">
                ⭐ 17% OFF válido por 7 dias após o envio
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      numero: 6,
      icone: <RefreshCw className="w-5 h-5" />,
      titulo: 'Follow-up',
      cor: '#6b4d8a',
      bgCor: '#ede8f5',
      objetivo: 'Manter contato e nutrir a decisão.',
      conteudo: (
        <div className="space-y-4">
          {[
            {
              prazo: '24 horas',
              msg: 'Oi [Nome]! 💛\n\nConseguiu dar uma olhadinha no briefing / proposta?\n\nSe tiver qualquer dúvida ou quiser ajustar algo, estou por aqui ✨',
            },
            {
              prazo: '3 dias',
              msg: 'Oi [Nome]! 💛\n\nFiquei pensando no casamento de vocês e no bolo que poderíamos criar ✨\n\nSe quiser, posso te ajudar a ajustar a proposta pra encaixar melhor no que vocês imaginam 🥰',
            },
            {
              prazo: '7 dias',
              msg: 'Oi [Nome]! 💛\n\nPassando pra te avisar que o prazo da condição especial da proposta (17% OFF) está acabando ✨\n\nSe fizer sentido pra vocês, ainda dá tempo de garantir esse benefício 🥰',
            },
            {
              prazo: '15 dias',
              msg: 'Oi [Nome]! 💛\n\nVou encerrar o atendimento por aqui pra organizar nossa agenda, mas qualquer momento que quiser retomar é só me chamar ✨\n\nVai ser um prazer fazer parte desse momento de vocês 🥰',
            },
          ].map(({ prazo, msg }) => (
            <div key={prazo} className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#6b4d8a] flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="w-px flex-1 bg-[#6b4d8a]/20" />
              </div>
              <div className="pb-4 flex-1">
                <Tag cor="#6b4d8a"><Clock className="w-3 h-3" />{prazo}</Tag>
                <div className="mt-2">
                  <Mensagem>{msg}</Mensagem>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      numero: 7,
      icone: <FileCheck className="w-5 h-5" />,
      titulo: 'Fechamento',
      cor: '#D65B58',
      bgCor: '#fdf0d8',
      objetivo: 'Formalizar o contrato.',
      conteudo: (
        <div className="space-y-3">
          <Mensagem>{`Que alegria ter vocês com a gente nesse momento! 💛

Pra seguir com a reserva da data, é só preencher esses dados rapidinho:

[LINK DA PROPOSTA COM #dados]

Assim já consigo gerar o contrato certinho pra vocês ✨`}</Mensagem>
          <Tag cor="#D65B58">Enviar link da proposta com ancora #dados</Tag>
        </div>
      ),
    },
    {
      numero: 8,
      icone: <CreditCard className="w-5 h-5" />,
      titulo: 'Pagamento e Reserva',
      cor: '#2e7042',
      bgCor: '#e4f2e8',
      objetivo: 'Confirmar pagamento e garantir a data.',
      conteudo: (
        <div className="space-y-3">
          <Mensagem>{`Pagamento confirmado 💛✨

Data de vocês já está reservada com a gente!

Mais perto do casamento vamos alinhar todos os detalhes finais 🥰`}</Mensagem>
        </div>
      ),
    },
    {
      numero: 9,
      icone: <Star className="w-5 h-5" />,
      titulo: 'Pós-venda',
      cor: '#9b6e20',
      bgCor: '#fdf0d8',
      objetivo: 'Acompanhar os noivos até o grande dia com comunicação ativa e encantadora.',
      conteudo: (
        <div className="space-y-4">
          {[
            {
              prazo: '60–90 dias antes',
              msg: 'Oi [Nome]! 💛\n\nPassando pra gente começar a alinhar os detalhes finais do bolo ✨\n\nMudou algo no estilo, número de convidados ou referências?',
            },
            {
              prazo: '30 dias antes',
              msg: 'Oi [Nome]! 💛\n\nEstamos chegando perto do grande dia ✨\n\nVou organizar tudo aqui e já deixar tudo redondinho pra vocês 🥰',
            },
            {
              prazo: '7 dias antes',
              msg: 'Semana do casamento 😍✨\n\nPode deixar que vamos cuidar de tudo com muito carinho 💛',
            },
            {
              prazo: 'Pós-evento',
              msg: 'Oi [Nome]! 💛\n\nQueria te agradecer por confiar na gente nesse momento tão especial ✨\n\nSe quiser me contar como foi o casamento ou mandar fotos, vou amar 🥰',
            },
          ].map(({ prazo, msg }) => (
            <div key={prazo} className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#9b6e20] flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="w-px flex-1 bg-[#9b6e20]/20" />
              </div>
              <div className="pb-4 flex-1">
                <Tag cor="#9b6e20"><Calendar className="w-3 h-3" />{prazo}</Tag>
                <div className="mt-2">
                  <Mensagem>{msg}</Mensagem>
                </div>
              </div>
            </div>
          ))}
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
export default function AtendimentoNoivosPage() {
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
          <span className="text-[#703535] font-medium">Atendimento de Noivos</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hero */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-[#D65B58]/10 text-[#D65B58] px-2.5 py-1 rounded-full font-medium">Comercial</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">9 etapas</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-unbounded font-bold text-[#703535] mb-3">
            Atendimento de Noivos
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Converter leads em clientes, oferecendo uma experiência afetiva, organizada e premium — aumentando a taxa de fechamento e o valor percebido.
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

          {/* Bifurcação */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#e4f2e8] border border-[#a9cebf] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="w-4 h-4 text-[#2e7042]" />
                <span className="text-sm font-semibold text-[#2e7042] font-unbounded">Caminho A — Degustação</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#183D32]">
                <span className="bg-white rounded-full px-2 py-1">Degustação</span>
                <ArrowRight className="w-3 h-3 text-[#2e7042]" />
                <span className="bg-white rounded-full px-2 py-1">Proposta</span>
                <ArrowRight className="w-3 h-3 text-[#2e7042]" />
                <span className="bg-white rounded-full px-2 py-1">Fechamento</span>
              </div>
              <p className="text-xs text-[#2e7042] mt-3 bg-white/60 rounded-lg px-3 py-2">
                ⭐ 17% OFF válido se fechar em 7 dias após o envio da proposta
              </p>
            </div>
            <div className="bg-[#fff5f5] border border-[#D65B58]/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Send className="w-4 h-4 text-[#D65B58]" />
                <span className="text-sm font-semibold text-[#D65B58] font-unbounded">Caminho B — Proposta Direto</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#703535]">
                <span className="bg-white rounded-full px-2 py-1">Proposta</span>
                <ArrowRight className="w-3 h-3 text-[#D65B58]" />
                <span className="bg-white rounded-full px-2 py-1">Fechamento</span>
              </div>
              <p className="text-xs text-[#D65B58] mt-3 bg-white/60 rounded-lg px-3 py-2">
                ⭐ 17% OFF válido por 7 dias após o envio
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
            <Regra>Responder em até 5 minutos sempre que possível.</Regra>
            <Regra>O briefing deve ser respondido antes de enviar a proposta.</Regra>
            <Regra>Toda proposta é personalizada.</Regra>
            <Regra>Condição especial de 17% OFF válida por <strong>7 dias</strong> após o envio da proposta.</Regra>
            <Regra>O benefício é válido somente no <strong>primeiro envio</strong> da proposta.</Regra>
            <Regra>Não reativar desconto após vencimento.</Regra>
            <Regra>Comunicação clara, acolhedora e profissional em todas as etapas.</Regra>
          </ul>
        </div>

      </div>
    </div>
  );
}
