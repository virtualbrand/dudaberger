-- Adicionar coluna numero_convidados na tabela propostas
ALTER TABLE propostas
ADD COLUMN IF NOT EXISTS numero_convidados INTEGER;

-- Adicionar comentário na coluna
COMMENT ON COLUMN propostas.numero_convidados IS 'Número de convidados do evento';
