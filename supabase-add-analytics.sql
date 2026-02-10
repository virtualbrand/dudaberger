-- Tabela para rastrear analytics de eventos
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Índices para melhorar performance de queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_date ON analytics_events(event_type, created_at DESC);

-- RLS (Row Level Security) - somente leitura pública para inserção
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de qualquer pessoa
CREATE POLICY "Permitir inserção de eventos"
  ON analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Política para permitir leitura apenas de usuários autenticados
CREATE POLICY "Permitir leitura de eventos para usuários autenticados"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Comentários
COMMENT ON TABLE analytics_events IS 'Tabela para rastrear eventos de analytics como clicks em links';
COMMENT ON COLUMN analytics_events.event_type IS 'Tipo do evento (ex: review_click, link_click, etc)';
COMMENT ON COLUMN analytics_events.event_data IS 'Dados adicionais sobre o evento em formato JSON';
