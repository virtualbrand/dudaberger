# Configuração de Analytics - Sistema de Avaliações

## Resumo das Mudanças

### 1. Reorganização de Páginas
- **`/dashboard`** → Agora mostra métricas e analytics (clicks em avaliações)
- **`/leads`** → Nova página com o conteúdo antigo do dashboard (Kanban de leads)

### 2. Sistema de Tracking de Avaliações
- **`/avalie`** → Página que registra o click e redireciona para Google Reviews
- Link de destino: `https://g.page/r/CVKX_W4zR5boEAE/review`

### 3. Dashboard de Analytics
O novo dashboard mostra:
- Total de clicks no link de avaliação
- Link para testar o sistema de avaliação

## Como Configurar

### Passo 1: Executar SQL no Supabase

1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Clique em **New Query**
5. Cole o conteúdo do arquivo `supabase-add-analytics.sql`
6. Clique em **Run** (ou pressione Ctrl+Enter)

O script irá criar:
- Tabela `analytics_events` para armazenar eventos
- Índices para otimizar consultas
- Políticas de segurança (RLS):
  - Qualquer pessoa pode inserir eventos (para tracking público)
  - Apenas usuários autenticados podem ler os dados

### Passo 2: Verificar a Criação da Tabela

Execute a seguinte query no SQL Editor para verificar:

```sql
SELECT * FROM analytics_events LIMIT 10;
```

### Passo 3: Testar o Sistema

1. Acesse `/avalie` no navegador
2. Você será redirecionado para o Google Reviews
3. O click será registrado na tabela `analytics_events`
4. Acesse `/dashboard` para ver o contador atualizado

## Estrutura de Navegação

O DashboardHeader agora possui 4 itens de menu:
- **Dashboard** → Métricas e analytics
- **Leads** → Kanban de gerenciamento de leads
- **Propostas** → Gerenciamento de propostas
- **Contratos** → Gerenciamento de contratos

## Estrutura da Tabela Analytics

```sql
analytics_events (
  id uuid PRIMARY KEY,
  event_type text NOT NULL,        -- Tipo do evento (ex: 'review_click')
  event_data jsonb,                 -- Dados adicionais em JSON
  ip_address text,                  -- IP do usuário (opcional)
  user_agent text,                  -- User agent do navegador
  created_at timestamptz            -- Data/hora do evento
)
```

## Próximos Passos (Futuro)

Você pode expandir o dashboard adicionando:
- Gráfico de clicks ao longo do tempo
- Métricas de conversão de leads
- Analytics de propostas enviadas
- Taxa de fechamento de contratos
- E mais...

## Troubleshooting

### Erro ao carregar estatísticas
- Verifique se a tabela `analytics_events` foi criada no Supabase
- Verifique as políticas RLS (Row Level Security)
- Confira o console do navegador para erros específicos

### Clicks não estão sendo registrados
- Verifique se a política de INSERT está ativa na tabela
- Confirme que o Supabase client está configurado corretamente
- Teste diretamente no SQL Editor com:
  ```sql
  INSERT INTO analytics_events (event_type, event_data)
  VALUES ('test', '{"test": true}');
  ```

### Dashboard mostra 0 clicks mesmo após testar
- Aguarde alguns segundos e recarregue a página
- Verifique se há erros no console
- Confirme que os eventos estão sendo salvos com `event_type = 'review_click'`
