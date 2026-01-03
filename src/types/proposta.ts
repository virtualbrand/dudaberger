export interface Proposta {
  id: string;
  clienteNome: string;
  valorTotal: number;
  status: 'rascunho' | 'enviada' | 'aceita' | 'recusada' | 'expirada';
  dataCriacao: string;
  dataEvento: string;
  descricao?: string;
  slug?: string; // URL amigável (ex: casal-joao-maria)
  localFesta?: string; // Local da festa/cerimônia
  numeroConvidados?: number; // Número de convidados
  linkPagamento7Dias?: string; // Link de pagamento com prazo de 7 dias
  linkPagamento21Dias?: string; // Link de pagamento com prazo de 21 dias
  itens: PropostaItem[];
}

export interface PropostaItem {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
