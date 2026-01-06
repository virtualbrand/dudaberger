import { Proposta } from '@/types/proposta';

export const mockPropostas: Proposta[] = [
  {
    id: '1',
    clienteNome: 'João Silva & Maria Santos',
    valorTotal: 18500,
    status: 'enviada',
    dataCriacao: '2025-01-10T10:30:00',
    dataEvento: '2025-06-14T16:00:00',
    descricao: 'Proposta para casamento com 150 convidados',
    slug: 'joao-silva-maria-santos',
    localFesta: 'Espaço Villa Garden',
    numeroConvidados: 150,
    itens: [
      { id: '1', nome: 'Bolo de Casamento 3 andares', quantidade: 1, valorUnitario: 3500, valorTotal: 3500 },
      { id: '2', nome: 'Docinhos Finos', quantidade: 200, valorUnitario: 5, valorTotal: 1000 },
      { id: '3', nome: 'Bem Casados', quantidade: 150, valorUnitario: 8, valorTotal: 1200 },
    ],
  },
  {
    id: '2',
    clienteNome: 'Carlos Ferreira & Juliana Lima',
    valorTotal: 15000,
    status: 'aceita',
    dataCriacao: '2025-11-28T09:00:00',
    dataEvento: '2025-07-09T15:00:00',
    descricao: 'Proposta para casamento com 120 convidados',
    slug: 'carlos-ferreira-juliana-lima',
    localFesta: 'Fazenda São João',
    numeroConvidados: 120,
    itens: [
      { id: '1', nome: 'Bolo de Casamento 2 andares', quantidade: 1, valorUnitario: 2800, valorTotal: 2800 },
      { id: '2', nome: 'Cupcakes', quantidade: 120, valorUnitario: 8, valorTotal: 960 },
    ],
  },
  {
    id: '3',
    clienteNome: 'Pedro Oliveira & Ana Costa',
    valorTotal: 25000,
    status: 'rascunho',
    dataCriacao: '2025-12-01T14:15:00',
    dataEvento: '2025-08-19T18:00:00',
    slug: 'pedro-oliveira-ana-costa',
    localFesta: 'Casa de Festas Estrela',
    numeroConvidados: 200,
    itens: [],
  },
];
