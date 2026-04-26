import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      propostaId,
      leadId,
      titulo,
      valorTotal,
      dataEvento,
      localFesta,
      numeroConvidados,
      descricao,
      dataContrato,
      nomeNoivo,
      cpfNoivo,
      nomeNoiva,
      cpfNoiva,
      endereco,
    } = body;

    if (!nomeNoivo || !cpfNoivo || !nomeNoiva || !cpfNoiva || !endereco) {
      return NextResponse.json({ error: 'Dados obrigatórios ausentes' }, { status: 400 });
    }

    const supabase = getServiceRoleClient();

    // Resolve lead_id: usa o da proposta, busca existente, ou cria um novo
    let resolvedLeadId = leadId;
    if (!resolvedLeadId) {
      const { data: leads } = await supabase
        .from('leads')
        .select('id')
        .limit(1);
      resolvedLeadId = leads?.[0]?.id ?? null;
    }

    if (!resolvedLeadId) {
      // Cria um lead automaticamente com o nome do casal
      const partes = (titulo ?? '').split(/[&e]/i).map((s: string) => s.trim());
      const { data: novoLead, error: leadError } = await supabase
        .from('leads')
        .insert({
          nome_noivo: partes[0] ?? titulo ?? 'Noivo',
          nome_noiva: partes[1] ?? null,
          status: 'contrato',
        })
        .select('id')
        .single();

      if (leadError || !novoLead) {
        console.error('Erro ao criar lead:', leadError);
        return NextResponse.json({ error: 'Não foi possível criar o lead' }, { status: 500 });
      }
      resolvedLeadId = novoLead.id;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const numeroContrato = `CONT-${Date.now()}`;

    // Garantir descrição: usa a enviada pelo client, ou busca direto da proposta no banco
    let resolvedDescricao = descricao ?? null;
    if (!resolvedDescricao && propostaId) {
      const { data: propostaData } = await supabase
        .from('propostas')
        .select('descricao')
        .eq('id', propostaId)
        .single();
      resolvedDescricao = propostaData?.descricao ?? null;
    }

    const { data, error } = await supabase
      .from('contratos')
      .insert({
        lead_id: resolvedLeadId,
        proposta_id: propostaId ?? null,
        numero_contrato: numeroContrato,
        titulo: titulo ?? 'Contrato',
        slug: titulo
          ? titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
          : `contrato-${Date.now()}`,
        valor_total: valorTotal ?? 0,
        valor_pago: 0,
        valor_pendente: valorTotal ?? 0,
        status: 'rascunho',
        data_assinatura: hoje,
        data_inicio: hoje,
        data_entrega: dataEvento ?? hoje,
        data_evento: dataEvento ?? null,
        data_contrato: dataContrato ?? hoje,
        local_festa: localFesta ?? null,
        numero_convidados: numeroConvidados ?? null,
        descricao: resolvedDescricao,
        nome_noivo: nomeNoivo.trim(),
        cpf_noivo: cpfNoivo.trim(),
        nome_noiva: nomeNoiva.trim(),
        cpf_noiva: cpfNoiva.trim(),
        endereco: endereco.trim(),
      } as any)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, contratoId: data.id });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
