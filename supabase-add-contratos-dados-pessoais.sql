-- Adicionar campos de dados pessoais à tabela de contratos
-- Execute este script no Supabase SQL Editor

-- Adicionar colunas para dados da noiva
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS nome_noiva TEXT,
ADD COLUMN IF NOT EXISTS cpf_noiva VARCHAR(14);

-- Adicionar colunas para dados do noivo
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS nome_noivo TEXT,
ADD COLUMN IF NOT EXISTS cpf_noivo VARCHAR(14);

-- Adicionar coluna de endereço
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS endereco TEXT;

-- Adicionar comentários nas colunas
COMMENT ON COLUMN contratos.nome_noiva IS 'Nome completo da noiva';
COMMENT ON COLUMN contratos.cpf_noiva IS 'CPF da noiva (formato: 000.000.000-00)';
COMMENT ON COLUMN contratos.nome_noivo IS 'Nome completo do noivo';
COMMENT ON COLUMN contratos.cpf_noivo IS 'CPF do noivo (formato: 000.000.000-00)';
COMMENT ON COLUMN contratos.endereco IS 'Endereço completo do casal';
