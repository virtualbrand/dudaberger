-- ============================================
-- ATUALIZAÇÃO SCHEMA - PROPOSTAS COM SLUG
-- ============================================
-- Este script adiciona o campo slug à tabela propostas
-- para permitir URLs públicas amigáveis
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Adicionar coluna slug (se não existir)
ALTER TABLE propostas 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- 2. Criar índice para slug
CREATE INDEX IF NOT EXISTS idx_propostas_slug ON propostas(slug);

-- 3. Criar policy RLS para acesso público ao slug
-- Permitir que qualquer pessoa visualize propostas via slug (sem autenticação)
DROP POLICY IF EXISTS "Permitir acesso público às propostas via slug" ON propostas;
CREATE POLICY "Permitir acesso público às propostas via slug" ON propostas
  FOR SELECT 
  USING (slug IS NOT NULL);

-- ============================================
-- VERIFICAÇÃO (OPCIONAL)
-- ============================================
-- Execute as queries abaixo para verificar se tudo foi criado corretamente

-- Ver estrutura da tabela propostas
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'propostas'
-- ORDER BY ordinal_position;

-- Ver todas as policies da tabela propostas
-- SELECT * FROM pg_policies WHERE tablename = 'propostas';

-- Testar busca por slug (substitua 'casal-joao-maria' pelo slug real)
-- SELECT id, titulo, slug, valor_total, status
-- FROM propostas
-- WHERE slug = 'casal-joao-maria';
