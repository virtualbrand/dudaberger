# Dashboard de Leads - Duda Berger

## Visão Geral

Dashboard administrativo com kanban para gerenciar os leads de casamento recebidos através do formulário.

## Funcionalidades

### Kanban de Leads
- **4 Colunas de Status:**
  - 🆕 **Novos Leads**: Leads recém-chegados
  - 📞 **Em Contato**: Leads sendo contactados
  - 💰 **Orçamento Enviado**: Leads com proposta enviada
  - ✅ **Fechados**: Negócios concluídos

### Recursos do Kanban
- ✨ **Drag & Drop**: Arraste os cards entre as colunas para atualizar o status
- 🎨 **Cores por Status**: Cada coluna tem uma cor identificadora
- 📊 **Contador**: Mostra a quantidade de leads em cada coluna
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### Informações dos Leads
Cada card exibe:
- 👥 Nomes dos noivos
- 📅 Data do casamento
- 👨‍👩‍👧‍👦 Número de convidados
- 💵 Faixa de orçamento
- 📧 Email de contato
- 📱 Telefone
- 🕐 Data/hora de criação

## Acesso

### Login
1. Acesse `/login`
2. Entre com suas credenciais de colaborador interno

### Dashboard
- Após o login, você será redirecionado para `/dashboard`
- Lá você terá acesso ao kanban completo de leads

## Estrutura de Arquivos

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Página principal do dashboard
│   └── login/
│       └── page.tsx              # Página de login
├── components/
│   ├── dashboard/
│   │   └── CasamentoLeadsKanban.tsx  # Componente do kanban
│   ├── pages/
│   │   └── login/
│   │       └── LoginForm.tsx     # Formulário de login
│   └── ui/
│       ├── kanban.tsx            # Componente base do kanban
│       ├── avatar.tsx            # Avatar dos leads
│       ├── badge-2.tsx           # Badges para contadores
│       └── button-1.tsx          # Botões do sistema
└── types/
    └── casamento-lead.ts         # Tipagem dos leads
```

## Tecnologias Utilizadas

- ⚛️ **Next.js 15** com App Router
- 🎨 **Tailwind CSS 4** para estilização
- 🎭 **shadcn/ui** para componentes
- 🖱️ **@dnd-kit** para drag and drop
- 📅 **date-fns** para formatação de datas
- 🎯 **TypeScript** para type safety

## Próximos Passos

### Integração com Backend
Atualmente o kanban usa dados mockados. Para integrar com um backend real:

1. **Criar API Routes** em `src/app/api/leads/`
2. **Conectar com banco de dados** (MongoDB, PostgreSQL, etc.)
3. **Adicionar autenticação real** no login
4. **Implementar CRUD completo** de leads

### Funcionalidades Futuras
- 🔍 Busca e filtros de leads
- 📝 Modal de detalhes/edição do lead
- 🔔 Notificações de novos leads
- 📊 Dashboard com estatísticas
- 📧 Integração com email marketing
- 📱 Notificações push
- 💬 Sistema de comentários/notas nos leads
- 📎 Upload de arquivos (contratos, fotos, etc.)
- 📈 Relatórios e métricas

## Exemplo de Uso

```tsx
// Atualizar status de um lead via drag & drop
// O componente já cuida disso automaticamente!

// Para adicionar novos leads programaticamente:
const novoLead: CasamentoLead = {
  id: '6',
  nomeNoivo: 'João',
  nomeNoiva: 'Maria',
  email: 'contato@email.com',
  telefone: '(11) 99999-9999',
  dataCasamento: '2025-09-15',
  numeroConvidados: 150,
  orcamento: 'R$ 15.000 - R$ 20.000',
  status: 'novo',
  createdAt: new Date().toISOString(),
};
```

## Design System

O dashboard segue o design system da Duda Berger:
- 🎨 **Cores principais**: `#703535` (marrom) e `#F6EEE1` (bege)
- 🔤 **Fonte display**: Unbounded (títulos)
- 📝 **Fonte texto**: KumbhSans (corpo)

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
