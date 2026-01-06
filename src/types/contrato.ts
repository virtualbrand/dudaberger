export interface Contrato {
  id: string;
  clienteNome: string;
  valorTotal: number;
  status: 'rascunho' | 'ativo' | 'concluido' | 'cancelado';
  dataCriacao: string;
  dataEvento: string;
  dataContrato?: string;
  descricao?: string;
  slug?: string; // URL amigável (ex: contrato-joao-maria)
  localFesta?: string;
  numeroConvidados?: number;
  nomeNoiva?: string;
  cpfNoiva?: string;
  nomeNoivo?: string;
  cpfNoivo?: string;
  endereco?: string;
  assinaturaNoiva?: string;
  assinaturaNoivo?: string;
}
