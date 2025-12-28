-- Adicionar coluna data_proposta na tabela propostas
ALTER TABLE propostas 
ADD COLUMN IF NOT EXISTS data_proposta DATE;

-- Definir data_proposta como created_at para propostas existentes
UPDATE propostas 
SET data_proposta = DATE(created_at) 
WHERE data_proposta IS NULL;
