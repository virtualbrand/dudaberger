'use client';

import * as React from 'react';
import { Proposta } from '@/types/proposta';
import { mockPropostas } from '@/data/mock-propostas';
import { Badge } from '@/components/ui/badge-2';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Edit, Search, Check, Trash2, X, ExternalLink, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { supabase, type PropostaUpdate, type PropostaInsert } from '@/lib/supabase';
import { useToast } from '@/components/ui/toast-1';
import { createSlug, isValidSlug } from '@/utils/slug';

const STATUS_LABELS: Record<Proposta['status'], string> = {
  rascunho: 'Rascunho',
  enviada: 'Enviada',
  aceita: 'Aceita',
  recusada: 'Recusada',
  expirada: 'Expirada',
};

const STATUS_COLORS: Record<Proposta['status'], 'secondary' | 'warning' | 'success' | 'destructive'> = {
  rascunho: 'secondary',
  enviada: 'warning',
  aceita: 'success',
  recusada: 'destructive',
  expirada: 'destructive',
};

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const dbStatusToUiStatus = (status: string | null | undefined): Proposta['status'] => {
  switch ((status || '').toLowerCase()) {
    case 'rascunho':
      return 'rascunho';
    case 'enviada':
      return 'enviada';
    case 'aceita':
      return 'aceita';
    case 'rejeitada':
    case 'recusada':
      return 'recusada';
    case 'expirada':
      return 'expirada';
    default:
      return 'enviada';
  }
};

const uiStatusToDbStatus = (status: Proposta['status']): string => {
  switch (status) {
    case 'recusada':
      return 'rejeitada';
    default:
      return status;
  }
};

