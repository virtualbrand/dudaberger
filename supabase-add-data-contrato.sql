-- Adicionar campo data_contrato à tabela de contratos
-- Execute este script no Supabase SQL Editor

-- Adicionar coluna para data do contrato
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS data_contrato DATE;

-- Adicionar comentário na coluna
COMMENT ON COLUMN contratos.data_contrato IS 'Data de assinatura do contrato (usada para exibição no formato: Garopaba, 26 de setembro de 2025)';
