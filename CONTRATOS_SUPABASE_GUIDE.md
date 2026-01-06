# Guia de Implementação - Contratos no Supabase

Este guia detalha os passos para tornar o sistema de contratos totalmente funcional com o Supabase.

## 📋 Pré-requisitos

- Conta no Supabase configurada
- Variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` configuradas
- Tabela `leads` já existente no banco de dados

## 🔧 Passo 1: Executar o SQL no Supabase

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Execute o arquivo `supabase-add-contratos-fields.sql`:

```sql
-- Cole o conteúdo do arquivo supabase-add-contratos-fields.sql aqui
```

Este SQL irá:
- ✅ Adicionar os campos necessários à tabela `contratos`
- ✅ Criar índices para melhor performance
- ✅ Configurar permissões de acesso público via slug

## 📊 Estrutura da Tabela Contratos

Após a execução do SQL, a tabela `contratos` terá os seguintes campos principais:

### Campos Identificadores
- `id` - UUID (chave primária)
- `numero_contrato` - Número único do contrato
- `slug` - URL amigável (ex: joao-silva-maria-santos)

### Relacionamentos
- `lead_id` - Referência ao lead/cliente (obrigatório)
- `proposta_id` - Referência à proposta original (opcional)

### Informações do Contrato
- `titulo` - Nome dos noivos
- `descricao` - Observações gerais
- `valor_total` - Valor total do contrato
- `valor_pago` - Valor já pago
- `valor_pendente` - Saldo restante
- `status` - Status atual: 'rascunho', 'ativo', 'concluido', 'cancelado'

### Datas
- `data_assinatura` - Data de assinatura do contrato
- `data_inicio` - Data de início
- `data_evento` - Data da cerimônia
- `data_entrega` - Data de entrega prevista
- `data_conclusao` - Data de conclusão (quando finalizado)

### Detalhes do Evento
- `local_festa` - Local onde será o evento
- `numero_convidados` - Número de convidados

### Metadados
- `created_at` - Data de criação
- `updated_at` - Data da última atualização

## 🔐 Permissões (RLS)

A tabela possui as seguintes políticas de segurança:

1. **Acesso Autenticado**: Usuários autenticados podem fazer CRUD completo
2. **Acesso Público**: Qualquer pessoa pode visualizar contratos que tenham `slug` configurado (para página pública)

## 🚀 Como Usar no Sistema

### 1. Criar um Novo Contrato

1. Acesse `/contratos` no admin
2. Clique em "Novo Contrato"
3. Preencha as informações:
   - Nome dos noivos (pode usar autocomplete de propostas)
   - Data da cerimônia
   - Local da festa
   - Valor total
   - Status
   - etc.
4. Clique em "Criar Contrato"

**O que acontece:**
- Sistema gera automaticamente um `numero_contrato` único
- Gera um `slug` baseado no nome dos noivos
- Cria o registro no Supabase
- Configura `data_assinatura`, `data_inicio`, etc.

### 2. Editar um Contrato

1. Clique em qualquer contrato da lista
2. Modifique os campos desejados
3. Clique em "Atualizar Contrato"

### 3. Página Pública

Após criar um contrato, ele fica acessível publicamente via:
```
/contrato/[slug]
```

Exemplo:
```
https://seusite.com/contrato/joao-silva-maria-santos
```

### 4. Compartilhar Link

No modal de edição, você pode:
- 📋 Copiar o link público
- 🔗 Abrir em nova aba para visualizar

## 🎨 Status dos Contratos

- **Rascunho**: Contrato em elaboração (não visível publicamente)
- **Ativo**: Contrato vigente (visível publicamente)
- **Concluído**: Serviço finalizado (visível publicamente)
- **Cancelado**: Contrato cancelado (página pública mostra mensagem de cancelamento)

## 📝 Autocomplete de Propostas

Ao criar um novo contrato, você pode:

1. Digitar o nome dos noivos
2. Sistema busca propostas existentes
3. Selecionar uma proposta para preencher automaticamente:
   - Nome dos noivos
   - Data da cerimônia
   - Local da festa
   - Valor
   - Número de convidados
   - Descrição

## 🔍 Busca e Filtros

A página de contratos permite:
- 🔎 Buscar por nome dos noivos
- 🔎 Buscar por valor
- 🔎 Buscar por status
- 🔎 Buscar por descrição

## ⚠️ Importante

1. **Lead Obrigatório**: Para criar um contrato, é necessário ter pelo menos um lead cadastrado no sistema
2. **Slug Único**: Cada contrato deve ter um slug único (validação automática)
3. **Fallback**: Se o Supabase não estiver disponível, o sistema usa dados mock localmente

## 🧪 Testando

Para testar a integração:

1. Execute o SQL no Supabase
2. Certifique-se de ter pelo menos 1 lead cadastrado
3. Acesse `/contratos` no admin
4. Crie um novo contrato
5. Verifique se foi salvo no Supabase (via SQL Editor ou Table Editor)
6. Acesse `/contrato/[slug]` para ver a página pública

## 📊 Consultas Úteis (SQL)

### Ver todos os contratos
```sql
SELECT * FROM contratos ORDER BY created_at DESC;
```

### Ver contratos ativos
```sql
SELECT * FROM contratos WHERE status = 'ativo' ORDER BY data_evento;
```

### Ver contratos com slug
```sql
SELECT id, titulo, slug, status, valor_total 
FROM contratos 
WHERE slug IS NOT NULL;
```

## 🐛 Troubleshooting

### Erro: "É necessário ter pelo menos um lead cadastrado"
**Solução**: Crie um lead antes de criar contratos

### Erro: "URL inválida"
**Solução**: Use apenas letras minúsculas, números e hífens no slug

### Contrato não aparece na lista
**Solução**: Verifique se o Supabase está configurado corretamente e se há erros no console

### Página pública retorna erro
**Solução**: Verifique se o contrato tem um slug configurado e se a política RLS está ativa

## ✅ Checklist de Implementação

- [ ] SQL executado no Supabase
- [ ] Variáveis de ambiente configuradas
- [ ] Pelo menos 1 lead cadastrado
- [ ] Teste de criação de contrato
- [ ] Teste de edição de contrato
- [ ] Teste de exclusão de contrato
- [ ] Teste de página pública
- [ ] Teste de autocomplete de propostas
- [ ] Teste de busca/filtros

---

**Pronto!** O sistema de contratos está totalmente integrado com o Supabase e funcional. 🎉
