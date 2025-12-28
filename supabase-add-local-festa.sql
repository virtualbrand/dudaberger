-- Adicionar colunas à tabela propostas
ALTER TABLE propostas 
ADD COLUMN IF NOT EXISTS local_festa VARCHAR(255),
ADD COLUMN IF NOT EXISTS link_pagamento_7_dias TEXT,
ADD COLUMN IF NOT EXISTS link_pagamento_21_dias TEXT;

-- Comentários explicativos
COMMENT ON COLUMN propostas.local_festa IS 'Local da festa/cerimônia do evento';
COMMENT ON COLUMN propostas.link_pagamento_7_dias IS 'Link de pagamento com prazo de 7 dias (desconto de 20%)';
COMMENT ON COLUMN propostas.link_pagamento_21_dias IS 'Link de pagamento com prazo de 21 dias (preço padrão)';
