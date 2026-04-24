-- ============================================================
-- Galeria de Inspirações
-- Criar tabela e bucket de storage para as fotos da galeria
-- ============================================================

-- 1. Tabela principal de fotos
CREATE TABLE IF NOT EXISTS galeria_fotos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo      TEXT,
  descricao   TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  storage_path TEXT NOT NULL,        -- path no bucket: 'galeria/<filename>'
  url         TEXT NOT NULL,         -- URL pública gerada pelo Supabase Storage
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Trigger para atualizar updated_at automaticamente
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

-- 3. Índice para busca por tags (GIN index para arrays)
CREATE INDEX IF NOT EXISTS idx_galeria_fotos_tags ON galeria_fotos USING GIN (tags);

-- 4. RLS (Row Level Security)
ALTER TABLE galeria_fotos ENABLE ROW LEVEL SECURITY;

-- Leitura pública (página /inspiracoes)
CREATE POLICY "galeria_fotos_select_public"
  ON galeria_fotos FOR SELECT
  USING (true);

-- Insert/Update/Delete apenas para usuários autenticados (dashboard)
CREATE POLICY "galeria_fotos_insert_auth"
  ON galeria_fotos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "galeria_fotos_update_auth"
  ON galeria_fotos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "galeria_fotos_delete_auth"
  ON galeria_fotos FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE BUCKET — executar via Supabase Dashboard ou API
-- ============================================================
-- No painel do Supabase:
--   Storage > New bucket > Name: "galeria" > Public: YES
--
-- Ou via SQL (requer extensão storage habilitada):
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('galeria', 'galeria', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- Policies de storage para usuários autenticados:
-- INSERT INTO storage.policies (name, bucket_id, operation, definition)
-- VALUES
--   ('galeria_upload_auth', 'galeria', 'INSERT', '(auth.role() = ''authenticated'')'),
--   ('galeria_delete_auth', 'galeria', 'DELETE', '(auth.role() = ''authenticated'')'),
--   ('galeria_select_public', 'galeria', 'SELECT', 'true');
