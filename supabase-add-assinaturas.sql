-- Adicionar campos de assinatura à tabela de contratos
-- Execute este script no Supabase SQL Editor

-- Adicionar colunas para assinaturas (armazenar como base64)
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS assinatura_noiva TEXT,
ADD COLUMN IF NOT EXISTS assinatura_noivo TEXT;

-- Adicionar comentários nas colunas
COMMENT ON COLUMN contratos.assinatura_noiva IS 'Assinatura digital da noiva em formato base64';
COMMENT ON COLUMN contratos.assinatura_noivo IS 'Assinatura digital do noivo em formato base64';
