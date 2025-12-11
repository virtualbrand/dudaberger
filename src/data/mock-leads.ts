import { CasamentoLead } from '@/types/casamento-lead';

/**
 * Dados mockados de exemplo para o kanban de leads de casamento
 * Em produção, esses dados viriam de uma API/banco de dados
 */
export const mockLeads: Record<string, CasamentoLead[]> = {
  leads: [
    {
      id: '1',
      nomeNoivo: 'João Silva',
      nomeNoiva: 'Maria Santos',
      email: 'joao.maria@email.com',
      telefone: '(11) 98765-4321',
      dataCasamento: '2025-06-15',
      numeroConvidados: 150,
      orcamento: 'R$ 15.000 - R$ 20.000',
      status: 'leads',
      createdAt: '2025-12-01T10:30:00',
      observacoes: 'Preferem bolo de chocolate',
    },
    {
      id: '2',
      nomeNoivo: 'Pedro Oliveira',
      nomeNoiva: 'Ana Costa',
      email: 'pedro.ana@email.com',
      telefone: '(11) 91234-5678',
      dataCasamento: '2025-08-20',
      numeroConvidados: 200,
      orcamento: 'R$ 20.000 - R$ 30.000',
      status: 'leads',
      createdAt: '2025-12-01T14:15:00',
    },
  ],
  proposta: [
    {
      id: '3',
      nomeNoivo: 'Carlos Ferreira',
      nomeNoiva: 'Juliana Lima',
      email: 'carlos.juliana@email.com',
      telefone: '(11) 99876-5432',
      dataCasamento: '2025-07-10',
      numeroConvidados: 120,
      orcamento: 'R$ 12.000 - R$ 18.000',
      status: 'proposta',
      createdAt: '2025-11-28T09:00:00',
    },
    {
      id: '4',
      nomeNoivo: 'Rafael Souza',
      nomeNoiva: 'Camila Rocha',
      email: 'rafael.camila@email.com',
      telefone: '(11) 98888-7777',
      dataCasamento: '2025-05-30',
      numeroConvidados: 180,
      orcamento: 'R$ 25.000 - R$ 35.000',
      status: 'proposta',
      createdAt: '2025-11-25T16:45:00',
    },
  ],
  aceita: [
    {
      id: '5',
      nomeNoivo: 'Lucas Almeida',
      nomeNoiva: 'Fernanda Martins',
      email: 'lucas.fernanda@email.com',
      telefone: '(11) 97777-6666',
      dataCasamento: '2025-04-15',
      numeroConvidados: 100,
      orcamento: 'R$ 18.000',
      status: 'aceita',
      createdAt: '2025-11-20T11:30:00',
    },
  ],
  encerrado: [
    {
      id: '6',
      nomeNoivo: 'Marcos Ribeiro',
      nomeNoiva: 'Paula Silva',
      email: 'marcos.paula@email.com',
      telefone: '(11) 96666-5555',
      dataCasamento: '2025-03-20',
      numeroConvidados: 80,
      orcamento: 'R$ 10.000',
      status: 'encerrado',
      createdAt: '2025-11-15T10:00:00',
      observacoes: 'Cliente desistiu do serviço',
    },
  ],
};

/**
 * Helper para criar um novo lead
 */
export function createLead(data: Omit<CasamentoLead, 'id' | 'createdAt'>): CasamentoLead {
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Helper para atualizar o status de um lead
 */
export function updateLeadStatus(
  columns: Record<string, CasamentoLead[]>,
  leadId: string,
  newStatus: CasamentoLead['status']
): Record<string, CasamentoLead[]> {
  const newColumns = { ...columns };
  let leadToMove: CasamentoLead | undefined;
  let sourceColumn: string | undefined;

  // Encontrar o lead e sua coluna atual
  for (const [columnKey, leads] of Object.entries(newColumns)) {
    const leadIndex = leads.findIndex((lead) => lead.id === leadId);
    if (leadIndex !== -1) {
      leadToMove = leads[leadIndex];
      sourceColumn = columnKey;
      newColumns[columnKey] = leads.filter((lead) => lead.id !== leadId);
      break;
    }
  }

  // Mover para a nova coluna
  if (leadToMove && sourceColumn) {
    leadToMove.status = newStatus;
    newColumns[newStatus] = [...(newColumns[newStatus] || []), leadToMove];
  }

  return newColumns;
}

/**
 * Helper para deletar um lead
 */
export function deleteLead(
  columns: Record<string, CasamentoLead[]>,
  leadId: string
): Record<string, CasamentoLead[]> {
  const newColumns = { ...columns };

  for (const [columnKey, leads] of Object.entries(newColumns)) {
    newColumns[columnKey] = leads.filter((lead) => lead.id !== leadId);
  }

  return newColumns;
}

/**
 * Helper para buscar leads por texto
 */
export function searchLeads(
  columns: Record<string, CasamentoLead[]>,
  searchTerm: string
): Record<string, CasamentoLead[]> {
  const term = searchTerm.toLowerCase();
  const filteredColumns: Record<string, CasamentoLead[]> = {};

  for (const [columnKey, leads] of Object.entries(columns)) {
    filteredColumns[columnKey] = leads.filter((lead) => {
      return (
        lead.nomeNoivo.toLowerCase().includes(term) ||
        lead.nomeNoiva.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.telefone.includes(term)
      );
    });
  }

  return filteredColumns;
}
