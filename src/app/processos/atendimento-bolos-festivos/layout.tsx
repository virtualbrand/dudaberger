import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atendimento — Bolos Festivos | Processos | Conto Atelier',
  description: 'Fluxo de atendimento para pedidos de bolos festivos: da entrada do lead ao pagamento e retirada, com mensagens modelo e regras operacionais.',
  openGraph: {
    title: 'Atendimento — Bolos Festivos | Processos | Conto Atelier',
    description: 'Fluxo de atendimento para pedidos de bolos festivos: da entrada do lead ao pagamento e retirada, com mensagens modelo e regras operacionais.',
    siteName: 'Conto Atelier',
    locale: 'pt_BR',
    type: 'article',
  },
};

export default function AtendimentoBolosFestivosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