export default function PropostasTable() {
  const { showToast } = useToast();
  const [propostas, setPropostas] = React.useState<Proposta[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [propostaToDelete, setPropostaToDelete] = React.useState<Proposta | null>(null);
  const [selectedProposta, setSelectedProposta] = React.useState<Proposta | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'cliente' | 'proposta' | 'pagamento'>('cliente');
  const [hasChanges, setHasChanges] = React.useState(false);
  const [originalProposta, setOriginalProposta] = React.useState<Proposta | null>(null);

  // Carregar propostas do Supabase (fallback para mock se Supabase não estiver configurado)
  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (!supabase) {
          if (!cancelled) {
            setPropostas(mockPropostas);
            setIsLoading(false);
          }
          return;
        }

        const { data, error } = await (supabase as any)
          .from('propostas')
          .select('id, titulo, descricao, valor_total, status, data_proposta, validade_ate, created_at, itens, slug, local_festa, link_pagamento_7_dias, link_pagamento_21_dias')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mapped: Proposta[] = (data || []).map((row: any) => ({
          id: String(row.id),
          clienteNome: String(row.titulo ?? ''),
          valorTotal: Number(row.valor_total ?? 0),
          status: dbStatusToUiStatus(row.status),
          dataCriacao: row.data_proposta ? `${row.data_proposta}T00:00:00` : String(row.created_at ?? new Date().toISOString()),
          dataEvento: row.validade_ate ? `${row.validade_ate}T00:00:00` : '',
          descricao: row.descricao ?? undefined,
          slug: row.slug ?? undefined,
          localFesta: row.local_festa ?? undefined,
          linkPagamento7Dias: row.link_pagamento_7_dias ?? undefined,
          linkPagamento21Dias: row.link_pagamento_21_dias ?? undefined,
          itens: (Array.isArray(row.itens) ? row.itens : []) as any,
        }));

        if (!cancelled) {
          setPropostas(mapped);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Erro ao carregar propostas:', err);
        if (!cancelled) {
          setPropostas(mockPropostas);
          setIsLoading(false);
          showToast('Não foi possível carregar do Supabase (usando dados locais).', 'warning');
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [showToast]);

  // Detectar mudanças comparando proposta atual com original
  React.useEffect(() => {
    if (!selectedProposta || !originalProposta) {
      setHasChanges(false);
      return;
    }

    const changed = JSON.stringify(selectedProposta) !== JSON.stringify(originalProposta);
    setHasChanges(changed);
  }, [selectedProposta, originalProposta]);

  const handleAddProposta = () => {
    const newProposta: Proposta = {
      id: `new-${Date.now()}`,
      clienteNome: '',
      valorTotal: 0,
      status: 'rascunho',
      dataCriacao: new Date().toISOString(),
      dataEvento: '',
      descricao: '',
      slug: '',
      itens: [],
    };
    setSelectedProposta(newProposta);
    setOriginalProposta(null);
    setHasChanges(false);
    setIsEditing(true);
    setActiveTab('cliente');
    setIsModalOpen(true);
  };

  const handleEditProposta = (proposta: Proposta) => {
    setSelectedProposta(proposta);
    setOriginalProposta(JSON.parse(JSON.stringify(proposta)));
    setHasChanges(false);
    setIsEditing(true);
    setActiveTab('cliente');
    setIsModalOpen(true);
  };

  const handleSaveProposta = async () => {
    if (!selectedProposta) return;

    if (!selectedProposta.clienteNome.trim()) {
      showToast('Informe o nome do cliente.', 'warning');
      return;
    }

    // Validar slug se fornecido
    if (selectedProposta.slug && !isValidSlug(selectedProposta.slug)) {
      showToast('URL inválida. Use apenas letras minúsculas, números e hífens.', 'warning');
      return;
    }

    const isNewProposta = selectedProposta.id.startsWith('new-');

    // Gerar slug automaticamente se não fornecido
    let slug = selectedProposta.slug?.trim() || createSlug(selectedProposta.clienteNome);

    // Fallback: sem Supabase configurado, mantém comportamento local
    if (!supabase) {
      if (isNewProposta) {
        const newId = `local-${Date.now()}`;
        const newProposta = { ...selectedProposta, id: newId, slug };
        setPropostas([...propostas, newProposta]);
      } else {
        setPropostas(propostas.map((p) => (p.id === selectedProposta.id ? { ...selectedProposta, slug } : p)));
      }
      setIsModalOpen(false);
      setSelectedProposta(null);
      showToast('Proposta salva localmente (Supabase não configurado).', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      if (isNewProposta) {
        // Criar nova proposta - precisa de lead_id
        // Por enquanto, vamos usar um lead_id padrão ou o primeiro disponível
        const { data: leads, error: leadsError } = await (supabase as any)
          .from('leads')
          .select('id')
          .limit(1);

        if (leadsError || !leads || leads.length === 0) {
          showToast('É necessário ter pelo menos um lead cadastrado para criar uma proposta.', 'error');
          setIsSaving(false);
          return;
        }

        const payload: PropostaInsert = {
          lead_id: leads[0].id,
          titulo: selectedProposta.clienteNome.trim(),
          descricao: selectedProposta.descricao?.trim() || null,
          slug: slug || null,
          valor_total: selectedProposta.valorTotal,
          status: uiStatusToDbStatus(selectedProposta.status),
          data_proposta: selectedProposta.dataCriacao ? selectedProposta.dataCriacao.split('T')[0] : null,
          validade_ate: selectedProposta.dataEvento ? selectedProposta.dataEvento.split('T')[0] : null,
          local_festa: selectedProposta.localFesta?.trim() || null,
          link_pagamento_7_dias: selectedProposta.linkPagamento7Dias?.trim() || null,
          link_pagamento_21_dias: selectedProposta.linkPagamento21Dias?.trim() || null,
          itens: (selectedProposta.itens as any) ?? [],
        };

        const { data, error } = await (supabase as any)
          .from('propostas')
          .insert(payload)
          .select('id, titulo, descricao, valor_total, status, data_proposta, validade_ate, created_at, itens, slug, local_festa, link_pagamento_7_dias, link_pagamento_21_dias')
          .single();

        if (error) throw error;

        const newProposta: Proposta = {
          id: String(data.id),
          clienteNome: String(data.titulo ?? ''),
          valorTotal: Number(data.valor_total ?? 0),
          status: dbStatusToUiStatus(data.status),
          dataCriacao: data.data_proposta ? `${data.data_proposta}T00:00:00` : String(data.created_at ?? new Date().toISOString()),
          dataEvento: data.validade_ate ? `${data.validade_ate}T00:00:00` : '',
          descricao: data.descricao ?? undefined,
          slug: data.slug ?? undefined,
          localFesta: data.local_festa ?? undefined,
          linkPagamento7Dias: data.link_pagamento_7_dias ?? undefined,
          linkPagamento21Dias: data.link_pagamento_21_dias ?? undefined,
          itens: (Array.isArray(data.itens) ? data.itens : []) as any,
        };

        setPropostas((prev) => [newProposta, ...prev]);
        setIsModalOpen(false);
        setSelectedProposta(null);
        setHasChanges(false);
        setOriginalProposta(null);
        showToast('Proposta criada com sucesso!', 'success');
      } else {
        // Atualizar proposta existente
        if (!isUuid(selectedProposta.id)) {
          showToast('ID inválido para atualização.', 'warning');
          setIsSaving(false);
          return;
        }

        const payload: PropostaUpdate = {
          titulo: selectedProposta.clienteNome.trim(),
          descricao: selectedProposta.descricao?.trim() ? selectedProposta.descricao.trim() : null,
          slug: slug || null,
          valor_total: selectedProposta.valorTotal,
          status: uiStatusToDbStatus(selectedProposta.status),
          data_proposta: selectedProposta.dataCriacao ? selectedProposta.dataCriacao.split('T')[0] : null,
          validade_ate: selectedProposta.dataEvento ? selectedProposta.dataEvento.split('T')[0] : null,
          local_festa: selectedProposta.localFesta?.trim() || null,
          link_pagamento_7_dias: selectedProposta.linkPagamento7Dias?.trim() || null,
          link_pagamento_21_dias: selectedProposta.linkPagamento21Dias?.trim() || null,
          itens: (selectedProposta.itens as any) ?? [],
        };

        const { data, error } = await (supabase as any)
          .from('propostas')
          .update(payload)
          .eq('id', selectedProposta.id)
          .select('id, titulo, descricao, valor_total, status, data_proposta, validade_ate, created_at, itens, slug, local_festa, link_pagamento_7_dias, link_pagamento_21_dias')
          .single();

        if (error) throw error;

        const updated: Proposta = {
          id: String(data.id),
          clienteNome: String(data.titulo ?? ''),
          valorTotal: Number(data.valor_total ?? 0),
          status: dbStatusToUiStatus(data.status),
          dataCriacao: data.data_proposta ? `${data.data_proposta}T00:00:00` : String(data.created_at ?? selectedProposta.dataCriacao),
          dataEvento: data.validade_ate ? `${data.validade_ate}T00:00:00` : '',
          descricao: data.descricao ?? undefined,
          slug: data.slug ?? undefined,
          localFesta: data.local_festa ?? undefined,
          linkPagamento7Dias: data.link_pagamento_7_dias ?? undefined,
          linkPagamento21Dias: data.link_pagamento_21_dias ?? undefined,
          itens: (Array.isArray(data.itens) ? data.itens : []) as any,
        };

        setPropostas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setIsModalOpen(false);
        setSelectedProposta(null);
        setHasChanges(false);
        setOriginalProposta(null);
        showToast('Proposta atualizada com sucesso!', 'success');
      }
    } catch (err) {
      console.error('Erro ao salvar proposta:', err);
      showToast('Erro ao salvar no Supabase.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProposta(null);
      setIsEditing(false);
      setHasChanges(false);
      setOriginalProposta(null);
    }, 200);
  };

  const handleDeleteClick = (proposta: Proposta) => {
    setPropostaToDelete(proposta);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!propostaToDelete) return;

    // Fallback: sem Supabase configurado, mantém comportamento local
    if (!supabase) {
      setPropostas(propostas.filter((p) => p.id !== propostaToDelete.id));
      setIsDeleteDialogOpen(false);
      setPropostaToDelete(null);
      setIsModalOpen(false);
      setSelectedProposta(null);
      showToast('Proposta excluída localmente (Supabase não configurado).', 'warning');
      return;
    }

    if (!isUuid(propostaToDelete.id)) {
      showToast('Não é possível excluir proposta local do Supabase.', 'warning');
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await (supabase as any)
        .from('propostas')
        .delete()
        .eq('id', propostaToDelete.id);

      if (error) throw error;

      setPropostas((prev) => prev.filter((p) => p.id !== propostaToDelete.id));
      showToast('Proposta excluída com sucesso!', 'success');
      setIsDeleteDialogOpen(false);
      setPropostaToDelete(null);
      setIsModalOpen(false);
      setSelectedProposta(null);
    } catch (err) {
      console.error('Erro ao excluir proposta:', err);
      showToast('Erro ao excluir proposta.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setPropostaToDelete(null);
  };

  // Filtrar propostas com base na busca
  const filteredPropostas = React.useMemo(() => {
    if (!searchQuery.trim()) return propostas;
    
    const query = searchQuery.toLowerCase();
    return propostas.filter(proposta => 
      proposta.clienteNome.toLowerCase().includes(query) ||
      proposta.valorTotal.toString().includes(query) ||
      (proposta.descricao?.toLowerCase().includes(query)) ||
      STATUS_LABELS[proposta.status].toLowerCase().includes(query)
    );
  }, [propostas, searchQuery]);

  return (
    <div className="w-full">
      {/* Header com título e botão */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535]">
            Propostas
          </h2>
          <button
            onClick={handleAddProposta}
            className="btn-primary-xs flex items-center gap-2"
          >
            <Plus className="size-4" />
            Nova Proposta
          </button>
        </div>
        {/* Barra de busca */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar propostas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="py-12 flex items-center justify-center">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Cliente</th>
                    <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Valor</th>
                    <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Data Evento</th>
                    <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Criada em</th>
                    <th className="px-4 py-3 text-center text-xs font-unbounded text-[#703535]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPropostas.map((proposta) => (
                    <tr 
                      key={proposta.id} 
                      onClick={() => handleEditProposta(proposta)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">{proposta.clienteNome}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        R$ {proposta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {proposta.dataEvento ? format(new Date(`${proposta.dataEvento.split('T')[0]}T00:00:00`), "dd/MM/yyyy", { locale: ptBR }) : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={STATUS_COLORS[proposta.status]} size="sm">
                          {STATUS_LABELS[proposta.status]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {format(new Date(proposta.dataCriacao), "dd/MM/yyyy", { locale: ptBR })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProposta(proposta);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-[#D65B58]"
                            title="Editar"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(proposta);
                            }}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors text-gray-600 hover:text-red-600"
                            title="Excluir"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPropostas.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'Nenhuma proposta encontrada' : 'Nenhuma proposta cadastrada'}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Edição/Visualização */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (open) setIsModalOpen(true);
          else handleCloseModal();
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F6EEE1]">
          {selectedProposta && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-unbounded text-[#703535]">
                  {selectedProposta.clienteNome ? 'Editar Proposta' : 'Nova Proposta'}
                </DialogTitle>
              </DialogHeader>

              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-300 mt-4">
                <button
                  onClick={() => setActiveTab('cliente')}
                  className={`px-6 py-3 font-unbounded font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === 'cliente'
                      ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                      : 'text-[#703535] hover:text-[#D65B58] border-b-2 border-transparent'
                  }`}
                >
                  Cliente
                </button>
                <button
                  onClick={() => setActiveTab('proposta')}
                  className={`px-6 py-3 font-unbounded font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === 'proposta'
                      ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                      : 'text-[#703535] hover:text-[#D65B58] border-b-2 border-transparent'
                  }`}
                >
                  Proposta
                </button>
                <button
                  onClick={() => setActiveTab('pagamento')}
                  className={`px-6 py-3 font-unbounded font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === 'pagamento'
                      ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                      : 'text-[#703535] hover:text-[#D65B58] border-b-2 border-transparent'
                  }`}
                >
                  Pagamento
                </button>
              </div>

              <div className="space-y-6 mt-4">
                {/* Tab: Cliente */}
                {activeTab === 'cliente' && (
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome dos Noivos
                      </label>
                      <input
                        type="text"
                        value={selectedProposta.clienteNome}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, clienteNome: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="Nome do casal"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data da Cerimônia
                        </label>
                        <input
                          type="date"
                          value={selectedProposta.dataEvento ? selectedProposta.dataEvento.split('T')[0] : ''}
                          onChange={(e) => setSelectedProposta({ ...selectedProposta, dataEvento: e.target.value ? `${e.target.value}T00:00:00` : '' })}
                          disabled={!isEditing}
                          className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Local da Festa
                        </label>
                        <input
                          type="text"
                          value={selectedProposta.localFesta || ''}
                          onChange={(e) => setSelectedProposta({ ...selectedProposta, localFesta: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                          placeholder="Local da festa"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Proposta */}
                {activeTab === 'proposta' && (
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data da Proposta
                      </label>
                      <input
                        type="date"
                        value={selectedProposta.dataCriacao ? selectedProposta.dataCriacao.split('T')[0] : ''}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, dataCriacao: e.target.value ? `${e.target.value}T00:00:00` : new Date().toISOString() })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={selectedProposta.status}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, status: e.target.value as Proposta['status'] })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                      >
                        <option value="rascunho">Rascunho</option>
                        <option value="enviada">Enviada</option>
                        <option value="aceita">Aceita</option>
                        <option value="recusada">Recusada</option>
                        <option value="expirada">Expirada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={selectedProposta.descricao || ''}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, descricao: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        rows={5}
                        placeholder="Descrição da proposta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL da Proposta Pública
                        <span className="text-xs text-gray-500 ml-2">(opcional - gerado automaticamente se vazio)</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">/proposta/</span>
                          <input
                            type="text"
                            value={selectedProposta.slug || ''}
                            onChange={(e) => setSelectedProposta({ ...selectedProposta, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                            disabled={!isEditing}
                            className="w-full pl-24 pr-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                            placeholder="casal-joao-maria"
                          />
                        </div>
                        {selectedProposta.slug && !selectedProposta.id.startsWith('new-') && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                const url = `${window.location.origin}/proposta/${selectedProposta.slug}`;
                                navigator.clipboard.writeText(url);
                                showToast('Link copiado!', 'success');
                              }}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                              title="Copiar link"
                            >
                              <Copy className="size-4" />
                            </button>
                            <a
                              href={`/proposta/${selectedProposta.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                              title="Abrir em nova aba"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </>
                        )}
                      </div>
                      {isEditing && (
                        <p className="text-xs text-gray-500 mt-1">
                          Use apenas letras minúsculas, números e hífens. Ex: casal-joao-maria
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Pagamento */}
                {activeTab === 'pagamento' && (
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor Total
                      </label>
                      <input
                        type="text"
                        value={selectedProposta.valorTotal.toLocaleString('pt-BR')}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\./g, '').replace(',', '.');
                          setSelectedProposta({ ...selectedProposta, valorTotal: parseFloat(value) || 0 });
                        }}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link de Pagamento (7 dias - 20% desconto)
                      </label>
                      <input
                        type="text"
                        value={selectedProposta.linkPagamento7Dias || ''}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, linkPagamento7Dias: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Cole o link de pagamento aqui"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link de Pagamento (21 dias - preço padrão)
                      </label>
                      <input
                        type="text"
                        value={selectedProposta.linkPagamento21Dias || ''}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, linkPagamento21Dias: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Cole o link de pagamento aqui"
                      />
                    </div>
                  </div>
                )}

                {/* Botões de Ação */}
                {isEditing && (
                  <div className="flex items-center justify-end gap-3">
                    {!selectedProposta.id.startsWith('new-') && (
                      <button
                        onClick={() => handleDeleteClick(selectedProposta)}
                        className="btn-danger-xs-outline flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir Proposta
                      </button>
                    )}
                    <button
                      onClick={handleSaveProposta}
                      disabled={isSaving || (!selectedProposta.id.startsWith('new-') && !hasChanges)}
                      className="btn-primary-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      {isSaving ? 'Salvando...' : (selectedProposta.id.startsWith('new-') ? 'Criar Proposta' : 'Atualizar Proposta')}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md bg-[#F6EEE1]">
          <DialogHeader>
            <DialogTitle className="text-xl font-unbounded text-[#703535]">
              Confirmar Exclusão
            </DialogTitle>
          </DialogHeader>
          {propostaToDelete && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Tem certeza que deseja excluir a proposta de <strong>{propostaToDelete.clienteNome}</strong>?
              </p>
              <p className="text-sm text-gray-600">
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                  className="btn-secondary-xs-outline"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="btn-danger-xs flex items-center gap-2"
                >
                  <Trash2 className="size-4" />
                  {isDeleting ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
