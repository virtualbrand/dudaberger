# 🎯 Guia Rápido - Dashboard Duda Berger

## ✅ O que foi criado

### 1. **Tela de Login** (`/login`)
- Formulário de autenticação para colaboradores internos
- Design consistente com a marca (background da página de casamento)
- Campos: E-mail e Senha
- Pronto para integração com backend

### 2. **Dashboard** (`/dashboard`)
- Header com logo, notificações e botão de logout
- Kanban completo para gerenciar leads de casamento
- 4 colunas de status: Novos, Em Contato, Orçamento, Fechados
- Drag & Drop funcional entre colunas
- Cards informativos com todos os dados dos leads
- Design responsivo (mobile, tablet, desktop)
- Loading state

### 3. **Componentes UI**
- ✅ `kanban.tsx` - Sistema completo de kanban com drag & drop
- ✅ `avatar.tsx` - Avatares para os leads
- ✅ `badge-2.tsx` - Badges para contadores
- ✅ `button-1.tsx` - Sistema de botões

### 4. **Tipos e Dados**
- ✅ `casamento-lead.ts` - Interface TypeScript dos leads
- ✅ `mock-leads.ts` - Dados de exemplo + helpers úteis
- ✅ Funções helper para CRUD de leads

### 5. **Documentação**
- ✅ `DASHBOARD_README.md` - Documentação completa
- ✅ `API_INTEGRATION_EXAMPLES.md` - Exemplos de integração com backend

## 🚀 Como testar

1. **Iniciar o servidor de desenvolvimento:**
```bash
npm run dev
```

2. **Acessar o login:**
```
http://localhost:3000/login
```

3. **Acessar o dashboard diretamente:**
```
http://localhost:3000/dashboard
```

## 🎨 Funcionalidades do Kanban

### Drag & Drop
- Arraste os cards entre as colunas para mudar o status
- Funciona em desktop e mobile (toque e arraste)

### Informações dos Leads
Cada card mostra:
- 👥 Nomes dos noivos (avatar com iniciais)
- 📅 Data do casamento (formatada em português)
- 👨‍👩‍👧‍👦 Número de convidados
- 💵 Faixa de orçamento
- 📧 Email de contato
- 📱 Telefone
- 🕐 Data/hora de criação do lead

### Cores por Coluna
- 🔵 **Novos Leads**: Azul claro
- 🟡 **Em Contato**: Amarelo claro
- 🟣 **Orçamento**: Roxo claro
- 🟢 **Fechados**: Verde claro

## 📝 Próximos passos para produção

### 1. Autenticação
```bash
npm install next-auth
```
Implementar login real com NextAuth.js (ver `API_INTEGRATION_EXAMPLES.md`)

### 2. Banco de Dados
Opções recomendadas:
- **Prisma** + PostgreSQL (recomendado)
- **MongoDB** com Mongoose
- **Supabase** (backend as a service)

### 3. API Routes
Criar endpoints em `src/app/api/`:
- `GET /api/leads` - Listar leads
- `POST /api/leads` - Criar lead
- `PUT /api/leads/[id]` - Atualizar lead
- `DELETE /api/leads/[id]` - Deletar lead

### 4. Conectar Formulário de Casamento
Atualizar `src/app/casamento/page.tsx` para enviar dados para a API ao invés de apenas console.log

### 5. Notificações
Adicionar notificações quando:
- Novo lead chegar
- Lead mudar de status
- Lead há muito tempo sem atualização

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilização
- **@dnd-kit** - Drag and drop
- **date-fns** - Formatação de datas
- **Radix UI** - Componentes acessíveis
- **shadcn/ui** - Sistema de componentes

## 📦 Dependências Instaladas

```json
{
  "@dnd-kit/core": "^latest",
  "@dnd-kit/sortable": "^latest",
  "@dnd-kit/utilities": "^latest",
  "radix-ui": "^latest"
}
```

## 🎯 Estrutura de Pastas

```
src/
├── app/
│   ├── dashboard/          # Dashboard principal
│   │   ├── page.tsx       # Página do dashboard
│   │   └── loading.tsx    # Loading state
│   └── login/             # Sistema de login
│       └── page.tsx       # Página de login
├── components/
│   ├── dashboard/         # Componentes do dashboard
│   │   └── CasamentoLeadsKanban.tsx
│   ├── pages/
│   │   └── login/         # Componentes de login
│   │       └── LoginForm.tsx
│   └── ui/                # Componentes UI reutilizáveis
│       ├── kanban.tsx
│       ├── avatar.tsx
│       ├── badge-2.tsx
│       └── button-1.tsx
├── data/
│   └── mock-leads.ts      # Dados mockados + helpers
└── types/
    └── casamento-lead.ts  # Tipos TypeScript
```

## 💡 Dicas

1. **Dados Mockados**: O dashboard usa dados de exemplo. Para produção, conecte com uma API real.

2. **Helpers Disponíveis**: Use as funções em `mock-leads.ts`:
   - `createLead()` - Criar novo lead
   - `updateLeadStatus()` - Atualizar status
   - `deleteLead()` - Deletar lead
   - `searchLeads()` - Buscar leads

3. **Personalização**: Todas as cores e estilos seguem o design system da marca e podem ser ajustados no `globals.css`.

4. **Performance**: O kanban é otimizado e funciona bem mesmo com centenas de leads.

## 🐛 Troubleshooting

### Erro de drag and drop?
- Certifique-se que as dependências do @dnd-kit estão instaladas
- Limpe o cache: `npm run dev -- --turbo`

### Estilos não carregando?
- Verifique se `globals.css` está importado no `layout.tsx`
- Restart do servidor de desenvolvimento

### TypeScript errors?
- Execute: `npm run build` para verificar erros
- Verifique os tipos em `casamento-lead.ts`

## 📚 Recursos Adicionais

- [Next.js Docs](https://nextjs.org/docs)
- [dnd-kit Docs](https://docs.dndkit.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Desenvolvido para Duda Berger** 🎂
