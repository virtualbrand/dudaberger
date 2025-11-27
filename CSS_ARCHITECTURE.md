# 🎨 CSS Architecture - Duda Berger Design System

## 📐 Estrutura Otimizada

### ✅ Arquitetura Atual (Optimized & Clean)

```
src/app/
└── globals.css         ← Arquivo único consolidado
```

**Benefícios:**
- ✅ **Performance**: Um único arquivo CSS compilado
- ✅ **SEO**: Menos requisições HTTP
- ✅ **Manutenibilidade**: Tudo em um lugar, organizado por camadas
- ✅ **Tailwind v4**: Totalmente compatível com `@layer`
- ✅ **Hot Reload**: Mudanças instantâneas

### 📋 Organização do `globals.css`

```css
/* 1. IMPORTS */
@import "tailwindcss";
@font-face { ... }

/* 2. DESIGN TOKENS (@layer base) */
:root {
  --carbon-black: #1C1C1D;
  --bitter-chocolate: #703535;
  --lobster-pink: #D65B58;
  ...
}

/* 3. BASE STYLES (@layer base) */
html, body, typography, resets...

/* 4. COMPONENTS (@layer components) */
.btn-primary-md { ... }
.btn-secondary-xs-outline { ... }

/* 5. UTILITIES (@layer utilities) */
.will-change-transform { ... }
.scrollbar-hide { ... }
```

## 🎯 Design Tokens

### Cores Principais

| Token | Valor | Uso |
|-------|-------|-----|
| `--carbon-black` | #1C1C1D | Texto principal |
| `--bitter-chocolate` | #703535 | Texto secundário |
| `--lobster-pink` | #D65B58 | Destaques e CTAs |
| `--rosy-taupe` | #D1A09C | Elementos suaves |
| `--old-lace` | #F6EEE1 | Background |

### Cores Semânticas

| Token | Valor | Uso |
|-------|-------|-----|
| `--evergreen` | #183D32 | Sucesso |
| `--frosted-mint` | #DDF0CA | Sucesso suave |
| `--honey-bronze` | #EAA93A | Avisos |
| `--bronze` | #B87F32 | Alertas |

### Aliases Semânticos

```css
--text-primary: var(--carbon-black);
--text-secondary: var(--bitter-chocolate);
--bg-primary: var(--old-lace);
--white: #FFFFFF;
```

## 🔧 Sistema de Componentes

### Botões - 40 Variantes

**Nomenclatura:** `btn-{variant}-{size}-{style}`

**Variantes:** `primary`, `secondary`, `success`, `warning`, `danger`  
**Tamanhos:** `xs`, `sm`, `md`, `lg`  
**Estilos:** (filled) ou `-outline`

**Exemplos:**
```html
<!-- Filled -->
<button class="btn-primary-md">Primary Button</button>
<button class="btn-secondary-sm">Secondary Button</button>
<button class="btn-success-lg">Success Button</button>

<!-- Outline -->
<button class="btn-primary-xs-outline">Primary Outline</button>
<button class="btn-danger-md-outline">Danger Outline</button>
```

### Estrutura Interna

```css
@layer components {
  /* Base compartilhada */
  .btn-base {
    @apply inline-flex items-center justify-center;
    @apply rounded-full font-semibold cursor-pointer;
    @apply border-2 border-transparent;
    @apply transition-all duration-300;
  }

  /* Tamanhos */
  .btn-xs { @apply px-4 py-2 text-xs; }
  .btn-sm { @apply px-5 py-2.5 text-sm; }
  .btn-md { @apply px-6 py-3 text-base; }
  .btn-lg { @apply px-8 py-4 text-lg; }

  /* Variantes aplicam .btn-base + tamanho + cores */
}
```

## 🚀 Performance

### Otimizações Aplicadas

1. **Single CSS File**
   - Menos requisições HTTP
   - Bundle único minificado em produção

