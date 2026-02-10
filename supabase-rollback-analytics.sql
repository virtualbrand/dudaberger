-- Rollback: Remove a tabela analytics_events e tudo relacionado

-- Remove as políticas RLS
DROP POLICY IF EXISTS "Permitir inserção de eventos" ON analytics_events;
DROP POLICY IF EXISTS "Permitir leitura de eventos para usuários autenticados" ON analytics_events;

-- Remove os índices
DROP INDEX IF EXISTS idx_analytics_events_type;
DROP INDEX IF EXISTS idx_analytics_events_created_at;
DROP INDEX IF EXISTS idx_analytics_events_type_date;

-- Remove a tabela
DROP TABLE IF EXISTS analytics_events;
