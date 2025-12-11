export interface Proposta {
  id: string;
  clienteNome: string;
  valorTotal: number;
  status: 'rascunho' | 'enviada' | 'aceita' | 'recusada';
  dataCriacao: string;
  dataEvento: string;
  descricao?: string;
  itens: PropostaItem[];
}

export interface PropostaItem {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