2. **Tailwind Layers**
   - `@layer base` → Reset e elementos base
   - `@layer components` → Componentes reutilizáveis
   - `@layer utilities` → Utilitários de baixo nível

3. **Critical CSS**
   - Apenas o necessário é carregado
   - Tree-shaking automático do Tailwind

4. **CSS Custom Properties**
   - Mudanças de tema sem recompilação
   - Melhor para SEO (menos CSS inline)

### Build de Produção

```bash
npm run build
```

**Resultado:**
- CSS minificado (~10KB gzipped)
- Apenas classes usadas
- Critical CSS inline
- Resto carregado async

## 📦 Comparação

### ❌ Antes (Múltiplos Arquivos)

```
globals.css
├── @import "./styles/variables.css"
├── @import "./styles/components.css"
├── @import "./styles/buttons.css"
└── @import "./styles/utilities.css"
```

**Problemas:**
- 5 arquivos CSS separados
- Ordem de importação crítica
- Conflitos entre arquivos
- Difícil debugar
- Mais lento para compilar

### ✅ Agora (Arquivo Único)

```
globals.css (único arquivo organizado)
├── @layer base
├── @layer components
└── @layer utilities
```

**Benefícios:**
- 1 arquivo CSS final
- Ordem garantida por @layer
- Sem conflitos
- Fácil manutenção
- Compilação mais rápida

## 🛠️ Como Usar

### 1. Importar no Layout

```tsx
// src/app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Usar Design Tokens

```css
/* Em qualquer componente */
.my-component {
  background-color: var(--old-lace);
  color: var(--text-primary);
  border: 1px solid var(--lobster-pink);
}
```

### 3. Usar Classes de Botão

```tsx
<button className="btn-primary-md">
  Clique Aqui
</button>

<button className="btn-secondary-sm-outline">
  Cancelar
</button>
```

### 4. Combinar com Tailwind

```tsx
<button className="btn-primary-md w-full mt-4 shadow-lg">
  Botão Full Width
</button>
```

## 📈 SEO Benefits

### 1. Menos Requisições HTTP
- Arquivo único = 1 request vs 5+
- Melhor First Contentful Paint (FCP)

### 2. CSS Crítico Otimizado
- Next.js extrai CSS crítico automaticamente
- Inline na `<head>` para LCP

### 3. Tamanho Reduzido
- Tree-shaking remove classes não usadas
- Minificação agressiva em prod

### 4. Cache Melhorado
- Um hash único para o CSS
- Menos invalidações de cache

## 🔍 Debugging

### Ver CSS Compilado

```bash
npm run build
# CSS compilado em .next/static/css/
```

### Ver Classes Aplicadas

```bash
# DevTools do Chrome
# Elements → Computed → Mostrar classes aplicadas
```

### Hot Reload

Qualquer mudança em `globals.css` recarrega instantaneamente.

## 📝 Melhores Práticas

### ✅ Faça

```css
/* Use design tokens */
.my-class {
  color: var(--text-primary);
}

/* Use @layer para organizar */
@layer components {
  .my-component { ... }
}

/* Combine com Tailwind */
<div className="btn-primary-md flex items-center gap-2">
```

### ❌ Evite

```css
/* NÃO use valores hardcoded */
.my-class {
  color: #1C1C1D; /* Use var(--carbon-black) */
}

/* NÃO crie arquivos CSS separados */
/* Adicione tudo em globals.css */

/* NÃO duplique estilos */
/* Reuse classes existentes ou tokens */
```

## 🎯 Roadmap

### Próximos Passos

- [ ] Adicionar mais design tokens (spacing, shadows)
- [ ] Criar componentes de formulário
- [ ] Adicionar animações globais
- [ ] Dark mode support (via CSS variables)

## 📚 Referências

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [CSS @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [Next.js CSS](https://nextjs.org/docs/app/building-your-application/styling)

---

**Versão**: 3.0.0 (Optimized)  
**Data**: Novembro 2025  
**Mantenedor**: Virtual Brand
