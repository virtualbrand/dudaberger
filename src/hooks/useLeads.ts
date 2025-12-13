'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Lead, LeadInsert, LeadUpdate } from '@/lib/supabase';

export function useLeads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cria um novo lead
   */
  const createLead = async (data: LeadInsert): Promise<Lead | null> => {
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      return null;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { data: lead, error: err } = await (supabase as any)
        .from('leads')
        .insert(data)
        .select()
        .single();

      if (err) throw err;

      return lead;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar lead';
      setError(message);
      console.error('Erro ao criar lead:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza um lead existente
   */
  const updateLead = async (id: string, data: LeadUpdate): Promise<Lead | null> => {
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      return null;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { data: lead, error: err } = await (supabase as any)
        .from('leads')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;

      return lead;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar lead';
      setError(message);
      console.error('Erro ao atualizar lead:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca um lead por ID
   */
  const getLead = async (id: string): Promise<Lead | null> => {
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      return null;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { data: lead, error: err } = await (supabase as any)
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (err) throw err;

      return lead;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar lead';
      setError(message);
      console.error('Erro ao buscar lead:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca todos os leads
   */
  const getLeads = async (filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Lead[]> => {
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      return [];
    }
    
    setLoading(true);
    setError(null);

    try {
      let query = (supabase as any)
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data: leads, error: err } = await query;

      if (err) throw err;

      return leads || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar leads';
      setError(message);
      console.error('Erro ao buscar leads:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deleta um lead
   */
  const deleteLead = async (id: string): Promise<boolean> => {
    if (!supabase) {
      setError('Sistema temporariamente indisponível');
      return false;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { error: err } = await (supabase as any)
        .from('leads')
        .delete()
        .eq('id', id);

      if (err) throw err;

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar lead';
      setError(message);
      console.error('Erro ao deletar lead:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza o status de um lead
   */
  const updateLeadStatus = async (id: string, status: string): Promise<Lead | null> => {
    return updateLead(id, { status });
  };

  return {
    loading,
    error,
    createLead,
    updateLead,
    getLead,
    getLeads,
    deleteLead,
    updateLeadStatus,
  };
}
