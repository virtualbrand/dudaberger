# Adição de Campos Pessoais aos Contratos

## Resumo
Foram adicionados 5 novos campos ao sistema de contratos para capturar informações pessoais dos noivos:

1. **Nome da Noiva** - Campo de texto para nome completo
2. **CPF da Noiva** - Campo com máscara automática (formato: 000.000.000-00)
3. **Nome do Noivo** - Campo de texto para nome completo  
4. **CPF do Noivo** - Campo com máscara automática (formato: 000.000.000-00)
5. **Endereço** - Campo de texto para endereço completo do casal

## Arquivos Modificados

### 1. `/src/types/contrato.ts`
Adicionados novos campos opcionais à interface `Contrato`:
```typescript
nomeNoiva?: string;
cpfNoiva?: string;
nomeNoivo?: string;
cpfNoivo?: string;
endereco?: string;
```

### 2. `/src/components/dashboard/ContratosTable.tsx`
- Adicionados inputs no formulário do modal de edição/criação
- Máscara automática de CPF aplicada nos campos de CPF
- Campos integrados com as operações de INSERT e UPDATE do Supabase
- Campos carregados corretamente ao buscar contratos do banco

### 3. `/src/lib/supabase.ts`
Atualizados os tipos TypeScript do Supabase:
- `Row`: tipo para leitura
- `Insert`: tipo para criação
- `Update`: tipo para atualização

Todos incluem os novos campos: `nome_noiva`, `cpf_noiva`, `nome_noivo`, `cpf_noivo`, `endereco`

### 4. `/supabase-add-contratos-dados-pessoais.sql` (NOVO)
Script SQL para adicionar as colunas ao banco de dados:
```sql
ALTER TABLE contratos
ADD COLUMN IF NOT EXISTS nome_noiva TEXT,
ADD COLUMN IF NOT EXISTS cpf_noiva VARCHAR(14),
ADD COLUMN IF NOT EXISTS nome_noivo TEXT,
ADD COLUMN IF NOT EXISTS cpf_noivo TEXT,
ADD COLUMN IF NOT EXISTS endereco TEXT;
```

## Passos para Implementação

### 1. Executar Migration no Supabase
Execute o arquivo `supabase-add-contratos-dados-pessoais.sql` no SQL Editor do Supabase:

1. Acesse o painel do Supabase
2. Vá em **SQL Editor**
3. Crie uma nova query
4. Cole o conteúdo de `supabase-add-contratos-dados-pessoais.sql`
5. Execute a query

### 2. Verificar Funcionalidade
1. Acesse `/dashboard` → Contratos
2. Clique em "Novo Contrato" ou edite um existente
3. Verifique se os novos campos aparecem:
   - Nome da Noiva
   - CPF da Noiva (com máscara automática)
   - Nome do Noivo
   - CPF do Noivo (com máscara automática)
   - Endereço
4. Preencha e salve um contrato
5. Verifique se os dados foram salvos corretamente no Supabase

## Características Técnicas

### Máscara de CPF
Os campos de CPF possuem máscara automática que formata o valor digitado:
- Remove caracteres não numéricos
- Aplica formato: `000.000.000-00`
- Limite de 14 caracteres (incluindo pontos e hífen)

```typescript
const value = e.target.value.replace(/\D/g, '');
const formatted = value
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
```

### Validação
- Todos os campos são opcionais
- Campos de CPF aceitam apenas números (máscara é aplicada automaticamente)
- Valores são salvos com `.trim()` para remover espaços extras
- Valores vazios são salvos como `null` no banco

### Layout do Formulário
Os campos foram organizados em grades responsivas:
- **Grid 2 colunas**: Nome + CPF (Noiva e Noivo separadamente)
- **Campo único**: Endereço (largura completa)
- Responsivo: em mobile muda para 1 coluna

## Próximos Passos Sugeridos
1. ✅ Executar migration SQL no Supabase
2. ✅ Testar criação de novos contratos
3. ✅ Testar edição de contratos existentes
4. Considerar adicionar validação de CPF (opcional)
5. Considerar exibir esses dados na página pública do contrato (se necessário)

## Notas Importantes
- Os campos são opcionais - não há validação obrigatória
- A máscara de CPF é apenas visual - o valor salvo no banco mantém a formatação
- Contratos existentes não serão afetados - eles terão esses campos como `null`
- O autocomplete de propostas não preenche esses campos (apenas nome, data, local, valor, etc.)
