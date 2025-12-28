export interface CasamentoLead {
  id: string;
  nomeNoivo: string;
  nomeNoiva: string;
  telefone: string;
  dataCasamento: string;
  numeroConvidados: number;
  orcamento: string;
  observacoes?: string;
  status: 'leads' | 'proposta' | 'aceita' | 'encerrado';
  createdAt: string;
}
