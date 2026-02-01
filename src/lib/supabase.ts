import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Verifica se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cria cliente usando @supabase/ssr para gerenciar cookies automaticamente
let supabase: ReturnType<typeof createBrowserClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  // Usa createBrowserClient que gerencia cookies automaticamente
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Exporta o cliente (pode ser null durante build)
export { supabase };

// Função helper para criar cliente com service role (apenas para uso server-side)
export const getServiceRoleClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Tipos úteis para TypeScript
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nome_noivo: string | null;
          nome_noiva: string | null;
          email: string | null;
          telefone: string | null;
          whatsapp: string | null;
          data_casamento: string | null;
          local_evento: string | null;
          numero_convidados: number | null;
          tipo_bolo: string | null;
          sabor_preferido: string | null;
          cor_predominante: string | null;
          estilo: string | null;
          orcamento_minimo: number | null;
          orcamento_maximo: number | null;
          status: string;
          created_at: string;
          updated_at: string;
          dados_extras: Record<string, any>;
        };
        Insert: {
          id?: string;
          nome_noivo?: string | null;
          nome_noiva?: string | null;
          email?: string | null;
          telefone?: string | null;
          whatsapp?: string | null;
          data_casamento?: string | null;
          local_evento?: string | null;
          numero_convidados?: number | null;
          tipo_bolo?: string | null;
          sabor_preferido?: string | null;
          cor_predominante?: string | null;
          estilo?: string | null;
          orcamento_minimo?: number | null;
          orcamento_maximo?: number | null;
          status?: string;
          dados_extras?: Record<string, any>;
        };
        Update: {
          nome_noivo?: string | null;
          nome_noiva?: string | null;
          email?: string | null;
          telefone?: string | null;
          whatsapp?: string | null;
          data_casamento?: string | null;
          local_evento?: string | null;
          numero_convidados?: number | null;
          tipo_bolo?: string | null;
          sabor_preferido?: string | null;
          cor_predominante?: string | null;
          estilo?: string | null;
          orcamento_minimo?: number | null;
          orcamento_maximo?: number | null;
          status?: string;
          dados_extras?: Record<string, any>;
        };
      };
      propostas: {
        Row: {
          id: string;
          lead_id: string;
          titulo: string;
          descricao: string | null;
          slug: string | null;
          valor_total: number;
          valor_entrada: number | null;
          forma_pagamento: string | null;
          itens: any[];
          status: string;
          data_proposta: string | null;
          validade_ate: string | null;
          local_festa: string | null;
          numero_convidados: number | null;
          link_pagamento_7_dias: string | null;
          link_pagamento_21_dias: string | null;
          arquivos: any[];
          created_at: string;
          updated_at: string;
          enviada_em: string | null;
          respondida_em: string | null;
          observacoes: string | null;
        };
        Insert: {
          id?: string;
          lead_id: string;
          titulo: string;
          descricao?: string | null;
          slug?: string | null;
          valor_total: number;
          valor_entrada?: number | null;
          forma_pagamento?: string | null;
          itens?: any[];
          status?: string;
          data_proposta?: string | null;
          validade_ate?: string | null;
          local_festa?: string | null;
          numero_convidados?: number | null;
          link_pagamento_7_dias?: string | null;
          link_pagamento_21_dias?: string | null;
          arquivos?: any[];
          enviada_em?: string | null;
          respondida_em?: string | null;
          observacoes?: string | null;
        };
        Update: {
          lead_id?: string;
          titulo?: string;
          descricao?: string | null;
          slug?: string | null;
          valor_total?: number;
          valor_entrada?: number | null;
          forma_pagamento?: string | null;
          itens?: any[];
          status?: string;
          data_proposta?: string | null;
          validade_ate?: string | null;
          local_festa?: string | null;
          numero_convidados?: number | null;
          link_pagamento_7_dias?: string | null;
          link_pagamento_21_dias?: string | null;
          arquivos?: any[];
          enviada_em?: string | null;
          respondida_em?: string | null;
          observacoes?: string | null;
        };
      };
      contratos: {
        Row: {
          id: string;
          lead_id: string;
          proposta_id: string | null;
          numero_contrato: string;
          titulo: string;
          slug: string | null;
          descricao: string | null;
          valor_total: number;
          valor_pago: number;
          valor_pendente: number;
          status: string;
          data_assinatura: string;
          data_inicio: string;
          data_entrega: string;
          data_evento: string | null;
          data_contrato: string | null;
          data_conclusao: string | null;
          local_festa: string | null;
          numero_convidados: number | null;
          nome_noiva: string | null;
          cpf_noiva: string | null;
          nome_noivo: string | null;
          cpf_noivo: string | null;
          endereco: string | null;
          assinatura_noiva: string | null;
          assinatura_noivo: string | null;
          termos: string | null;
          clausulas: any[];
          pagamentos: any[];
          arquivo_contrato_url: string | null;
          arquivos_anexos: any[];
          created_at: string;
          updated_at: string;
          observacoes: string | null;
        };
        Insert: {
          id?: string;
          lead_id: string;
          proposta_id?: string | null;
          numero_contrato: string;
          titulo: string;
          slug?: string | null;
          descricao?: string | null;
          valor_total: number;
          valor_pago?: number;
          valor_pendente: number;
          status?: string;
          data_assinatura: string;
          data_inicio: string;
          data_entrega: string;
          data_evento?: string | null;
          data_contrato?: string | null;
          data_conclusao?: string | null;
          local_festa?: string | null;
          numero_convidados?: number | null;
          nome_noiva?: string | null;
          cpf_noiva?: string | null;
          nome_noivo?: string | null;
          cpf_noivo?: string | null;
          endereco?: string | null;
          termos?: string | null;
          clausulas?: any[];
          pagamentos?: any[];
          arquivo_contrato_url?: string | null;
          arquivos_anexos?: any[];
          observacoes?: string | null;
        };
        Update: {
          lead_id?: string;
          proposta_id?: string | null;
          numero_contrato?: string;
          titulo?: string;
          slug?: string | null;
          descricao?: string | null;
          valor_total?: number;
          valor_pago?: number;
          valor_pendente?: number;
          status?: string;
          data_assinatura?: string;
          data_inicio?: string;
          data_entrega?: string;
          data_evento?: string | null;
          data_contrato?: string | null;
          data_conclusao?: string | null;
          local_festa?: string | null;
          numero_convidados?: number | null;
          nome_noiva?: string | null;
          cpf_noiva?: string | null;
          nome_noivo?: string | null;
          cpf_noivo?: string | null;
          endereco?: string | null;
          assinatura_noiva?: string | null;
          assinatura_noivo?: string | null;
          termos?: string | null;
          clausulas?: any[];
          pagamentos?: any[];
          arquivo_contrato_url?: string | null;
          arquivos_anexos?: any[];
          observacoes?: string | null;
        };
      };
    };
  };
};

// Tipos auxiliares para facilitar o uso
export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];

export type Proposta = Database['public']['Tables']['propostas']['Row'];
export type PropostaInsert = Database['public']['Tables']['propostas']['Insert'];
export type PropostaUpdate = Database['public']['Tables']['propostas']['Update'];

export type Contrato = Database['public']['Tables']['contratos']['Row'];
export type ContratoInsert = Database['public']['Tables']['contratos']['Insert'];
export type ContratoUpdate = Database['public']['Tables']['contratos']['Update'];
