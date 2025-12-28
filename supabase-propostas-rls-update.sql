-- ============================================
-- ATUALIZAÇÃO DE POLICIES RLS - PROPOSTAS
-- ============================================
-- Este script atualiza as políticas de Row Level Security (RLS)
-- para permitir operações CRUD completas na tabela de propostas
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Remover policy antiga (se existir)
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados" ON propostas;

-- Criar políticas específicas para cada operação CRUD

-- 1. SELECT - Permitir usuários autenticados visualizarem todas as propostas
CREATE POLICY "Usuários autenticados podem ver todas as propostas" ON propostas
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- 2. INSERT - Permitir usuários autenticados criarem novas propostas
CREATE POLICY "Usuários autenticados podem inserir propostas" ON propostas
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- 3. UPDATE - Permitir usuários autenticados atualizarem propostas
CREATE POLICY "Usuários autenticados podem atualizar propostas" ON propostas
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- 4. DELETE - Permitir usuários autenticados excluírem propostas
CREATE POLICY "Usuários autenticados podem deletar propostas" ON propostas
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- VERIFICAÇÃO (OPCIONAL)
-- ============================================
-- Execute as queries abaixo para verificar se as policies foram criadas corretamente

-- Ver todas as policies da tabela propostas
-- SELECT * FROM pg_policies WHERE tablename = 'propostas';

-- Ver se RLS está habilitado
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'propostas';
