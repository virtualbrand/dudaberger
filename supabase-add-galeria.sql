-- ============================================================
-- SETUP COMPLETO: Galeria de Inspirações
-- Execute no Supabase SQL Editor (aba "SQL Editor")
-- ============================================================

-- ------------------------------------------------------------
-- 1. BUCKET DE STORAGE
-- O Supabase não permite criar buckets via SQL puro na maioria
-- dos planos. Use uma das duas opções abaixo:
--
-- OPÇÃO A (recomendada) — Via Dashboard:
--   Storage > New bucket
--   Name: galeria
--   Public bucket: ON (ativado)
--   File size limit: 10 MB
--   Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
--
-- OPÇÃO B — Via SQL (requer extensão storage habilitada):
-- ------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'galeria',
  'galeria',
  true,
  10485760,   -- 10 MB em bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- 2. POLICIES DE STORAGE
-- Leitura pública + upload/delete apenas autenticados
-- ------------------------------------------------------------

-- Leitura pública (necessário para as URLs funcionarem)
DROP POLICY IF EXISTS "galeria_storage_select_public" ON storage.objects;
CREATE POLICY "galeria_storage_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'galeria');

-- Upload apenas autenticados
DROP POLICY IF EXISTS "galeria_storage_insert_auth" ON storage.objects;
CREATE POLICY "galeria_storage_insert_auth"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'galeria');

-- Delete apenas autenticados
DROP POLICY IF EXISTS "galeria_storage_delete_auth" ON storage.objects;
CREATE POLICY "galeria_storage_delete_auth"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'galeria');

-- ------------------------------------------------------------
-- 3. TABELA: galeria_fotos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS galeria_fotos (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tags         TEXT[]      NOT NULL DEFAULT '{}',
  storage_path TEXT        NOT NULL,
  url          TEXT        NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 4. TRIGGER: atualiza updated_at automaticamente
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_galeria_fotos_updated_at ON galeria_fotos;
CREATE TRIGGER trg_galeria_fotos_updated_at
  BEFORE UPDATE ON galeria_fotos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- 5. ÍNDICE GIN para busca eficiente por tags
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_galeria_fotos_tags
  ON galeria_fotos USING GIN (tags);

-- ------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------
ALTER TABLE galeria_fotos ENABLE ROW LEVEL SECURITY;

-- Leitura pública (página /inspiracoes)
DROP POLICY IF EXISTS "galeria_fotos_select_public" ON galeria_fotos;
CREATE POLICY "galeria_fotos_select_public"
  ON galeria_fotos FOR SELECT
  USING (true);

-- Insert apenas autenticados
DROP POLICY IF EXISTS "galeria_fotos_insert_auth" ON galeria_fotos;
CREATE POLICY "galeria_fotos_insert_auth"
  ON galeria_fotos FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update apenas autenticados
DROP POLICY IF EXISTS "galeria_fotos_update_auth" ON galeria_fotos;
CREATE POLICY "galeria_fotos_update_auth"
  ON galeria_fotos FOR UPDATE
  TO authenticated
  USING (true);

-- Delete apenas autenticados
DROP POLICY IF EXISTS "galeria_fotos_delete_auth" ON galeria_fotos;
CREATE POLICY "galeria_fotos_delete_auth"
  ON galeria_fotos FOR DELETE
  TO authenticated
  USING (true);

