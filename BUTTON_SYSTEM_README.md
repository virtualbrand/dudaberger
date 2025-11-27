# 🎨 Sistema de Botões - Duda Berger Design System

Sistema completo e organizado de botões com nomenclatura consistente, totalmente integrado com Tailwind CSS.

## 🚀 Início Rápido

### Uso Básico

```tsx
import './app/globals.css'; // Botões já estão disponíveis!

function MyComponent() {
  return (
    <>
      <button className="btn-primary-md">Ação Principal</button>
      <button className="btn-secondary-md-outline">Cancelar</button>
    </>
  );
}
```

### Nomenclatura

```
btn-{variant}-{size}-{style}
```

- **variant**: primary, secondary, success, warning, danger
- **size**: xs, sm, md, lg  
- **style**: (omitir para filled) ou -outline

## 📖 Documentação

### Documentos Disponíveis

1. **[BUTTON_QUICK_REFERENCE.md](./BUTTON_QUICK_REFERENCE.md)** 
   - ⚡ **Para uso diário**: Copie e cole os botões rapidamente
   - Exemplos prontos de todos os botões
   - Padrões comuns (Confirmar/Cancelar, etc)

2. **[BUTTON_SYSTEM_GUIDE.md](./BUTTON_SYSTEM_GUIDE.md)**
   - 📚 **Guia completo**: Documentação detalhada
   - Todas as variantes e tamanhos
   - Melhores práticas e exemplos avançados
   - Integração com Tailwind

3. **[BUTTON_MIGRATION_GUIDE.md](./BUTTON_MIGRATION_GUIDE.md)**
   - 🔄 **Para migração**: Atualizar código legado
   - Mapeamento de classes antigas → novas
   - Scripts de migração automática
   - Checklist completo

