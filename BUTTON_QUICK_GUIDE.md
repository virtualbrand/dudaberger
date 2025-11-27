# Guia Rápido - Sistema de Botões

## 🎯 Como Usar os Botões

### Classes Disponíveis

#### Botões Primary (Rose Madder)
```tsx
// Normal (padrão)
<button className="btn-primary-normal">Fazer Inscrição</button>

// Pequeno (XS)
<button className="btn-primary-xs">Ver Mais</button>

// Outline Normal
<button className="btn-primary-outline-normal">Cancelar</button>

// Outline Pequeno
<button className="btn-primary-outline-xs">Voltar</button>
```

#### Botões Secondary (Bitter Chocolate)
```tsx
// Normal (padrão)
<button className="btn-secondary-normal">Ação Secundária</button>

// Pequeno (XS)
<button className="btn-secondary-xs">Info</button>

// Outline Normal
<button className="btn-secondary-outline-normal">Detalhes</button>

// Outline Pequeno
<button className="btn-secondary-outline-xs">...</button>
```

### Estado Disabled
```tsx
<button className="btn-primary-normal" disabled>
  Esgotado
</button>
```

### Com Ícones
```tsx
import { ArrowRight, Check } from 'lucide-react';

<button className="btn-primary-normal flex items-center gap-2">
  <span>Continuar</span>
  <ArrowRight className="w-5 h-5" />
</button>
```

### Largura Full
```tsx
<button className="btn-primary-normal w-full">
  Botão Largo
</button>
```

---

## 🎨 Especificações Visuais

| Propriedade | Valor |
|-------------|-------|
| Fonte | **Unbounded** (semibold/600) |
| Forma | `rounded-full` |
| Transição | 300ms |
| Normal Size | `px-6 py-3 text-sm` |
| XS Size | `px-4 py-2 text-xs` |

### Cores

**Primary (Rose Madder):**
- Normal: `#D65B58`
- Hover: `#703535`

**Secondary (Bitter Chocolate):**
- Normal: `#703535`
- Hover: `#1C1C1D`

---

## ❌ O que NÃO fazer

```tsx
// ❌ NÃO use inline styles
<button style={{ backgroundColor: '#D65B58' }}>Botão</button>

// ❌ NÃO use handlers de hover
<button onMouseEnter={...} onMouseLeave={...}>Botão</button>

// ❌ NÃO recrie as classes manualmente
<button className="px-6 py-3 rounded-full bg-[#D65B58]">Botão</button>

// ✅ Use as classes do sistema
<button className="btn-primary-normal">Botão</button>
```

---

## 🔧 Troubleshooting

### Fonte não aparece?
1. Hard refresh: `Cmd+Shift+R`
2. Reinicie o dev server: `npm run dev`
3. Limpe cache: `rm -rf .next`

### Hover não funciona?
1. Verifique se não há `onMouseEnter/onMouseLeave`
2. Reinicie o Tailwind build
3. Verifique o plugin no `tailwind.config.js`

### Classes não existem?
1. Verifique o `tailwind.config.js` → plugins array
2. Reinicie o dev server
3. Verifique o autocomplete do VSCode

---

## 📦 Quando usar cada variante?

### Normal (`btn-primary-normal`)
✅ CTAs principais  
✅ Ações importantes  
✅ Formulários de conversão  
✅ Checkout/Compra  

### XS (`btn-primary-xs`)
✅ Ações secundárias  
✅ Espaços reduzidos  
✅ Listas de itens  
✅ Cards pequenos  

### Outline
✅ Ações de cancelamento  
✅ Botões secundários sem destaque  
✅ Navegação entre etapas  
✅ Opções alternativas  

### Secondary
✅ Ações menos importantes  
✅ Navegação interna  
✅ Informações adicionais  
✅ Ações de suporte  

---

**Dúvidas?** Verifique o arquivo completo: `BUTTON_SYSTEM_MIGRATION.md`
