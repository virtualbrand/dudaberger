# Instruções de Setup do Supabase

## 1. Criar Usuário Admin

1. Acesse: https://ijegivunztfwqidhsyau.supabase.co
2. Vá em **Authentication** > **Users**
3. Clique em **Add User** > **Create new user**
4. Preencha:
   - Email: `berger.duda@gmail.com`
   - Password: `Canudinho20*`
   - Auto Confirm User: ✅ (marque)
5. Clique em **Create User**

## 2. Executar SQL para Criar Tabelas

1. No Supabase Dashboard, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor e clique em **Run**
5. Verifique se as tabelas foram criadas em **Table Editor**

## 3. Verificar Criação

Após executar, você deve ver:
- ✅ Tabela `leads` com todos os campos
- ✅ Tabela `propostas` com relacionamento para leads
- ✅ Tabela `contratos` com relacionamento para leads e propostas
- ✅ Índices criados
- ✅ Triggers de updated_at funcionando
- ✅ Row Level Security habilitado

## 4. Testar Acesso

Você pode testar inserindo um lead de exemplo:

\`\`\`sql
INSERT INTO leads (nome_noivo, nome_noiva, email, status)
VALUES ('João', 'Maria', 'teste@example.com', 'lead');
\`\`\`

Depois consulte:

\`\`\`sql
SELECT * FROM leads;
\`\`\`
