import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Registra analytics em background (não espera)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fire and forget - não espera completar
    try {
      await supabase.from('analytics_events').insert({
        event_type: 'review_click',
        event_data: {
          source: 'avalie_route',
          timestamp: new Date().toISOString(),
        },
        user_agent: request.headers.get('user-agent') || '',
      });
    } catch {}
  }
  
  // Redirect imediato para URL externa
  return Response.redirect('https://g.page/r/CVKX_W4zR5boEAE/review', 307);
}
