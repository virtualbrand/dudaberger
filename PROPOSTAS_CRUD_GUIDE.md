# Atualização de Políticas RLS - Supabase

## Propostas CRUD - Dashboard

Este guia descreve as alterações necessárias no Supabase para habilitar as funcionalidades de criar, editar e excluir propostas no dashboard.

## ✅ O que foi implementado

1. **Criar Propostas**: Modal com formulário para adicionar novas propostas
2. **Editar Propostas**: Edição inline de propostas existentes
3. **Excluir Propostas**: Confirmação antes de excluir com diálogo
4. **Hook usePropostas**: Hook customizado para gerenciar estado e operações CRUD
5. **Integração com Supabase**: Todas as operações sincronizadas com o banco de dados

## 🔧 Aplicar no Supabase

### Opção 1: Via SQL Editor (Recomendado)

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor** no menu lateral
3. Clique em **+ New Query**
4. Cole o código SQL abaixo e clique em **Run**:

```sql
-- Atualizar políticas RLS para propostas
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados" ON propostas;

-- Criar políticas específicas para cada operação
CREATE POLICY "Usuários autenticados podem ver todas as propostas" ON propostas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir propostas" ON propostas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar propostas" ON propostas
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar propostas" ON propostas
  FOR DELETE USING (auth.role() = 'authenticated');
```

### Opção 2: Via Interface do Supabase

1. Acesse **Authentication** > **Policies**
2. Selecione a tabela `propostas`
3. Delete a policy antiga "Permitir tudo para usuários autenticados"
4. Crie 4 novas policies:

**Policy 1 - SELECT**
- Name: `Usuários autenticados podem ver todas as propostas`
- Policy command: `SELECT`
- Target roles: `authenticated`
- USING expression: `auth.role() = 'authenticated'`

**Policy 2 - INSERT**
- Name: `Usuários autenticados podem inserir propostas`
- Policy command: `INSERT`
- Target roles: `authenticated`
- WITH CHECK expression: `auth.role() = 'authenticated'`

**Policy 3 - UPDATE**
- Name: `Usuários autenticados podem atualizar propostas`
- Policy command: `UPDATE`
- Target roles: `authenticated`
- USING expression: `auth.role() = 'authenticated'`

**Policy 4 - DELETE**
- Name: `Usuários autenticados podem deletar propostas`
- Policy command: `DELETE`
- Target roles: `authenticated`
- USING expression: `auth.role() = 'authenticated'`

## 📝 Verificar se está funcionando

Após aplicar as policies:

1. Faça login no dashboard
2. Vá para a aba **Propostas**
3. Teste:
   - ✅ Clicar em "Nova Proposta" e preencher o formulário
   - ✅ Editar uma proposta existente
   - ✅ Excluir uma proposta (com confirmação)
   - ✅ Buscar propostas usando a barra de pesquisa

## 🔍 Solução de Problemas

### Erro: "new row violates row-level security policy"

**Causa**: As policies RLS não estão configuradas corretamente.

**Solução**: Execute o script SQL da Opção 1 acima.

### Erro: "É necessário ter pelo menos um lead cadastrado"

**Causa**: Para criar uma proposta, é necessário ter um lead associado.

**Solução**: 
1. Vá para a aba **Leads** do dashboard
2. Cadastre pelo menos um lead
3. Tente criar a proposta novamente

### Propostas não carregam

**Causa**: Variáveis de ambiente do Supabase não configuradas.

**Solução**: Verifique se estas variáveis estão definidas em `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

## 🎨 Recursos da Interface

### Modal de Criação/Edição
- Campo "Nome do Cliente" (obrigatório)
- Campo "Data do Evento"
- Campo "Valor Total" (numérico)
- Campo "Status" (Rascunho, Enviada, Aceita, Recusada)
- Campo "Descrição" (opcional)

### Tabela de Propostas
- Busca por nome, valor ou status
- Colunas: Cliente, Valor, Data Evento, Status, Criada em, Ações
- Ações: Visualizar, Editar, Excluir

### Feedback Visual
- Toasts para confirmação de ações
- Loading states durante operações
- Confirmação antes de excluir

## 📚 Arquivos Modificados

1. `src/components/dashboard/PropostasTable.tsx` - Componente principal com CRUD completo
2. `src/hooks/usePropostas.ts` - Hook customizado para gerenciar propostas
3. `supabase-schema.sql` - Schema atualizado com policies RLS corretas

## 🚀 Próximos Passos (Opcional)

- [ ] Adicionar campos de itens da proposta no formulário
- [ ] Implementar upload de arquivos anexos
- [ ] Adicionar filtros avançados por status e data
- [ ] Exportar propostas para PDF
- [ ] Enviar propostas por email
