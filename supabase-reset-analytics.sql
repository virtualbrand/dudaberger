-- Limpar todos os clicks de avaliação registrados
DELETE FROM analytics_events WHERE event_type = 'review_click';

-- OU se quiser limpar TODOS os eventos (não apenas review_click):
-- DELETE FROM analytics_events;

-- Para verificar quantos registros restam:
-- SELECT event_type, COUNT(*) as total FROM analytics_events GROUP BY event_type;
