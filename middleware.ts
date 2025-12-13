import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Se está tentando acessar rota protegida
  if (isProtectedRoute) {
    // Procura por cookies do Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Extrai o identificador do projeto do URL
    const projectRef = supabaseUrl.split('//')[1].split('.')[0];
    
    // Procura pelo cookie de autenticação do Supabase
    const authCookie = req.cookies.get(`sb-${projectRef}-auth-token`);
    
    if (!authCookie) {
      // Não há cookie de autenticação, redireciona para login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verifica se o cookie tem um token válido
    try {
      const authData = JSON.parse(authCookie.value);
      if (!authData.access_token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      // Erro ao parsear o cookie, redireciona para login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Se está logado e tenta acessar a página de login
  if (req.nextUrl.pathname === '/login') {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const projectRef = supabaseUrl.split('//')[1].split('.')[0];
      const authCookie = req.cookies.get(`sb-${projectRef}-auth-token`);
      
      if (authCookie) {
        try {
          const authData = JSON.parse(authCookie.value);
          if (authData.access_token) {
            // Usuário já está logado, redireciona para dashboard
            return NextResponse.redirect(new URL('/dashboard', req.url));
          }
        } catch (error) {
          // Cookie inválido, permite acesso à página de login
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
