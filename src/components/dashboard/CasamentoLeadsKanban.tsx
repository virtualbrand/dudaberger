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
import { Calendar, Users, DollarSign, Mail, Phone, MessageSquare } from 'lucide-react';
import { CasamentoLead } from '@/types/casamento-lead';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/lib/supabase';

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
                {lead.nomeNoivo} & {lead.nomeNoiva}
              </h3>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-[#703535] flex-shrink-0" />
            <span className="break-words">{format(new Date(lead.dataCasamento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
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
          <div className="flex items-center gap-1.5 text-xs min-w-0">
            <Mail className="size-3 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 break-all">{lead.email}</span>
          </div>
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

export default function CasamentoLeadsKanban({ searchQuery = '' }: CasamentoLeadsKanbanProps) {
  const [columns, setColumns] = React.useState<Record<string, CasamentoLead[]>>({
    leads: [],
    proposta: [],
    aceita: [],
    encerrado: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [isEncerradoOpen, setIsEncerradoOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<CasamentoLead | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedLead, setEditedLead] = React.useState<CasamentoLead | null>(null);
  const [saving, setSaving] = React.useState(false);

  // Carregar leads do Supabase
  React.useEffect(() => {
    async function loadLeads() {
      if (!supabase) {
        console.warn('Supabase client not available');
        return;
      }
      
      try {
        const { data, error } = await (supabase as any)
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Organiza os leads por status
        const organized: Record<string, CasamentoLead[]> = {
          leads: [],
          proposta: [],
          aceita: [],
          encerrado: [],
        };

        data?.forEach((lead: any) => {
          const casamentoLead: CasamentoLead = {
            id: lead.id,
            nomeNoivo: lead.nome_noivo || '',
            nomeNoiva: lead.nome_noiva || '',
            email: lead.email || '',
            telefone: lead.whatsapp || lead.telefone || '',
            dataCasamento: lead.data_casamento || '',
            numeroConvidados: lead.numero_convidados || 0,
            orcamento: lead.orcamento_minimo && lead.orcamento_maximo 
              ? `R$ ${lead.orcamento_minimo.toLocaleString('pt-BR')} - R$ ${lead.orcamento_maximo.toLocaleString('pt-BR')}` 
              : 'A definir',
            status: lead.status,
            createdAt: lead.created_at,
            observacoes: lead.observacoes || undefined,
          };

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
      } catch (error) {
        console.error('Erro ao carregar leads:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  const visibleColumns = ['leads', 'proposta', 'aceita'];

  // Filtrar leads com base na busca
  const filteredColumns = React.useMemo(() => {
    if (!searchQuery.trim()) return columns;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, CasamentoLead[]> = {};
    
    Object.keys(columns).forEach(columnKey => {
      filtered[columnKey] = columns[columnKey].filter(lead =>
        lead.nomeNoivo.toLowerCase().includes(query) ||
        lead.nomeNoiva.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.telefone.includes(query) ||
        lead.orcamento.toLowerCase().includes(query)
      );
    });
    
    return filtered;
  }, [columns, searchQuery]);

  const handleCardClick = (lead: CasamentoLead) => {
    setSelectedLead(lead);
    setEditedLead(lead);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setTimeout(() => {
      setSelectedLead(null);
      setEditedLead(null);
    }, 200);
  };

  const handleSave = async () => {
    if (!editedLead || !selectedLead || !supabase) return;

    setSaving(true);
    try {
      // Atualiza no Supabase
      const { error } = await (supabase as any)
        .from('leads')
        .update({
          nome_noivo: editedLead.nomeNoivo,
          nome_noiva: editedLead.nomeNoiva,
          email: editedLead.email,
          whatsapp: editedLead.telefone,
          data_casamento: editedLead.dataCasamento,
          numero_convidados: editedLead.numeroConvidados,
          observacoes: editedLead.observacoes,
        })
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
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      alert('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#703535]">Carregando leads...</div>
        </div>
      ) : (
        <Kanban value={filteredColumns} onValueChange={setColumns} getItemValue={(item) => item.id}>
          <div className="flex gap-4">
            {/* Grid principal com 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
              {visibleColumns.map((columnValue) => (
                <LeadColumn 
                  key={columnValue} 
                  value={columnValue} 
                  leads={filteredColumns[columnValue] || []} 
                  onCardClick={handleCardClick}
                />
              ))}
          </div>

          {/* Coluna Encerrado - Versão Expandida OU Colapsada */}
          {isEncerradoOpen ? (
            /* Versão expandida - coluna completa */
            <div className="w-80">
              <div className={`rounded-lg border-2 p-3 shadow-sm outline-none focus:outline-none focus-visible:outline-none ${COLUMN_COLORS.encerrado}`}>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-unbounded text-[#703535]">{COLUMN_TITLES.encerrado}</span>
                    <Badge 
                      variant="secondary" 
                      size="sm" 
                      shape="circle" 
                      className="bg-white font-unbounded font-bold text-[0.6rem] text-[#703535]"
                      style={{ boxShadow: '0 0px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                    >
                      {filteredColumns.encerrado?.length || 0}
                    </Badge>
                  </div>
                  {/* Botão de colapsar no lugar do grip */}
                  <button
                    onClick={() => setIsEncerradoOpen(false)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
                    aria-label="Recolher Encerrados"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <KanbanColumnContent value="encerrado" className="flex flex-col gap-3 p-0.5 min-h-[200px]">
                  {(filteredColumns.encerrado || []).map((lead) => (
                    <LeadCard key={lead.id} lead={lead} asHandle={true} onCardClick={handleCardClick} />
                  ))}
                </KanbanColumnContent>
                {(!filteredColumns.encerrado || filteredColumns.encerrado.length === 0) && (
                  <p className="text-center text-gray-500 text-sm py-8">
                    {searchQuery ? 'Nenhum lead encontrado' : 'Nenhum lead encerrado'}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Versão colapsada - barra vertical fina */
            <button
              onClick={() => setIsEncerradoOpen(true)}
              className="relative w-12 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-lg transition-colors flex flex-col items-center justify-start gap-2 py-4 outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
              title="Expandir Encerrados"
              aria-label="Expandir Encerrados"
            >
              {/* Ícone de seta apontando para esquerda (expandir) */}
              <div className="p-1 hover:bg-gray-200 rounded transition-colors">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 rotate-180">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Texto vertical */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-xs font-semibold text-gray-600" style={{ writingMode: 'vertical-rl' }}>
                  {COLUMN_TITLES.encerrado}
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
                {filteredColumns.encerrado?.length || 0}
              </Badge>
            </button>
          )}
        </div>
        <KanbanOverlay>
          <div className="rounded-lg bg-gray-200/80 size-full" />
        </KanbanOverlay>
        </Kanban>
      )}

      {/* Modal de Detalhes do Lead */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F6EEE1]">
          {selectedLead && editedLead && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-unbounded text-[#703535] flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-[#d4c4b2] text-[#703535] text-lg font-semibold">
                        {editedLead.nomeNoivo.charAt(0)}{editedLead.nomeNoiva.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editedLead.nomeNoivo}
                          onChange={(e) => setEditedLead({ ...editedLead, nomeNoivo: e.target.value })}
                          className="px-3 py-1 border rounded text-lg font-unbounded"
                          placeholder="Nome Noivo"
                        />
                        <span>&</span>
                        <input
                          type="text"
                          value={editedLead.nomeNoiva}
                          onChange={(e) => setEditedLead({ ...editedLead, nomeNoiva: e.target.value })}
                          className="px-3 py-1 border rounded text-lg font-unbounded"
                          placeholder="Nome Noiva"
                        />
                      </div>
                    ) : (
                      `${editedLead.nomeNoivo} & ${editedLead.nomeNoiva}`
                    )}
                  </DialogTitle>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            setEditedLead(selectedLead);
                            setIsEditing(false);
                          }}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                          disabled={saving}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 text-sm bg-[#703535] text-white rounded hover:bg-[#8B4545] disabled:opacity-50"
                          disabled={saving}
                        >
                          {saving ? 'Salvando...' : 'Salvar'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 text-sm bg-[#703535] text-white rounded hover:bg-[#8B4545]"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Informações do Casamento */}
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h3 className="font-unbounded text-sm text-[#703535] mb-3">Informações do Casamento</h3>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="size-5 text-[#703535]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">Data do Casamento</p>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editedLead.dataCasamento}
                          onChange={(e) => setEditedLead({ ...editedLead, dataCasamento: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <p className="text-gray-600">{format(new Date(editedLead.dataCasamento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Users className="size-5 text-[#703535]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">Número de Convidados</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedLead.numeroConvidados}
                          onChange={(e) => setEditedLead({ ...editedLead, numeroConvidados: parseInt(e.target.value) || 0 })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <p className="text-gray-600">{editedLead.numeroConvidados} convidados</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="size-5 text-[#703535]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">Orçamento</p>
                      <p className="text-gray-600">{editedLead.orcamento}</p>
                    </div>
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h3 className="font-unbounded text-sm text-[#703535] mb-3">Contato</h3>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="size-5 text-[#703535]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">E-mail</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedLead.email}
                          onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <p className="text-gray-600">{editedLead.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="size-5 text-[#703535]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">Telefone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedLead.telefone}
                          onChange={(e) => setEditedLead({ ...editedLead, telefone: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <p className="text-gray-600">{editedLead.telefone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h3 className="font-unbounded text-sm text-[#703535] mb-3 flex items-center gap-2">
                    <MessageSquare className="size-5" />
                    Observações
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={editedLead.observacoes || ''}
                      onChange={(e) => setEditedLead({ ...editedLead, observacoes: e.target.value })}
                      className="px-3 py-2 border rounded text-sm w-full min-h-[100px]"
                      placeholder="Adicione observações sobre este lead..."
                    />
                  ) : (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{editedLead.observacoes || 'Sem observações'}</p>
                  )}
                </div>

                {/* Status e Data de Criação */}
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Status:</span>
                    <Badge variant="secondary" size="sm">
                      {COLUMN_TITLES[selectedLead.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Recebido em:</span>
                    <span className="text-gray-600">
                      {format(new Date(selectedLead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
