-- ============================================================
-- Adiciona coluna `numero` sequencial em galeria_fotos
-- Execute no Supabase SQL Editor.
-- ============================================================

-- 1. Adicionar coluna
ALTER TABLE galeria_fotos ADD COLUMN IF NOT EXISTS numero INTEGER;

-- 2. Criar sequência
CREATE SEQUENCE IF NOT EXISTS galeria_fotos_numero_seq;

-- 3. Preencher registros existentes em ordem de criação
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) AS rn
  FROM galeria_fotos
)
UPDATE galeria_fotos SET numero = numbered.rn
FROM numbered WHERE galeria_fotos.id = numbered.id;

-- 4. Ajustar o próximo valor da sequência
SELECT setval('galeria_fotos_numero_seq', (SELECT COALESCE(MAX(numero), 0) FROM galeria_fotos));

-- 5. Definir default para novos registros
ALTER TABLE galeria_fotos ALTER COLUMN numero SET DEFAULT nextval('galeria_fotos_numero_seq');