4. **[Style Guide](http://localhost:3000/style-guide)** (Quando o app estiver rodando)
   - 👁️ **Referência visual**: Veja todos os botões em ação
   - Exemplos interativos
   - Teste de estados (hover, disabled)

## 🎯 Variantes Disponíveis

| Variante | Cor | Uso | Exemplo |
|----------|-----|-----|---------|
| **Primary** | #D65B58 (Rosa Coral) | Ações principais | `btn-primary-md` |
| **Secondary** | #703535 (Chocolate) | Ações secundárias | `btn-secondary-md` |
| **Success** | #183D32 (Verde) | Confirmações | `btn-success-md` |
| **Warning** | #EAA93A (Bronze Mel) | Avisos | `btn-warning-md` |
| **Danger** | #D65B58 (Rosa) | Ações destrutivas | `btn-danger-md` |

## 📏 Tamanhos Disponíveis

| Tamanho | Código | Uso |
|---------|--------|-----|
| Extra Small | `xs` | Tags, badges, ações mínimas |
| Small | `sm` | Formulários compactos |
| Medium | `md` | **Padrão** - uso geral |
| Large | `lg` | CTAs, destaque |

## 🎨 Estilos

- **Filled** (padrão): Fundo preenchido → `btn-primary-md`
- **Outline**: Borda com fundo transparente → `btn-primary-md-outline`

## ✨ Exemplos Rápidos

### Formulário Padrão
```tsx
<form>
  <button type="submit" className="btn-primary-md">
    Enviar
  </button>
  <button type="button" className="btn-secondary-md-outline">
    Cancelar
  </button>
</form>
```

### Modal de Confirmação
```tsx
<div className="flex gap-3">
  <button className="btn-success-md">Confirmar</button>
  <button className="btn-secondary-md-outline">Voltar</button>
</div>
```

### Ação Destrutiva
```tsx
<div className="flex gap-3">
  <button className="btn-danger-md">Deletar Permanentemente</button>
  <button className="btn-secondary-md-outline">Cancelar</button>
</div>
```

### Botão com Ícone
```tsx
<button className="btn-primary-md flex items-center gap-2">
  <Icon />
  Adicionar Item
</button>
```

## 🔧 Estrutura de Arquivos

```
src/app/
├── styles/
│   ├── buttons.css          ← 🎯 Todos os estilos de botões
│   ├── variables.css
│   ├── components.css
│   └── utilities.css
├── globals.css              ← Importa buttons.css
└── style-guide/
    └── page.tsx             ← Visualização dos botões
```

## ✅ Características

- ✅ **Totalmente compatível com Tailwind**: Adicione classes normalmente
- ✅ **Estados automáticos**: Hover, focus, disabled
- ✅ **Acessibilidade**: Focus rings, ARIA-ready
- ✅ **Responsivo**: Funciona em todos os tamanhos de tela
- ✅ **Performance**: CSS puro, sem JavaScript
- ✅ **Tree-shaking**: Apenas classes usadas no build
- ✅ **Retrocompatível**: Classes antigas continuam funcionando

## 🔄 Compatibilidade com Código Legado

Classes antigas **continuam funcionando**:
- `btn-primary-normal` → `btn-primary-md`
- `btn-secondary-normal` → `btn-secondary-md`
- `btn-primary-outline-normal` → `btn-primary-md-outline`
- `btn-secondary-outline-normal` → `btn-secondary-md-outline`

Veja [BUTTON_MIGRATION_GUIDE.md](./BUTTON_MIGRATION_GUIDE.md) para migrar.

## 🎓 Hierarquia Visual Recomendada

```tsx
// ✅ CORRETO: Hierarquia clara
<button className="btn-primary-md">Ação Principal</button>
<button className="btn-secondary-md">Ação Secundária</button>
<button className="btn-secondary-sm-outline">Ação Terciária</button>

// ❌ EVITAR: Tamanhos muito diferentes
<button className="btn-primary-lg">Ação Principal</button>
<button className="btn-secondary-xs">Ação Secundária</button>
```

## 💡 Dicas de Uso

1. **Use `md` como padrão** para a maioria dos casos
2. **Combine filled + outline** para criar hierarquia
3. **Use variantes semânticas** (success, warning, danger)
4. **Mantenha consistência** de tamanhos na mesma interface
5. **Adicione Tailwind** quando necessário: `w-full`, `mt-4`, etc.

## 🔍 Encontrar e Testar

### Buscar Botões no Código
```bash
# Encontrar todos os botões no projeto
grep -r "btn-" src/ --include="*.tsx" --include="*.ts"
```

### Ver no Style Guide
```bash
npm run dev
# Acesse: http://localhost:3000/style-guide
```

## 📦 Estrutura do Sistema

```css
/* src/app/styles/buttons.css */

@layer components {
  /* Base */
  .btn-base { /* estilos base */ }
  
  /* Tamanhos */
  .btn-xs { /* extra small */ }
  .btn-sm { /* small */ }
  .btn-md { /* medium */ }
  .btn-lg { /* large */ }
  
  /* Variantes x Tamanhos x Estilos */
  .btn-primary-xs { /* filled */ }
  .btn-primary-xs-outline { /* outline */ }
  /* ... e assim por diante */
}
```

## 🤝 Contribuindo

Para adicionar novos estilos ou variantes:

1. Edite `src/app/styles/buttons.css`
2. Siga a convenção: `btn-{variant}-{size}-{style}`
3. Adicione ao style guide em `src/app/style-guide/page.tsx`
4. Atualize a documentação

## 📚 Próximos Passos

1. 📖 Leia o [BUTTON_QUICK_REFERENCE.md](./BUTTON_QUICK_REFERENCE.md) para começar
2. 👁️ Visite `/style-guide` para ver exemplos visuais
3. 🔄 Se tiver código legado, veja [BUTTON_MIGRATION_GUIDE.md](./BUTTON_MIGRATION_GUIDE.md)
4. 📚 Para detalhes completos, consulte [BUTTON_SYSTEM_GUIDE.md](./BUTTON_SYSTEM_GUIDE.md)

## 🐛 Problemas?

### Botões não aparecem?
Verifique se `globals.css` importa `buttons.css`:
```css
@import "./styles/buttons.css";
```

### Classes não funcionam?
Certifique-se que o Tailwind está processando corretamente:
```bash
npm run dev
```

### Cores erradas?
As cores são fixas no CSS. Use variantes corretas ao invés de sobrescrever.

---

**Versão**: 2.0.0  
**Última atualização**: Novembro 2025  
**Design System**: Duda Berger
