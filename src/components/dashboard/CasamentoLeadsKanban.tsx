'use client';

import * as React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge-2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from '@/components/ui/kanban';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Users, DollarSign, Phone, MessageSquare, Trash2, Check, X } from 'lucide-react';
import { CasamentoLead } from '@/types/casamento-lead';
import { format } from 'date-fns';
import { DatePickerInput } from '@/components/ui/date-picker-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/toast-1';

const COLUMN_TITLES: Record<string, string> = {
  leads: 'Leads',
  proposta: 'Proposta Enviada',
  aceita: 'Proposta Aceita',
  encerrado: 'Encerrado',
};

const COLUMN_COLORS: Record<string, string> = {
  leads: 'bg-blue-50 border-blue-200',
  proposta: 'bg-yellow-50 border-yellow-200',
  aceita: 'bg-green-50 border-green-200',
  encerrado: 'bg-gray-50 border-gray-300',
};

interface CasamentoLeadsKanbanProps {
  searchQuery?: string;
}

interface LeadCardProps extends Omit<React.ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  lead: CasamentoLead;
  asHandle?: boolean;
  onCardClick?: (lead: CasamentoLead) => void;
}

function LeadCard({ lead, asHandle, onCardClick, ...props }: LeadCardProps) {
  const cardContent = (
    <div 
      className="rounded-lg bg-white p-4 hover:shadow-lg transition-shadow outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
      style={{ boxShadow: '0 0px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
      onClick={(e) => {
        // Só abre o modal se não estiver arrastando
        if (!e.defaultPrevented && onCardClick) {
          onCardClick(lead);
        }
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Avatar className="size-8 flex-shrink-0">
              <AvatarFallback className="bg-[#d4c4b2] text-[#703535] text-xs font-semibold">
                {lead.nomeNoivo.charAt(0)}{lead.nomeNoiva.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-[#703535] break-words">
                {lead.nomeNoiva ? `${lead.nomeNoivo} e ${lead.nomeNoiva}` : lead.nomeNoivo}
              </h3>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-[#703535] flex-shrink-0" />
            <span className="break-words">{format(new Date(lead.dataCasamento), "dd/MM/yy", { locale: ptBR })}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-[#703535] flex-shrink-0" />
            <span className="break-words">{lead.numeroConvidados} convidados</span>
          </div>

          <div className="flex items-center gap-1.5">
            <DollarSign className="size-3.5 text-[#703535] flex-shrink-0" />
            <span className="break-words">{lead.orcamento}</span>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1.5 pt-2 border-t">
          <div className="flex items-center gap-1.5 text-xs">
            <Phone className="size-3 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 break-words">{lead.telefone}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-gray-400">
            {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <KanbanItem value={lead.id} {...props}>
      {asHandle ? <KanbanItemHandle>{cardContent}</KanbanItemHandle> : cardContent}
    </KanbanItem>
  );
}

interface LeadColumnProps extends Omit<React.ComponentProps<typeof KanbanColumn>, 'children'> {
  leads: CasamentoLead[];
  isOverlay?: boolean;
  onCardClick?: (lead: CasamentoLead) => void;
}

function LeadColumn({ value, leads, isOverlay, onCardClick, ...props }: LeadColumnProps) {
  return (
    <KanbanColumn 
      value={value} 
      {...props} 
      disabled={true}
      className={`rounded-lg border-2 p-3 shadow-sm outline-none focus:outline-none focus-visible:outline-none ${COLUMN_COLORS[value]}`}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-unbounded text-[#703535]">{COLUMN_TITLES[value]}</span>
          <Badge 
            variant="secondary" 
            size="sm" 
            shape="circle" 
            className="bg-white font-unbounded font-bold text-[0.6rem] text-[#703535]"
            style={{ boxShadow: '0 0px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
          >
            {leads.length}
          </Badge>
        </div>
      </div>
      <KanbanColumnContent value={value} className="flex flex-col gap-3 p-0.5 min-h-[200px]">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} asHandle={!isOverlay} onCardClick={onCardClick} />
        ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}

// Função de formatação do WhatsApp (mesmo formato do Step0_5)
const formatWhatsApp = (value: string) => {
  let cleaned = value.replace(/[^\d+]/g, '');
  
  if (!cleaned.startsWith('+')) {
    if (cleaned.length > 0) {
      cleaned = '+' + cleaned;
    } else {
      return '';
    }
  }
  
  const digitsOnly = cleaned.slice(1);
  
  if (digitsOnly.startsWith('55')) {
    const countryCode = '+55';
    const restOfNumber = digitsOnly.slice(2);
    
    if (restOfNumber.length === 0) return countryCode;
    if (restOfNumber.length <= 2) return `${countryCode} (${restOfNumber}`;
    if (restOfNumber.length <= 7) return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2)}`;
    return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2, 7)}-${restOfNumber.slice(7, 11)}`;
  }
  
  const match = digitsOnly.match(/^(\d{1,2})/);
  if (match) {
    const countryCode = '+' + match[1];
    const restOfNumber = digitsOnly.slice(match[1].length);
    
    if (restOfNumber.length > 0) {
      return `${countryCode} ${restOfNumber}`;
    }
    return countryCode;
  }
  
  return cleaned;
};

export default function CasamentoLeadsKanban({ searchQuery = '' }: CasamentoLeadsKanbanProps) {
  const { showToast } = useToast();
  const [columns, setColumns] = React.useState<Record<string, CasamentoLead[]>>({
    leads: [],
    proposta: [],
    aceita: [],
    encerrado: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [collapsedColumns, setCollapsedColumns] = React.useState<Record<string, boolean>>({});
  const [selectedLead, setSelectedLead] = React.useState<CasamentoLead | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedLead, setEditedLead] = React.useState<CasamentoLead | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  // Função para alternar estado de colapso de uma coluna
  const toggleColumnCollapse = (columnKey: string) => {
    setCollapsedColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Função para carregar leads - usando useCallback para estabilizar a referência
  const loadLeads = React.useCallback(async () => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setError('Cliente Supabase não está disponível');
      setLoading(false);
      return;
    }
    
    try {
      console.log('🔄 Carregando leads do Supabase...');
      const { data, error: fetchError } = await (supabase as any)
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Erro ao buscar leads:', fetchError);
        throw fetchError;
      }

      console.log('Leads carregados do banco:', data?.length || 0);

      // Organiza os leads por status
      const organized: Record<string, CasamentoLead[]> = {
        leads: [],
        proposta: [],
        aceita: [],
        encerrado: [],
      };

        data?.forEach((lead: any) => {
          const casamentoLead: any = {
            id: lead.id,
            nomeNoivo: lead.nome_noivo || '',
            nomeNoiva: lead.nome_noiva || '',
            telefone: lead.whatsapp || lead.telefone || '',
            dataCasamento: lead.data_casamento || '',
            numeroConvidados: lead.numero_convidados || 0,
            orcamento: lead.orcamento_minimo && lead.orcamento_maximo
            ? `R$ ${lead.orcamento_minimo.toLocaleString('pt-BR')} - R$ ${lead.orcamento_maximo.toLocaleString('pt-BR')}` 
            : 'A definir',
          status: lead.status,
          createdAt: lead.created_at,
          observacoes: lead.observacoes || undefined,
          // Campos adicionais do formulário de casamento
          localFesta: lead.local_evento || '',
        };

        // Adiciona dados_extras se existirem
        if (lead.dados_extras) {
          if (lead.dados_extras.responsavelDecoracao) casamentoLead.responsavelDecoracao = lead.dados_extras.responsavelDecoracao;
          if (lead.dados_extras.responsavelOrganizacao) casamentoLead.responsavelOrganizacao = lead.dados_extras.responsavelOrganizacao;
          if (lead.dados_extras.fotografo) casamentoLead.fotografo = lead.dados_extras.fotografo;
          if (lead.dados_extras.motivacaoBolo) casamentoLead.motivacaoBolo = lead.dados_extras.motivacaoBolo;
          if (lead.dados_extras.doces) casamentoLead.doces = lead.dados_extras.doces;
          if (lead.dados_extras.budgetPorConvidado) casamentoLead.budgetPorConvidado = lead.dados_extras.budgetPorConvidado;
          if (lead.dados_extras.consideracoesEspecificas) casamentoLead.consideracoesEspecificas = lead.dados_extras.consideracoesEspecificas;
        }

        // Mapeia os status do banco para as colunas do kanban
        const statusMap: Record<string, string> = {
          'lead': 'leads',
          'proposta_enviada': 'proposta',
          'proposta_aceita': 'aceita',
          'encerrado': 'encerrado',
        };

        const columnKey = statusMap[lead.status] || 'leads';
        organized[columnKey].push(casamentoLead);
      });

      setColumns(organized);
      setError(null);
      console.log('✅ Leads carregados com sucesso');
    } catch (error: any) {
      console.error('❌ Erro ao carregar leads:', error);
      setError(error.message || 'Erro ao carregar leads');
      showToast('Não foi possível carregar os leads. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Carregar leads do Supabase
  React.useEffect(() => {
    loadLeads();

    // Configura listener para atualizações em tempo real
    if (!supabase) return;

    console.log('Configurando Supabase Realtime para leads...');

    const channel = (supabase as any)
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'leads'
        },
        (payload: any) => {
          console.log('🔄 Realtime: Lead atualizado!', {
            evento: payload.eventType,
            lead: payload.new || payload.old
          });
          // Recarrega os leads quando houver mudança
          loadLeads();
        }
      )
      .subscribe((status: string) => {
        console.log('📡 Status do Realtime:', status);
      });

    // Cleanup: remove o listener quando o componente desmontar
    return () => {
      console.log('Removendo listener do Realtime...');
      (supabase as any).removeChannel(channel);
    };
  }, [loadLeads]);

  // Recarrega leads quando a janela recebe foco (usuário volta para a aba)
  React.useEffect(() => {
    const handleFocus = () => {
      console.log('👀 Janela recebeu foco - recarregando leads...');
      loadLeads();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadLeads]);

  // Filtrar leads com base na busca
  const filteredColumns = React.useMemo(() => {
    if (!searchQuery.trim()) return columns;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, CasamentoLead[]> = {};
    
    Object.keys(columns).forEach(columnKey => {
      filtered[columnKey] = columns[columnKey].filter(lead =>
        lead.nomeNoivo.toLowerCase().includes(query) ||
        lead.nomeNoiva.toLowerCase().includes(query) ||
        lead.telefone.includes(query) ||
        lead.orcamento.toLowerCase().includes(query)
      );
    });
    
    return filtered;
  }, [columns, searchQuery]);

  // Mostra estado de erro se houver
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Erro ao carregar leads</h3>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              loadLeads();
            }}
            className="px-4 py-2 bg-[#703535] text-white rounded-lg hover:bg-[#5a2a2a] transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Mostra loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#703535]"></div>
      </div>
    );
  }

  const handleCardClick = (lead: CasamentoLead) => {
    setSelectedLead(lead);
    setEditedLead(lead);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowDeleteConfirm(false);
    setTimeout(() => {
      setSelectedLead(null);
      setEditedLead(null);
      setIsEditing(true);
    }, 200);
  };

  const handleSave = async () => {
    if (!editedLead || !selectedLead || !supabase) return;

    setSaving(true);
    try {
      // Prepara os dados extras
      const dadosExtras: any = {};
      
      // Adiciona campos da aba "Outras Informações" se existirem
      if ((editedLead as any).localFesta) dadosExtras.localFesta = (editedLead as any).localFesta;
      if ((editedLead as any).responsavelDecoracao) dadosExtras.responsavelDecoracao = (editedLead as any).responsavelDecoracao;
      if ((editedLead as any).responsavelOrganizacao) dadosExtras.responsavelOrganizacao = (editedLead as any).responsavelOrganizacao;
      if ((editedLead as any).fotografo) dadosExtras.fotografo = (editedLead as any).fotografo;
      if ((editedLead as any).motivacaoBolo) dadosExtras.motivacaoBolo = (editedLead as any).motivacaoBolo;
      if ((editedLead as any).doces) dadosExtras.doces = (editedLead as any).doces;
      if ((editedLead as any).budgetPorConvidado) dadosExtras.budgetPorConvidado = (editedLead as any).budgetPorConvidado;
      if ((editedLead as any).consideracoesEspecificas) dadosExtras.consideracoesEspecificas = (editedLead as any).consideracoesEspecificas;

      // Atualiza no Supabase
      const updateData: any = {
        nome_noivo: editedLead.nomeNoivo,
        nome_noiva: editedLead.nomeNoiva,
        whatsapp: editedLead.telefone,
        data_casamento: editedLead.dataCasamento,
        numero_convidados: editedLead.numeroConvidados,
        observacoes: editedLead.observacoes,
      };

      // Adiciona local_evento se existir
      if ((editedLead as any).localFesta) {
        updateData.local_evento = (editedLead as any).localFesta;
      }

      // Adiciona dados_extras se houver campos adicionais
      if (Object.keys(dadosExtras).length > 0) {
        updateData.dados_extras = dadosExtras;
      }

      const { error } = await (supabase as any)
        .from('leads')
        .update(updateData)
        .eq('id', editedLead.id);

      if (error) throw error;

      // Atualiza o estado local
      const updatedColumns = { ...columns };
      Object.keys(updatedColumns).forEach(columnKey => {
        updatedColumns[columnKey] = updatedColumns[columnKey].map(lead =>
          lead.id === editedLead.id ? editedLead : lead
        );
      });
      setColumns(updatedColumns);
      setSelectedLead(editedLead);
      showToast('Lead atualizado com sucesso', 'success', 'top-right');
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      showToast('Erro ao salvar lead', 'error', 'top-right');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLead || !supabase) return;

    setIsDeleting(true);
    try {
      // Deleta do Supabase
      const { error } = await (supabase as any)
        .from('leads')
        .delete()
        .eq('id', selectedLead.id);

      if (error) throw error;

      // Remove do estado local
      const updatedColumns = { ...columns };
      Object.keys(updatedColumns).forEach(columnKey => {
        updatedColumns[columnKey] = updatedColumns[columnKey].filter(
          lead => lead.id !== selectedLead.id
        );
      });
      setColumns(updatedColumns);
      
      showToast('Lead excluído com sucesso', 'success', 'top-right');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao excluir lead:', error);
      showToast('Erro ao excluir lead', 'error', 'top-right');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleColumnsChange = async (newColumns: Record<string, CasamentoLead[]>) => {
    if (!supabase) return;

    // Mapeia as colunas do kanban para os status do banco
    const columnToStatus: Record<string, string> = {
      'leads': 'lead',
      'proposta': 'proposta_enviada',
      'aceita': 'proposta_aceita',
      'encerrado': 'encerrado',
    };

    // Atualiza o estado local imediatamente para feedback visual
    setColumns(newColumns);

    // Encontra qual lead mudou de coluna comparando com o estado anterior
    for (const columnKey of Object.keys(newColumns)) {
      const newLeads = newColumns[columnKey];
      const oldLeads = columns[columnKey];
      
      // Verifica se há novos leads nesta coluna
      const addedLeads = newLeads.filter(
        newLead => !oldLeads.some(oldLead => oldLead.id === newLead.id)
      );

      // Para cada lead adicionado, atualiza o status no Supabase
      for (const lead of addedLeads) {
        const newStatus = columnToStatus[columnKey];
        
        try {
          const { error } = await (supabase as any)
            .from('leads')
            .update({ status: newStatus })
            .eq('id', lead.id);

          if (error) throw error;

          // Atualiza o status localmente também
          const updatedColumns = { ...newColumns };
          Object.keys(updatedColumns).forEach(col => {
            updatedColumns[col] = updatedColumns[col].map(l =>
              l.id === lead.id ? { ...l, status: columnKey as CasamentoLead['status'] } : l
            );
          });
          setColumns(updatedColumns);
          
          // Mostra toast de sucesso
          showToast('Status do Lead atualizado', 'success', 'top-right');
        } catch (error) {
          console.error('Erro ao atualizar status do lead:', error);
          showToast('Erro ao mover o lead', 'error', 'top-right');
          // Reverte para o estado anterior em caso de erro
          setColumns(columns);
        }
      }
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#703535]">Carregando leads...</div>
        </div>
      ) : (
        <Kanban value={filteredColumns} onValueChange={handleColumnsChange} getItemValue={(item) => item.id}>
          <div className="flex gap-4">
            {/* Renderiza todas as colunas */}
            {Object.keys(filteredColumns).map((columnKey) => {
              const isCollapsed = collapsedColumns[columnKey];
              
              if (isCollapsed) {
                // Versão colapsada - barra vertical fina
                return (
                  <button
                    key={columnKey}
                    onClick={() => toggleColumnCollapse(columnKey)}
                    className={`relative w-12 border-2 rounded-lg shadow-sm transition-all flex flex-col items-center justify-start gap-2 py-4 outline-none focus:outline-none focus-visible:outline-none cursor-pointer hover:opacity-90 ${COLUMN_COLORS[columnKey]}`}
                    title={`Expandir ${COLUMN_TITLES[columnKey]}`}
                    aria-label={`Expandir ${COLUMN_TITLES[columnKey]}`}
                  >
                    {/* Ícone de seta apontando para esquerda (expandir) */}
                    <div className="p-1 rounded transition-colors">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 rotate-180">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    {/* Texto vertical */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-xs font-semibold text-gray-600" style={{ writingMode: 'vertical-rl' }}>
                        {COLUMN_TITLES[columnKey]}
                      </div>
                    </div>
                    
                    {/* Badge no final */}
                    <Badge 
                      variant="secondary" 
                      size="sm" 
                      shape="circle" 
                      className="bg-white font-unbounded font-bold text-[0.6rem] text-[#703535]"
                      style={{ boxShadow: '0 0px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                    >
                      {filteredColumns[columnKey]?.length || 0}
                    </Badge>
                  </button>
                );
              }
              
              // Versão expandida - coluna completa
              return (
                <div key={columnKey} className="w-80">
                  <div className={`rounded-lg border-2 p-3 shadow-sm outline-none focus:outline-none focus-visible:outline-none ${COLUMN_COLORS[columnKey]}`}>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-unbounded text-[#703535]">{COLUMN_TITLES[columnKey]}</span>
                        <Badge 
                          variant="secondary" 
                          size="sm" 
                          shape="circle" 
                          className="bg-white font-unbounded font-bold text-[0.6rem] text-[#703535]"
                          style={{ boxShadow: '0 0px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                        >
                          {filteredColumns[columnKey]?.length || 0}
                        </Badge>
                      </div>
                      {/* Botão de colapsar */}
                      <button
                        onClick={() => toggleColumnCollapse(columnKey)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
                        aria-label={`Recolher ${COLUMN_TITLES[columnKey]}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <KanbanColumnContent value={columnKey} className="flex flex-col gap-3 p-0.5 min-h-[200px]">
                      {(filteredColumns[columnKey] || []).map((lead) => (
                        <LeadCard key={lead.id} lead={lead} asHandle={true} onCardClick={handleCardClick} />
                      ))}
                    </KanbanColumnContent>
                    {(!filteredColumns[columnKey] || filteredColumns[columnKey].length === 0) && (
                      <p className="text-center text-gray-500 text-sm py-8">
                        {searchQuery ? 'Nenhum lead encontrado' : `Nenhum lead em ${COLUMN_TITLES[columnKey].toLowerCase()}`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <KanbanOverlay>
            <div className="rounded-lg bg-gray-200/80 size-full" />
          </KanbanOverlay>
        </Kanban>
      )}

      {/* Modal de Detalhes do Lead */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F6EEE1]">
          {selectedLead && editedLead && (
            <>
              <DialogHeader className="border-b border-gray-300 pb-4">
                <DialogTitle className="text-2xl font-unbounded text-[#703535] text-left">
                  Editar Lead
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="lead" className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="lead">Lead</TabsTrigger>
                  <TabsTrigger value="outras">Outras Informações</TabsTrigger>
                </TabsList>

                {/* Aba 1: Lead */}
                <TabsContent value="lead" className="space-y-6 px-6 pb-6">
                  {/* Nome dos Noivos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome dos Noivos *
                    </label>
                    <input
                      type="text"
                      value={editedLead.nomeNoiva ? `${editedLead.nomeNoivo} e ${editedLead.nomeNoiva}` : editedLead.nomeNoivo}
                      onChange={(e) => {
                        const valor = e.target.value;
                        const nomes = valor.split(/\s+e\s+|\s+&\s+/i);
                        setEditedLead({ 
                          ...editedLead, 
                          nomeNoivo: nomes[0]?.trim() || '',
                          nomeNoiva: nomes[1]?.trim() || ''
                        });
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                      placeholder="Nome dos noivos"
                    />
                  </div>

                  {/* Data e Convidados */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePickerInput
                      value={editedLead.dataCasamento}
                      onChange={(value) => setEditedLead({ ...editedLead, dataCasamento: value })}
                      label="Data da Cerimônia *"
                      placeholder="Selecione a data"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Convidados
                      </label>
                      <input
                        type="number"
                        value={editedLead.numeroConvidados}
                        onChange={(e) => setEditedLead({ ...editedLead, numeroConvidados: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Número de convidados"
                      />
                    </div>
                  </div>

                  {/* Telefone e Orçamento */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone/WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={editedLead.telefone}
                        onChange={(e) => setEditedLead({ ...editedLead, telefone: e.target.value })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Telefone/WhatsApp"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Orçamento
                      </label>
                      <input
                        type="text"
                        value={editedLead.orcamento}
                        disabled
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      value={editedLead.observacoes || ''}
                      onChange={(e) => setEditedLead({ ...editedLead, observacoes: e.target.value })}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                      rows={4}
                      placeholder="Adicione observações sobre este lead..."
                    />
                  </div>

                  {/* Status e Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="px-3 py-3 border border-gray-300 rounded-md text-sm bg-gray-50">
                        <Badge variant="secondary" size="sm">
                          {COLUMN_TITLES[selectedLead.status]}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recebido em
                      </label>
                      <div className="px-3 py-3 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-600">
                        {format(new Date(selectedLead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                  </div>

                  {/* Barra de Ações */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-300">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="btn-danger-xs-outline flex items-center gap-2"
                      disabled={saving}
                    >
                      <Trash2 className="size-4" />
                      Excluir Lead
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={saving}
                    >
                      <Check className="size-4" />
                      {saving ? 'Salvando...' : 'Atualizar Lead'}
                    </button>
                  </div>
                </TabsContent>

                {/* Aba 2: Outras Informações */}
                <TabsContent value="outras" className="space-y-6 px-6 pb-6">
                  {/* Local da Festa */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Local da Festa
                    </label>
                    <input
                      type="text"
                      value={(editedLead as any).localFesta || ''}
                      onChange={(e) => setEditedLead({ ...editedLead, localFesta: e.target.value } as any)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                      placeholder="Ex: Praia do Rosa, Garopaba"
                    />
                  </div>

                  {/* Responsáveis */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsável pela Decoração
                      </label>
                      <input
                        type="text"
                        value={(editedLead as any).responsavelDecoracao || ''}
                        onChange={(e) => setEditedLead({ ...editedLead, responsavelDecoracao: e.target.value } as any)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Ex: Nisinha, Amor & Praia"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsável pela Organização/Cerimônia
                      </label>
                      <input
                        type="text"
                        value={(editedLead as any).responsavelOrganizacao || ''}
                        onChange={(e) => setEditedLead({ ...editedLead, responsavelOrganizacao: e.target.value } as any)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Ex: Bartira, Kitty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fotógrafo
                      </label>
                      <input
                        type="text"
                        value={(editedLead as any).fotografo || ''}
                        onChange={(e) => setEditedLead({ ...editedLead, fotografo: e.target.value } as any)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Ex: Cícero"
                      />
                    </div>
                  </div>

                  {/* Motivação do Bolo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivação para ter o bolo no casamento
                    </label>
                    <textarea
                      value={(editedLead as any).motivacaoBolo || ''}
                      onChange={(e) => setEditedLead({ ...editedLead, motivacaoBolo: e.target.value } as any)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white resize-none"
                      rows={4}
                      placeholder="O que os motiva a optarem pela escolha de ter o bolo no casamento?"
                    />
                  </div>

                  {/* Doces */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quais outros doces serão servidos?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={((editedLead as any).doces || []).includes('mesa-doces')}
                          onChange={(e) => {
                            const doces = (editedLead as any).doces || [];
                            const newDoces = e.target.checked
                              ? [...doces, 'mesa-doces']
                              : doces.filter((d: string) => d !== 'mesa-doces');
                            setEditedLead({ ...editedLead, doces: newDoces } as any);
                          }}
                          className="w-4 h-4 text-[#D65B58] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-700">Mesa de Doces (6 a 8 doces por convidado)</span>
                      </label>

                      <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={((editedLead as any).doces || []).includes('reposicao-mesa')}
                          onChange={(e) => {
                            const doces = (editedLead as any).doces || [];
                            const newDoces = e.target.checked
                              ? [...doces, 'reposicao-mesa']
                              : doces.filter((d: string) => d !== 'reposicao-mesa');
                            setEditedLead({ ...editedLead, doces: newDoces } as any);
                          }}
                          className="w-4 h-4 text-[#D65B58] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-700">Reposição da Mesa de Doces (10 doces por convidado)</span>
                      </label>

                      <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={((editedLead as any).doces || []).includes('sobremesa-menu')}
                          onChange={(e) => {
                            const doces = (editedLead as any).doces || [];
                            const newDoces = e.target.checked
                              ? [...doces, 'sobremesa-menu']
                              : doces.filter((d: string) => d !== 'sobremesa-menu');
                            setEditedLead({ ...editedLead, doces: newDoces } as any);
                          }}
                          className="w-4 h-4 text-[#D65B58] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-700">Sobremesa no Menu</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget por Convidado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Budget por convidado para investir no bolo
                    </label>
                    <div className="space-y-2">
                      {[
                        { label: 'Entre R$25 e R$30', value: 'R$25-R$30' },
                        { label: 'Entre R$20 e R$25', value: 'R$20-R$25' },
                        { label: 'Entre R$15 e R$20', value: 'R$15-R$20' },
                        { label: 'Entre R$10 e R$15', value: 'R$10-R$15' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="budgetPorConvidado"
                            value={option.value}
                            checked={(editedLead as any).budgetPorConvidado === option.value}
                            onChange={(e) => setEditedLead({ ...editedLead, budgetPorConvidado: e.target.value } as any)}
                            className="w-4 h-4 text-[#D65B58] border-gray-300 cursor-pointer"
                          />
                          <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Considerações Específicas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Considerações Específicas
                    </label>
                    <textarea
                      value={(editedLead as any).consideracoesEspecificas || ''}
                      onChange={(e) => setEditedLead({ ...editedLead, consideracoesEspecificas: e.target.value } as any)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white resize-none"
                      rows={4}
                      placeholder="Itens, tamanhos, características específicas, quantidade de andares, etc."
                    />
                  </div>

                  {/* Barra de Ações */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-300">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="btn-danger-xs-outline flex items-center gap-2"
                      disabled={saving}
                    >
                      <Trash2 className="size-4" />
                      Excluir Lead
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={saving}
                    >
                      <Check className="size-4" />
                      {saving ? 'Salvando...' : 'Atualizar Lead'}
                    </button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Diálogo de Confirmação de Exclusão */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="bg-[#F6EEE1] rounded-lg p-6 max-w-md w-full shadow-2xl relative">
                    <div className="flex flex-col space-y-1.5 text-left">
                      <h2 className="text-xl font-unbounded font-semibold tracking-tight text-[#703535]">
                        Confirmar Exclusão
                      </h2>
                    </div>
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-gray-700">
                        Tem certeza que deseja excluir o lead de <strong>{editedLead.nomeNoiva ? `${editedLead.nomeNoivo} e ${editedLead.nomeNoiva}` : editedLead.nomeNoivo}</strong>?
                      </p>
                      <p className="text-sm text-gray-600">
                        Esta ação não pode ser desfeita.
                      </p>
                      <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={isDeleting}
                          className="btn-secondary-xs-outline"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="btn-danger-xs flex items-center gap-2"
                        >
                          <Trash2 className="size-4" />
                          {isDeleting ? 'Excluindo...' : 'Excluir'}
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
