-- ============================================================
-- FIX: Remoção completa de CASCADE DELETE
--
-- Regras de independência:
--   - Deletar lead NÃO apaga propostas/contratos
--   - Deletar proposta NÃO apaga contratos
--   - Galeria é completamente independente (sem FK)
--
-- Execute no Supabase SQL Editor.
-- ============================================================

-- 1. propostas.lead_id → SET NULL ao deletar lead
ALTER TABLE propostas
  DROP CONSTRAINT IF EXISTS propostas_lead_id_fkey;

ALTER TABLE propostas
  ADD CONSTRAINT propostas_lead_id_fkey
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL;

-- 2. contratos.lead_id → SET NULL ao deletar lead
ALTER TABLE contratos
  DROP CONSTRAINT IF EXISTS contratos_lead_id_fkey;

ALTER TABLE contratos
  ADD CONSTRAINT contratos_lead_id_fkey
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL;

-- 3. contratos.proposta_id → SET NULL ao deletar proposta
--    (já era SET NULL no schema original, mas garantimos aqui)
ALTER TABLE contratos
  DROP CONSTRAINT IF EXISTS contratos_proposta_id_fkey;

ALTER TABLE contratos
  ADD CONSTRAINT contratos_proposta_id_fkey
  FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE SET NULL;
