import { useState, useEffect, useCallback } from 'react';
import { Proposta } from '@/types/proposta';
import { supabase, type PropostaUpdate, type PropostaInsert } from '@/lib/supabase';
import { mockPropostas } from '@/data/mock-propostas';

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

export const usePropostas = () => {
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar propostas do Supabase
  const loadPropostas = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!supabase) {
        setPropostas(mockPropostas);
        setIsLoading(false);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('propostas')
        .select('id, titulo, descricao, valor_total, status, validade_ate, created_at, itens')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped: Proposta[] = (data || []).map((row: any) => ({
        id: String(row.id),
        clienteNome: String(row.titulo ?? ''),
        valorTotal: Number(row.valor_total ?? 0),
        status: dbStatusToUiStatus(row.status),
        dataCriacao: String(row.created_at ?? new Date().toISOString()),
        dataEvento: row.validade_ate ? `${row.validade_ate}T00:00:00` : '',
        descricao: row.descricao ?? undefined,
        itens: (Array.isArray(row.itens) ? row.itens : []) as any,
      }));

      setPropostas(mapped);
    } catch (err) {
      console.error('Erro ao carregar propostas:', err);
      setError('Erro ao carregar propostas do Supabase');
      setPropostas(mockPropostas);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar nova proposta
  const createProposta = useCallback(async (proposta: Omit<Proposta, 'id' | 'dataCriacao'>) => {
    if (!supabase) {
      const newId = `local-${Date.now()}`;
      const newProposta: Proposta = {
        ...proposta,
        id: newId,
        dataCriacao: new Date().toISOString(),
      };
      setPropostas((prev) => [newProposta, ...prev]);
      return { data: newProposta, error: null };
    }

    try {
      // Buscar primeiro lead disponível
      const { data: leads, error: leadsError } = await (supabase as any)
        .from('leads')
        .select('id')
        .limit(1);

      if (leadsError || !leads || leads.length === 0) {
        throw new Error('É necessário ter pelo menos um lead cadastrado');
      }

      const payload: PropostaInsert = {
        lead_id: leads[0].id,
        titulo: proposta.clienteNome.trim(),
        descricao: proposta.descricao?.trim() || null,
        valor_total: proposta.valorTotal,
        status: uiStatusToDbStatus(proposta.status),
        validade_ate: proposta.dataEvento ? proposta.dataEvento.split('T')[0] : null,
        itens: (proposta.itens as any) ?? [],
      };

      const { data, error } = await (supabase as any)
        .from('propostas')
        .insert(payload)
        .select('id, titulo, descricao, valor_total, status, validade_ate, created_at, itens')
        .single();

      if (error) throw error;

      const newProposta: Proposta = {
        id: String(data.id),
        clienteNome: String(data.titulo ?? ''),
        valorTotal: Number(data.valor_total ?? 0),
        status: dbStatusToUiStatus(data.status),
        dataCriacao: String(data.created_at ?? new Date().toISOString()),
        dataEvento: data.validade_ate ? `${data.validade_ate}T00:00:00` : '',
        descricao: data.descricao ?? undefined,
        itens: (Array.isArray(data.itens) ? data.itens : []) as any,
      };

      setPropostas((prev) => [newProposta, ...prev]);
      return { data: newProposta, error: null };
    } catch (err: any) {
      console.error('Erro ao criar proposta:', err);
      return { data: null, error: err.message || 'Erro ao criar proposta' };
    }
  }, []);

  // Atualizar proposta existente
  const updateProposta = useCallback(async (id: string, proposta: Partial<Proposta>) => {
    if (!supabase || !isUuid(id)) {
      setPropostas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...proposta } : p))
      );
      return { data: proposta, error: null };
    }

    try {
      const payload: PropostaUpdate = {
        ...(proposta.clienteNome !== undefined && { titulo: proposta.clienteNome.trim() }),
        ...(proposta.descricao !== undefined && { 
          descricao: proposta.descricao?.trim() || null 
        }),
        ...(proposta.valorTotal !== undefined && { valor_total: proposta.valorTotal }),
        ...(proposta.status !== undefined && { status: uiStatusToDbStatus(proposta.status) }),
        ...(proposta.dataEvento !== undefined && { 
          validade_ate: proposta.dataEvento ? proposta.dataEvento.split('T')[0] : null 
        }),
        ...(proposta.itens !== undefined && { itens: proposta.itens as any }),
      };

      const { data, error } = await (supabase as any)
        .from('propostas')
        .update(payload)
        .eq('id', id)
        .select('id, titulo, descricao, valor_total, status, validade_ate, created_at, itens')
        .single();

      if (error) throw error;

      const updated: Proposta = {
        id: String(data.id),
        clienteNome: String(data.titulo ?? ''),
        valorTotal: Number(data.valor_total ?? 0),
        status: dbStatusToUiStatus(data.status),
        dataCriacao: String(data.created_at),
        dataEvento: data.validade_ate ? `${data.validade_ate}T00:00:00` : '',
        descricao: data.descricao ?? undefined,
        itens: (Array.isArray(data.itens) ? data.itens : []) as any,
      };

      setPropostas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      return { data: updated, error: null };
    } catch (err: any) {
      console.error('Erro ao atualizar proposta:', err);
      return { data: null, error: err.message || 'Erro ao atualizar proposta' };
    }
  }, []);

  // Excluir proposta
  const deleteProposta = useCallback(async (id: string) => {
    if (!supabase || !isUuid(id)) {
      setPropostas((prev) => prev.filter((p) => p.id !== id));
      return { error: null };
    }

    try {
      const { error } = await (supabase as any)
        .from('propostas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPropostas((prev) => prev.filter((p) => p.id !== id));
      return { error: null };
    } catch (err: any) {
      console.error('Erro ao excluir proposta:', err);
      return { error: err.message || 'Erro ao excluir proposta' };
    }
  }, []);

  useEffect(() => {
    loadPropostas();
  }, [loadPropostas]);

  return {
    propostas,
    isLoading,
    error,
    loadPropostas,
    createProposta,
    updateProposta,
    deleteProposta,
  };
};
