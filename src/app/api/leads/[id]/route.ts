import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID do lead não informado' }, { status: 400 });
    }

    const body = await request.json();

    const supabase = getServiceRoleClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(lead, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
