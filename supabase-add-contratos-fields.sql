-- Adicionar campos faltantes na tabela de contratos para compatibilidade com a interface
-- Execute este SQL no Supabase SQL Editor

-- Adicionar slug (URL amigável)
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Adicionar descrição/observações gerais
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Adicionar data do evento (data da cerimônia)
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS data_evento DATE;

-- Adicionar local da festa
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS local_festa VARCHAR(255);

-- Adicionar número de convidados
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS numero_convidados INTEGER;

-- Criar índice para o slug
CREATE INDEX IF NOT EXISTS idx_contratos_slug ON contratos(slug);

-- Comentários nas novas colunas
COMMENT ON COLUMN contratos.slug IS 'URL amigável para acesso público ao contrato (ex: contrato-joao-maria)';
COMMENT ON COLUMN contratos.descricao IS 'Descrição detalhada do contrato';
COMMENT ON COLUMN contratos.data_evento IS 'Data da cerimônia/evento';
COMMENT ON COLUMN contratos.local_festa IS 'Local onde será realizado o evento';
COMMENT ON COLUMN contratos.numero_convidados IS 'Número de convidados esperados no evento';

-- Permitir acesso público de leitura aos contratos via slug (para página pública)
CREATE POLICY "Permitir acesso público aos contratos via slug" ON contratos
  FOR SELECT USING (slug IS NOT NULL);
