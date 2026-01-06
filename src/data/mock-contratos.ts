import { Contrato } from '@/types/contrato';

export const mockContratos: Contrato[] = [
  {
    id: '1',
    clienteNome: 'João Silva & Maria Santos',
    valorTotal: 18500,
    status: 'ativo',
    dataCriacao: '2025-01-15T10:00:00',
    dataEvento: '2025-06-14T16:00:00',
    descricao: 'Contrato para casamento com 150 convidados. Inclui bolo de 3 andares, docinhos finos e bem casados personalizados.',
    slug: 'joao-silva-maria-santos',
    localFesta: 'Espaço Villa Garden',
    numeroConvidados: 150,
  },
  {
    id: '2',
    clienteNome: 'Carlos Ferreira & Juliana Lima',
    valorTotal: 15000,
    status: 'concluido',
    dataCriacao: '2024-12-01T09:00:00',
    dataEvento: '2025-03-20T15:00:00',
    descricao: 'Contrato concluído com sucesso. Evento realizado conforme planejado.',
    slug: 'carlos-ferreira-juliana-lima',
    localFesta: 'Fazenda São João',
    numeroConvidados: 120,
  },
];
