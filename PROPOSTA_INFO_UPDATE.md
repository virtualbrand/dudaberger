# Atualização da Seção de Proposta - Informações do Evento

## Mudanças Implementadas

Esta atualização adiciona mais informações sobre o evento na seção de apresentação da proposta, deixando-a mais completa e informativa para os noivos.

### 1. Novo Campo: Número de Convidados

Foi adicionado o campo "Número de Convidados" no sistema de propostas:

- **Interface**: Adicionado campo `numeroConvidados?: number` no tipo `Proposta`
- **Banco de dados**: Adicionado coluna `numero_convidados` na tabela `propostas`
- **Modal de Edição**: Novo input numérico no modal de edição de propostas (aba "Cliente")

### 2. Atualização da Página Pública da Proposta

A seção de exibição da proposta agora mostra todas as informações do evento de forma organizada:

**Ordem das informações:**
1. Título: "Proposta para os noivos"
2. Nome dos noivos
3. **Data da cerimônia** (se preenchida)
4. **Local** (se preenchido)
5. **Número de convidados** (se preenchido)
6. **Separador horizontal** (linha divisória)
7. **Descrição** da proposta
8. Itens adicionais (se houver)

### 3. Arquivos Modificados

#### Types
- `src/types/proposta.ts` - Adicionado campo `numeroConvidados`

#### Backend/Database
- `src/lib/supabase.ts` - Atualizado schema do Supabase com campo `numero_convidados`
- `supabase-add-numero-convidados.sql` - Script SQL para atualizar banco de dados

#### Dashboard
- `src/components/dashboard/PropostasTable.tsx` - Adicionado input e lógica para salvar número de convidados

#### Página Pública
- `src/app/proposta/[slug]/page.tsx` - Atualizada exibição das informações do evento

### 4. Aplicar no Banco de Dados

Para aplicar as mudanças no banco de dados Supabase, execute o script SQL:

```sql
-- No painel do Supabase, vá em SQL Editor e execute:
ALTER TABLE propostas
ADD COLUMN IF NOT EXISTS numero_convidados INTEGER;

COMMENT ON COLUMN propostas.numero_convidados IS 'Número de convidados do evento';
```

Ou use o arquivo: `supabase-add-numero-convidados.sql`

### 5. Layout da Nova Seção

```
┌─────────────────────────────────────┐
│ Proposta para os noivos             │
│ [Nome dos Noivos]                   │
│                                     │
│ Data da cerimônia: 14/01/2026      │
│ Local: Espaço Villa Garden         │
│ Número de convidados: 150          │
│ ─────────────────────────────────  │
│                                     │
│ Descrição da proposta...           │
│ • Item adicional 1                 │
│ • Item adicional 2                 │
└─────────────────────────────────────┘
```

### 6. Validação

- Todos os campos são opcionais (exceto nome dos noivos)
- O separador `<hr>` só aparece se houver descrição
- Cada informação só é exibida se estiver preenchida
- Formatação da data usa padrão brasileiro (dd/MM/yyyy)

### 7. Retrocompatibilidade

As mudanças são totalmente retrocompatíveis:
- Propostas antigas continuam funcionando normalmente
- Campo `numeroConvidados` é opcional
- Se não preenchido, simplesmente não é exibido
