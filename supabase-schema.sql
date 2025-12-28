-- Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informações dos noivos
  nome_noivo VARCHAR(255),
  nome_noiva VARCHAR(255),
  
  -- Contato
  email VARCHAR(255),
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  
  -- Detalhes do evento
  data_casamento DATE,
  local_evento VARCHAR(255),
  numero_convidados INTEGER,
  
  -- Preferências
  tipo_bolo VARCHAR(50), -- 'tradicional', 'naked', 'flores', etc
  sabor_preferido VARCHAR(100),
  cor_predominante VARCHAR(50),
  estilo VARCHAR(50), -- 'classico', 'rustico', 'moderno', etc
  
  -- Orçamento
  orcamento_minimo DECIMAL(10,2),
  orcamento_maximo DECIMAL(10,2),
  
  -- Status no funil
  status VARCHAR(50) DEFAULT 'lead', -- 'lead', 'proposta_enviada', 'proposta_aceita', 'contrato'
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dados extras (JSON para flexibilidade)
  dados_extras JSONB DEFAULT '{}'::jsonb
);

-- Criar tabela de propostas
CREATE TABLE IF NOT EXISTS propostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Detalhes da proposta
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  slug VARCHAR(255) UNIQUE, -- URL amigável para página pública (ex: casal-joao-maria)
  
  -- Valores
  valor_total DECIMAL(10,2) NOT NULL,
  valor_entrada DECIMAL(10,2),
  forma_pagamento VARCHAR(100),
  
  -- Itens da proposta (JSON para flexibilidade)
  itens JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  status VARCHAR(50) DEFAULT 'enviada', -- 'enviada', 'aceita', 'rejeitada', 'expirada'
  
  -- Data de validade
  validade_ate DATE,
  
  -- Arquivos anexos
  arquivos JSONB DEFAULT '[]'::jsonb,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  enviada_em TIMESTAMP WITH TIME ZONE,
  respondida_em TIMESTAMP WITH TIME ZONE,
  
  -- Observações
  observacoes TEXT
);

-- Criar tabela de contratos
CREATE TABLE IF NOT EXISTS contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  proposta_id UUID REFERENCES propostas(id) ON DELETE SET NULL,
  
  -- Informações do contrato
  numero_contrato VARCHAR(50) UNIQUE NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  
  -- Valores
  valor_total DECIMAL(10,2) NOT NULL,
  valor_pago DECIMAL(10,2) DEFAULT 0,
  valor_pendente DECIMAL(10,2) NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'concluido', 'cancelado'
  
  -- Datas importantes
  data_assinatura DATE NOT NULL,
  data_inicio DATE NOT NULL,
  data_entrega DATE NOT NULL,
  data_conclusao DATE,
  
  -- Termos e condições
  termos TEXT,
  clausulas JSONB DEFAULT '[]'::jsonb,
  
  -- Pagamentos
  pagamentos JSONB DEFAULT '[]'::jsonb,
  
  -- Arquivos
  arquivo_contrato_url TEXT,
  arquivos_anexos JSONB DEFAULT '[]'::jsonb,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Observações
  observacoes TEXT
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_propostas_lead_id ON propostas(lead_id);
CREATE INDEX IF NOT EXISTS idx_propostas_status ON propostas(status);
CREATE INDEX IF NOT EXISTS idx_propostas_slug ON propostas(slug);
CREATE INDEX IF NOT EXISTS idx_contratos_lead_id ON contratos(lead_id);
CREATE INDEX IF NOT EXISTS idx_contratos_proposta_id ON contratos(proposta_id);
CREATE INDEX IF NOT EXISTS idx_contratos_numero ON contratos(numero_contrato);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_propostas_updated_at
  BEFORE UPDATE ON propostas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contratos_updated_at
  BEFORE UPDATE ON contratos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE propostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso (permitir tudo para usuários autenticados)
-- Políticas para leads
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados" ON leads;
CREATE POLICY "Usuários autenticados podem ver todos os leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem inserir leads" ON leads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem atualizar leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem deletar leads" ON leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para propostas
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados" ON propostas;
CREATE POLICY "Usuários autenticados podem ver todas as propostas" ON propostas
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem inserir propostas" ON propostas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem atualizar propostas" ON propostas
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem deletar propostas" ON propostas
  FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para contratos
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados" ON contratos;
CREATE POLICY "Usuários autenticados podem ver todos os contratos" ON contratos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem inserir contratos" ON contratos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem atualizar contratos" ON contratos
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários autenticados podem deletar contratos" ON contratos
  FOR DELETE USING (auth.role() = 'authenticated');

-- Comentários nas tabelas
COMMENT ON TABLE leads IS 'Tabela de leads/clientes potenciais';
COMMENT ON TABLE propostas IS 'Tabela de propostas comerciais enviadas aos leads';
COMMENT ON TABLE contratos IS 'Tabela de contratos fechados';
