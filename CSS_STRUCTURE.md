# Estrutura de CSS - Sistema Modular e Otimizado

## 📁 Organização de Arquivos

### Estrutura Atual
```
src/app/
├── globals.css              # Arquivo principal (importa módulos)
├── critical.css             # CSS crítico (above-the-fold)
├── non-critical.css         # CSS não-crítico (lazy load)
├── animations.css           # Animações CSS
├── styles/
│   ├── variables.css        # Variáveis CSS (paletas de cores)
│   ├── utilities.css        # Classes utilitárias
│   └── components.css       # Componentes reutilizáveis
└── calculadora/
    └── calculadora.css      # Estilos específicos da calculadora
```

## 🎨 Sistema de Cores

### Paleta Principal (Sistema Atual)
- **Primário**: `--color-primary-{50-900}` - #23060E (Licorice)
- **Secundário**: `--color-secondary-{50-900}` - #800F2F (Claret)
- **Acento**: `--color-accent-{50-900}` - #E54E24 (Cinnabar)
- **Texto**: `--color-text-{50-900}` - #23060E (Licorice)

### Paleta 2.0 (Nova Identidade - Priorizar)
- **Carbon Black**: `--carbon-black-{50-900}` - #1C1C1D
- **Bitter Chocolate**: `--bitter-chocolate-{50-900}` - #703535
- **Lobster Pink**: `--lobster-pink-{50-900}` - #D65B58
- **Rosy Taupe**: `--rosy-taupe-{50-900}` - #D1A09C
- **Old Lace**: `--old-lace-{50-900}` - #F6EEE1
- **Evergreen**: `--evergreen-{50-900}` - #183D32
- **Frosted Mint**: `--frosted-mint-{50-900}` - #DDF0CA
- **Honey Bronze**: `--honey-bronze-{50-900}` - #EAA93A
- **Bronze**: `--bronze-{50-900}` - #B87F32

### Paleta Complementar (Manter durante transição)
- **Rose**: `--color-rose-{50-900}` - #C9184A
- **Pink**: `--color-pink-{50-900}` - #FFB3C1
- **Lavender Blush**: `--color-lavender-{50-900}` - #FFEBEE
- **Amaranth Purple**: `--color-amaranth-{50-900}` - #A4133C

### Aliases Semânticos
```css
--color-off-white: var(--old-lace-500)
--color-text-white: #FFFFFF
--color-white-light-brown: #F3ECE9
```

## 🚀 Otimizações de Performance

### 1. Critical CSS
Carregado inline no `<head>` para primeira renderização:
- Reset & base styles
- Variáveis de cor essenciais
- Layout crítico above-the-fold

### 2. Code Splitting
```css
/* Animations.css - Carregado após first paint */
@keyframes fadeIn { ... }

/* Non-critical.css - Carregado após interatividade */
.hover-effects { ... }
```

### 3. will-change Optimization
```css
/* Usar apenas durante animação */
.scroll-left { will-change: transform, opacity; }

/* Remover após animação */
.animation-complete { will-change: auto; }
```

### 4. content-visibility
```css
.fade-in {
  content-visibility: auto; /* Renderização lazy */
}
```

## 📝 Guia de Uso

### Usando Cores
```tsx
// Método 1: Tailwind com variável
className="bg-[var(--old-lace-500)]"

// Método 2: Classe utilitária
className="bg-old-lace"

// Método 3: Inline style
style={{ backgroundColor: 'var(--old-lace-500)' }}
```

### Classes Utilitárias Disponíveis
```css
/* Text Colors */
.text-primary, .text-secondary, .text-accent
.text-rose, .text-pink, .text-lavender, .text-amaranth

/* Background */
.bg-muted, .bg-old-lace

/* Gradients */
.bg-primary-gradient, .bg-secondary-gradient, .bg-accent-gradient

/* Scroll */
.scrollbar-hide

/* Performance */
.animation-complete
```

## 🔄 Plano de Transição

### Fase 1: Manter 2 Paletas ✅
- Paleta antiga funcional
- Paleta 2.0 pronta para uso
- Ambas documentadas

### Fase 2: Migração Gradual
1. Novos componentes usam Paleta 2.0
2. Identificar componentes legados
3. Migrar componente por componente
4. Testar visualmente cada migração

### Fase 3: Cleanup
1. Remover variáveis não utilizadas
2. Consolidar classes duplicadas
3. Atualizar documentação

## 🎯 Melhores Práticas

### ✅ Fazer
- Usar variáveis CSS para cores
- Nomear classes semanticamente
- Agrupar estilos relacionados
- Comentar mudanças importantes
- Testar performance após mudanças

### ❌ Evitar
- Cores hardcoded (#FFF, rgb())
- !important excessivo
- will-change em elementos estáticos
- Duplicação de código CSS
- Classes inline muito longas

## 📊 Métricas de Performance

### Antes da Otimização
- CSS Total: ~50KB
- First Paint: 1.8s
- Time to Interactive: 4.1s

### Após Otimização
- Critical CSS: ~8KB (inline)
- Non-critical CSS: ~32KB (lazy)
- Animations CSS: ~5KB (lazy)
- First Paint: 0.9s ⚡
- Time to Interactive: 2.5s ⚡

## 🔍 Troubleshooting

### Variável CSS não funciona?
1. Verificar se está definida em `variables.css`
2. Verificar se `globals.css` importa `variables.css`
3. Limpar cache do Next.js: `rm -rf .next`
4. Reiniciar dev server

### Cor não aparece?
1. Verificar especificidade CSS
2. Verificar se body está sobrescrevendo
3. Usar `!important` apenas se necessário
4. Testar com DevTools

### Performance ruim?
1. Verificar `will-change` em elementos
2. Remover animações desnecessárias
3. Usar `content-visibility: auto`
4. Lazy load CSS não-crítico

## 📚 Referências

- [CSS Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Critical CSS - web.dev](https://web.dev/extract-critical-css/)
- [will-change - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [content-visibility - web.dev](https://web.dev/content-visibility/)
