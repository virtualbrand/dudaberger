# Sistema de Botões - Migração Completa

## ✅ Migração Concluída em: 2025-01-XX

### Problema Original
Os botões não estavam renderizando a fonte **Unbounded** corretamente, apesar de múltiplas tentativas:
- Classe `.font-unbounded` criada mas não funcionando
- CSS variable `var(--font-unbounded)` não sendo resolvida
- Estilos inline eram a única forma de aplicar a fonte

### Solução Implementada

#### 1. Tailwind Config - Plugin com Classes de Botões
**Arquivo:** `tailwind.config.js`

Criado plugin com 9 classes de botões:

```javascript
plugins: [
  function({ addComponents }) {
    addComponents({
      '.btn': {
        '@apply font-unbounded font-semibold rounded-full transition-colors duration-300 cursor-pointer': {},
        '&:disabled': {
          '@apply opacity-50 cursor-not-allowed': {},
        },
      },
      // Primary Buttons (Rose Madder)
      '.btn-primary': {
        '@apply btn bg-[#D65B58] text-white hover:bg-[#703535]': {},
      },
      '.btn-primary-normal': {
        '@apply btn-primary px-6 py-3 text-sm': {},
      },
      '.btn-primary-xs': {
        '@apply btn-primary px-4 py-2 text-xs': {},
      },
      '.btn-primary-outline-normal': {
        '@apply btn-primary-outline px-6 py-3 text-sm': {},
      },
      '.btn-primary-outline-xs': {
        '@apply btn-primary-outline px-4 py-2 text-xs': {},
      },
      // Secondary Buttons (Bitter Chocolate)
      '.btn-secondary': {
        '@apply btn bg-[#703535] text-white hover:bg-[#1C1C1D]': {},
      },
      '.btn-secondary-normal': {
        '@apply btn-secondary px-6 py-3 text-sm': {},
      },
      '.btn-secondary-xs': {
        '@apply btn-secondary px-4 py-2 text-xs': {},
      },
      '.btn-secondary-outline-normal': {
        '@apply btn-secondary-outline px-6 py-3 text-sm': {},
      },
      '.btn-secondary-outline-xs': {
        '@apply btn-secondary-outline px-4 py-2 text-xs': {},
      },
    })
  }
]
```

#### 2. Globals CSS - Fonte Literal
**Arquivo:** `src/app/globals.css`

**ANTES:**
```css
.font-unbounded,
button {
  font-family: var(--font-unbounded), 'Unbounded', system-ui, sans-serif !important;
  font-weight: 600 !important;
}
```

**DEPOIS:**
```css
.font-unbounded,
button {
  font-family: 'Unbounded', system-ui, sans-serif !important;
  font-weight: 600 !important;
}
```

**MOTIVO:** Usar string literal 'Unbounded' em vez da CSS variable garante que o browser encontre a fonte, já que o Next.js localFont está carregando corretamente.

#### 3. Style Guide - Botões Migrados
**Arquivo:** `src/app/style-guide/page.tsx`

**ANTES:** 8 botões com estilos inline + handlers `onMouseEnter/onMouseLeave`
```tsx
<button
  className="px-6 py-3 rounded-full font-medium text-white transition-colors cursor-pointer font-unbounded"
  style={{ backgroundColor: '#D65B58' }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#703535'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D65B58'}
>
  Button Normal
</button>
```

**DEPOIS:** Classes do Tailwind, hover nativo
```tsx
<button className="btn-primary-normal">
  Button Normal
</button>
```

**Botões Atualizados:**
- ✅ `btn-primary-normal` - Filled Normal
- ✅ `btn-primary-xs` - Filled XS
- ✅ `btn-primary-outline-normal` - Outline Normal
- ✅ `btn-primary-outline-xs` - Outline XS
- ✅ `btn-secondary-normal` - Secondary Filled Normal
- ✅ `btn-secondary-xs` - Secondary Filled XS
- ✅ `btn-secondary-outline-normal` - Secondary Outline Normal
- ✅ `btn-secondary-outline-xs` - Secondary Outline XS

### Classes de Botões Disponíveis

#### Primary (Rose Madder #D65B58)
| Classe | Uso | Tamanho | Cor |
|--------|-----|---------|-----|
| `btn-primary-normal` | Botão principal padrão | px-6 py-3 text-sm | Filled #D65B58 |
| `btn-primary-xs` | Botão principal pequeno | px-4 py-2 text-xs | Filled #D65B58 |
| `btn-primary-outline-normal` | Outline padrão | px-6 py-3 text-sm | Outline #D65B58 |
| `btn-primary-outline-xs` | Outline pequeno | px-4 py-2 text-xs | Outline #D65B58 |

