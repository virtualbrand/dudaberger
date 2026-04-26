import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, signer, signature } = body;

    if (!slug || !signer || !signature) {
      return NextResponse.json({ error: 'Dados obrigatórios ausentes' }, { status: 400 });
    }

    if (signer !== 'noiva' && signer !== 'noivo') {
      return NextResponse.json({ error: 'Signatário inválido' }, { status: 400 });
    }

    const supabase = getServiceRoleClient();

    const updateData =
      signer === 'noiva'
        ? { assinatura_noiva: signature }
        : { assinatura_noivo: signature };

    const { error } = await supabase
      .from('contratos')
      .update(updateData as any)
      .eq('slug', slug);

    if (error) {
      console.error('Supabase sign error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API sign error:', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
