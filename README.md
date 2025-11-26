# Duda Berger - Website Oficial

Website oficial de Duda Berger, mentora e confeiteira especializada em ensinar confeiteiras a transformarem seu talento em um negócio lucrativo e organizado.

## 🍰 Sobre o Projeto

Este é o website oficial que abriga todas as páginas e landing pages dos produtos e serviços oferecidos por Duda Berger, incluindo:

- **Workshop "Do ZERO aos R$ 5.000/mês com Confeitaria"** - Treinamento intensivo para confeiteiras iniciantes
- **Presets "Efeito Água na Boca"** - Filtros fotográficos especializados para confeitaria
- **Calculadora de Precificação** - Ferramenta gratuita para precificar produtos de confeitaria
- **Página de Links** - Hub centralizado com todos os links importantes
- **Produtos Sazonais** - Como a Guirlanda de Natal e outros produtos específicos

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com SSR e SSG
- **React 19** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para maior robustez
- **Tailwind CSS 4** - Framework de CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **GSAP** - Animações avançadas e efeitos visuais
- **Lenis** - Smooth scroll performance-optimized
- **Lucide React** - Ícones leves e modernos

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (botões, cards, etc.)
│   ├── blocks/          # Blocos de componentes específicos
│   └── pages/           # Componentes específicos por página
├── pages/               # Páginas principais do website
├── data/                # Configurações e dados estáticos
├── hooks/               # Custom hooks (animações, efeitos)
└── lib/                 # Utilitários e helpers
```

## 🛠 Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em ambiente de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview

# Analisar bundle
npm run analyze
```

## 📱 Páginas Disponíveis

- **/** - Página inicial
- **/workshop-confeitaria-casa** - Landing page do workshop
- **/efeito-agua-na-boca** - Landing page dos presets fotográficos
- **/calculadora** - Calculadora de precificação gratuita
- **/links** - Página de links centralizados
- **/casamento** - Formulário para orçamentos de casamento
- **/guirlanda-natal** - Produto sazonal de Natal

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:
- **Paleta de cores** personalizada focada em tons de amaranto e rosa
- **Tipografia** otimizada para conversão
- **Componentes** reutilizáveis e acessíveis
- **Animações** sutis que melhoram a experiência do usuário

## 📊 SEO e Performance

- Meta tags otimizadas para cada página
- Schema markup para melhor indexação
- Sitemap automatizado
- Imagens otimizadas e lazy loading
- Core Web Vitals otimizados

## 🌐 Deploy

O projeto está configurado para deploy automático na Vercel com as seguintes funcionalidades:
- Build automático do TypeScript
- Otimização de imagens
- Geração automática de sitemap
- Suporte a múltiplas páginas (SPA)
