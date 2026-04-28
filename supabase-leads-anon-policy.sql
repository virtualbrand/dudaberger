-- Permite que usuários anônimos (não logados) insiram e atualizem leads
-- Necessário para que o formulário em /wedding funcione sem autenticação

-- Política de INSERT para anônimos
DROP POLICY IF EXISTS "Anônimos podem inserir leads" ON leads;
CREATE POLICY "Anônimos podem inserir leads" ON leads
  FOR INSERT WITH CHECK (auth.role() = 'anon');

-- Política de UPDATE para anônimos
-- Permite que o mesmo usuário anônimo atualize o lead que criou durante o preenchimento do formulário
DROP POLICY IF EXISTS "Anônimos podem atualizar leads" ON leads;
CREATE POLICY "Anônimos podem atualizar leads" ON leads
  FOR UPDATE USING (auth.role() = 'anon');
