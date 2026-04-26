import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atendimento de Noivos | Processos | Conto Atelier',
  description: 'Fluxo completo de atendimento de noivos: da entrada do lead ao pós-venda, com mensagens modelo e regras operacionais.',
  openGraph: {
    title: 'Atendimento de Noivos | Processos | Conto Atelier',
    description: 'Fluxo completo de atendimento de noivos: da entrada do lead ao pós-venda, com mensagens modelo e regras operacionais.',
    siteName: 'Conto Atelier',
    locale: 'pt_BR',
    type: 'article',
  },
};

export default function AtendimentoNoivosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