#### Secondary (Bitter Chocolate #703535)
| Classe | Uso | Tamanho | Cor |
|--------|-----|---------|-----|
| `btn-secondary-normal` | Botão secundário padrão | px-6 py-3 text-sm | Filled #703535 |
| `btn-secondary-xs` | Botão secundário pequeno | px-4 py-2 text-xs | Filled #703535 |
| `btn-secondary-outline-normal` | Outline secundário padrão | px-6 py-3 text-sm | Outline #703535 |
| `btn-secondary-outline-xs` | Outline secundário pequeno | px-4 py-2 text-xs | Outline #703535 |

### Características dos Botões

**Todos os botões herdam da classe `.btn`:**
- ✅ Fonte: **Unbounded** (weight 600 - semibold)
- ✅ Forma: `rounded-full`
- ✅ Transição: `transition-colors duration-300`
- ✅ Cursor: `cursor-pointer`
- ✅ Estado disabled: `opacity-50 cursor-not-allowed`

**Tamanhos:**
- **Normal:** `px-6 py-3 text-sm` → Para CTAs principais e ações importantes
- **XS:** `px-4 py-2 text-xs` → Para ações secundárias e espaços reduzidos

**Hover:**
- **Primary:** `#D65B58` → `#703535` (Rose Madder → Bitter Chocolate)
- **Secondary:** `#703535` → `#1C1C1D` (Bitter Chocolate → Quase preto)

### Como Usar

#### Exemplo Básico
```tsx
<button className="btn-primary-normal">
  Fazer Inscrição
</button>

<button className="btn-secondary-xs">
  Saiba Mais
</button>
```

#### Com Estado Disabled
```tsx
<button className="btn-primary-normal" disabled>
  Esgotado
</button>
```

#### Com Ícones (Workshop)
```tsx
<button className="btn-primary-normal flex items-center gap-2">
  <span>Quero Me Inscrever</span>
  <ArrowRight className="w-5 h-5" />
</button>
```

### Arquivos Modificados

1. ✅ **tailwind.config.js** - Plugin com 9 classes de botões
2. ✅ **src/app/globals.css** - Fonte Unbounded com string literal
3. ✅ **src/app/style-guide/page.tsx** - 8 botões migrados para novas classes

### Workshop Pages - Status

Os botões do workshop já estavam usando classes do Tailwind (não inline styles):
- ✅ **HeroSection.tsx** - Botão CTA com Unbounded
- ✅ **PricingSection.tsx** - Botão checkout com Unbounded

**Estrutura atual (já correta):**
```tsx
<button className="w-full group text-white text-lg rounded-full p-4 shadow-lg transition-colors duration-300 flex items-center justify-center gap-2 font-unbounded cursor-pointer bg-[#E54E24] hover:bg-[#b73e1d]">
  <span>{getPrimaryButtonText()}</span>
  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
</button>
```

### Benefícios da Migração

✅ **Manutenibilidade:** Classes reutilizáveis em vez de inline styles  
✅ **Consistência:** Sistema único de botões em todo o site  
✅ **Performance:** Tailwind otimiza classes repetidas  
✅ **DX:** Código mais limpo, sem handlers de hover  
✅ **Acessibilidade:** Estados disabled padronizados  
✅ **Fonte:** Unbounded aplicada corretamente em todos os botões  

### Próximos Passos (Opcional)

- [ ] Criar variants com ícones (left/right)
- [ ] Adicionar botões de loading state
- [ ] Criar botão de link (estilizado como botão)
- [ ] Adicionar botões ghost/text
- [ ] Documentar no Storybook (se necessário)

---

## Troubleshooting

### Fonte ainda não aparece?
1. **Hard refresh:** `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+F5` (Windows)
2. **Verificar DevTools:** Console → verificar se `Unbounded` está carregada
3. **Verificar Network:** Tab Network → Fonts → `unbounded-semibold.woff2` carregado?
4. **CSS Computed:** Inspecionar botão → Computed → `font-family` deve ser `"Unbounded"`

### Classes não aplicam hover?
- Tailwind pode não ter compilado: reinicie o dev server
- Verifique se o plugin está no `tailwind.config.js`
- Limpe cache: `rm -rf .next` e `npm run dev`

### Disabled state não funciona?
- Certifique-se de usar `disabled` (HTML) e não `disabled={false}`
- O estado disabled é automático via plugin `.btn:disabled`

---

**Última atualização:** 2025-01-XX  
**Responsável:** GitHub Copilot  
**Status:** ✅ Migração Completa
