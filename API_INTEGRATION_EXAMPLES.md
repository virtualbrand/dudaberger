/**
 * EXEMPLO DE INTEGRAÇÃO COM API
 * Este arquivo contém exemplos de como conectar o dashboard com um backend real
 */

import { CasamentoLead } from '@/types/casamento-lead';

// ============================================
// 1. CRIAR API ROUTES NO NEXT.JS
// ============================================

/**
 * Arquivo: src/app/api/leads/route.ts
 * 
 * GET /api/leads - Listar todos os leads
 * POST /api/leads - Criar novo lead
 */
/*
export async function GET() {
  try {
    // Conectar com seu banco de dados (MongoDB, PostgreSQL, etc.)
    const leads = await db.leads.findMany();
    
    return Response.json(leads);
  } catch (error) {
    return Response.json({ error: 'Erro ao buscar leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLead = await db.leads.create({ data: body });
    
    return Response.json(newLead, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Erro ao criar lead' }, { status: 500 });
  }
}
*/

/**
 * Arquivo: src/app/api/leads/[id]/route.ts
 * 
 * GET /api/leads/[id] - Buscar lead específico
 * PUT /api/leads/[id] - Atualizar lead
 * DELETE /api/leads/[id] - Deletar lead
 */
/*
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lead = await db.leads.findUnique({ where: { id: params.id } });
    
    if (!lead) {
      return Response.json({ error: 'Lead não encontrado' }, { status: 404 });
    }
    
    return Response.json(lead);
  } catch (error) {
    return Response.json({ error: 'Erro ao buscar lead' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedLead = await db.leads.update({
      where: { id: params.id },
      data: body,
    });
    
    return Response.json(updatedLead);
  } catch (error) {
    return Response.json({ error: 'Erro ao atualizar lead' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.leads.delete({ where: { id: params.id } });
    
    return Response.json({ message: 'Lead deletado com sucesso' });
  } catch (error) {
    return Response.json({ error: 'Erro ao deletar lead' }, { status: 500 });
  }
}
*/

// ============================================
// 2. CRIAR HOOKS PERSONALIZADOS
// ============================================

/**
 * Arquivo: src/hooks/useLeads.ts
 * 
 * Hook para gerenciar leads com SWR (recomendado) ou React Query
 */
/*
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLeads() {
  const { data, error, mutate } = useSWR<Record<string, CasamentoLead[]>>(
    '/api/leads',
    fetcher
  );

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      // Revalidar dados
      mutate();
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  return {
    leads: data,
    isLoading: !error && !data,
    isError: error,
    updateLeadStatus,
    refresh: mutate,
  };
}
*/

// ============================================
// 3. ATUALIZAR O COMPONENTE DO KANBAN
// ============================================

/**
 * Arquivo: src/components/dashboard/CasamentoLeadsKanban.tsx
 * 
 * Versão integrada com API
 */
/*
'use client';

import * as React from 'react';
import { useLeads } from '@/hooks/useLeads';
// ... outros imports

export default function CasamentoLeadsKanban() {
  const { leads, isLoading, isError, updateLeadStatus } = useLeads();
  const [columns, setColumns] = React.useState<Record<string, CasamentoLead[]>>(
    leads || mockLeads
  );

  // Sincronizar com dados da API
  React.useEffect(() => {
    if (leads) {
      setColumns(leads);
    }
  }, [leads]);

  // Handler para quando um card é movido
  const handleMove = async (event: KanbanMoveEvent) => {
    const { activeContainer, overContainer } = event;
    
    // Atualizar localmente primeiro (otimistic update)
    // ... código de atualização local
    
    // Sincronizar com o backend
    const leadId = event.event.active.id as string;
    await updateLeadStatus(leadId, overContainer);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar leads</div>;
  }

  return (
    <Kanban 
      value={columns} 
      onValueChange={setColumns} 
      getItemValue={(item) => item.id}
      onMove={handleMove}
    >
      // ... resto do código
    </Kanban>
  );
}
*/

// ============================================
// 4. EXEMPLO COM PRISMA (ORM RECOMENDADO)
// ============================================

/**
 * Arquivo: prisma/schema.prisma
 */
/*
model CasamentoLead {
  id               String   @id @default(cuid())
  nomeNoivo        String
  nomeNoiva        String
  email            String
  telefone         String
  dataCasamento    DateTime
  numeroConvidados Int
  orcamento        String
  observacoes      String?
  status           LeadStatus @default(NOVO)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

enum LeadStatus {
  NOVO
  CONTATO
  ORCAMENTO
  FECHADO
}
*/

/**
 * Arquivo: src/lib/prisma.ts
 */
/*
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
*/

// ============================================
// 5. WEBHOOK PARA RECEBER NOVOS LEADS
// ============================================

/**
 * Arquivo: src/app/api/webhooks/casamento/route.ts
 * 
 * Endpoint para receber dados do formulário de casamento
 */
/*
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.nomeNoivo || !body.nomeNoiva || !body.email) {
      return Response.json(
        { error: 'Dados incompletos' }, 
        { status: 400 }
      );
    }
    
    // Criar lead no banco
    const newLead = await prisma.casamentoLead.create({
      data: {
        nomeNoivo: body.nomeNoivo,
        nomeNoiva: body.nomeNoiva,
        email: body.email,
        telefone: body.telefone,
        dataCasamento: new Date(body.dataCasamento),
        numeroConvidados: parseInt(body.numeroConvidados),
        orcamento: body.orcamento,
        observacoes: body.observacoes,
        status: 'NOVO',
      },
    });
    
    // Opcional: Enviar notificação por email
    // await sendNotificationEmail(newLead);
    
    return Response.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return Response.json(
      { error: 'Erro ao processar requisição' }, 
      { status: 500 }
    );
  }
}
*/

// ============================================
// 6. AUTENTICAÇÃO COM NEXT-AUTH
// ============================================

/**
 * Arquivo: src/app/api/auth/[...nextauth]/route.ts
 */
/*
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verificar credenciais no banco de dados
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (user && await verifyPassword(credentials?.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
*/

// ============================================
// 7. PROTEGER ROTAS
// ============================================

/**
 * Arquivo: src/middleware.ts
 */
/*
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/leads/:path*'],
};
*/

export {};
