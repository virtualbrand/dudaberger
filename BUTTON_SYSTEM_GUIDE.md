# Sistema de Botões - Duda Berger Design System

## 📋 Convenção de Nomenclatura

```
btn-{variant}-{size}-{style}
```

### Componentes do Nome

- **variant**: Tipo de botão (primary, secondary, success, warning, danger)
- **size**: Tamanho do botão (xs, sm, md, lg)
- **style**: Estilo do botão (omitir para filled, ou -outline)

## 🎨 Variantes Disponíveis

### Primary (Lobster Pink - #D65B58)
Ações principais e de destaque

```html
<button className="btn-primary-md">Ação Principal</button>
<button className="btn-primary-sm-outline">Secundário</button>
```

### Secondary (Bitter Chocolate - #703535)
Ações secundárias e navegação

```html
<button className="btn-secondary-md">Ação Secundária</button>
<button className="btn-secondary-lg-outline">Cancelar</button>
```

### Success (Evergreen - #183D32)
Confirmações e sucesso

```html
<button className="btn-success-md">Confirmar</button>
<button className="btn-success-xs-outline">OK</button>
```

### Warning (Honey Bronze - #EAA93A)
Avisos e alertas

```html
<button className="btn-warning-md">Atenção</button>
<button className="btn-warning-sm-outline">Aviso</button>
```

### Danger (Lobster Pink - #D65B58)
Ações destrutivas

```html
<button className="btn-danger-md">Deletar</button>
<button className="btn-danger-xs-outline">Remover</button>
```

## 📏 Tamanhos

| Tamanho | Código | Padding | Font Size |
|---------|--------|---------|-----------|
| Extra Small | xs | 0.5rem 1rem | 0.75rem (12px) |
| Small | sm | 0.625rem 1.25rem | 0.875rem (14px) |
| Medium | md | 0.75rem 1.5rem | 1rem (16px) |
| Large | lg | 1rem 2rem | 1.125rem (18px) |

## 🎭 Estilos

### Filled (Padrão)
Sem sufixo adicional. Fundo preenchido com a cor da variante.

```html
<button className="btn-primary-md">Filled Button</button>
```

### Outline
Adicione `-outline` ao final. Fundo transparente com borda.

```html
<button className="btn-primary-md-outline">Outline Button</button>
```

## 📝 Exemplos de Uso

### Formulário de Confirmação
```tsx
function ConfirmDialog() {
  return (
    <div className="flex gap-3">
      <button className="btn-primary-md">
        Confirmar
      </button>
      <button className="btn-secondary-md-outline">
        Cancelar
      </button>
    </div>
  );
}
```

### Ações Destrutivas
```tsx
function DeleteAction() {
  return (
    <div className="flex gap-2">
      <button className="btn-danger-sm">
        Deletar Permanentemente
      </button>
      <button className="btn-secondary-sm-outline">
        Cancelar
      </button>
    </div>
  );
}
```

### Notificações de Sucesso
```tsx
function SuccessToast() {
  return (
    <button className="btn-success-xs">
      ✓ Salvo com sucesso
    </button>
  );
}
```

### Avisos
```tsx
function WarningBanner() {
  return (
    <button className="btn-warning-md-outline">
      ⚠ Atenção - Clique para detalhes
    </button>
  );
}
```

## 🔄 Estados

Todos os botões suportam automaticamente:

### Hover
Transformação suave com elevação e mudança de cor

### Disabled
Adicione o atributo `disabled` para desabilitar

```html
<button className="btn-primary-md" disabled>
  Botão Desabilitado
</button>
```

### Focus
Anel de foco para acessibilidade

## 🗂️ Organização de Arquivos

```
src/app/
├── styles/
│   ├── buttons.css       ← Todos os estilos de botões
│   ├── variables.css
│   ├── components.css
│   └── utilities.css
└── globals.css           ← Importa buttons.css
```

## 🔧 Integração com Tailwind

Os botões são definidos usando `@layer components` no arquivo `buttons.css`, o que significa:

✅ **Compatível com Tailwind**: Você pode adicionar classes Tailwind normalmente
✅ **Sem Conflitos**: Classes de botões têm precedência correta
✅ **Purge Seguro**: Classes são mantidas no build de produção

### Exemplo com Tailwind
```html
<button className="btn-primary-md w-full mt-4 shadow-lg">
  Botão com Width Full e Margem
</button>

<button className="btn-secondary-sm-outline flex items-center gap-2">
  <Icon />
  Com Ícone
</button>
```

## 🎯 Melhores Práticas

### ✅ Faça

```tsx
// Use tamanhos semânticos
<button className="btn-primary-md">Ação Principal</button>

// Combine com Tailwind quando necessário
<button className="btn-secondary-sm w-full">Largura Total</button>

// Use variantes semânticas
<button className="btn-danger-md">Deletar</button>
<button className="btn-success-sm">Confirmar</button>
```

### ❌ Evite

```tsx
// Não misture estilos inline
<button className="btn-primary-md" style={{ backgroundColor: 'red' }}>
  Não fazer
</button>

// Não sobrescreva cores diretamente
<button className="btn-primary-md bg-blue-500">
  Não fazer
</button>

// Não use tamanhos inconsistentes na mesma interface
<button className="btn-primary-lg">Grande</button>
<button className="btn-secondary-xs">Muito Pequeno</button>
// Use tamanhos consistentes!
```

## 🔄 Compatibilidade com Código Legado

As seguintes classes antigas ainda funcionam por compatibilidade:

- `btn-primary-normal` → mapeia para `btn-primary-md`
- `btn-primary-outline-normal` → mapeia para `btn-primary-md-outline`
- `btn-secondary-normal` → mapeia para `btn-secondary-md`
- `btn-secondary-outline-normal` → mapeia para `btn-secondary-md-outline`

**Recomendação**: Migre para a nova nomenclatura quando possível.

## 📖 Visualizar no Style Guide

Acesse `/style-guide` para ver todos os botões em ação com exemplos interativos.

## 🎨 Cores do Sistema

| Variante | Cor Principal | Hover | Disabled |
|----------|--------------|-------|----------|
| Primary | #D65B58 | #b94946 | #D1A09C |
| Secondary | #703535 | #5a2a2a | #b9b9ba |
| Success | #183D32 | #133128 | #DDF0CA |
| Warning | #EAA93A | #c9892e | #f1bf75 |
| Danger | #D65B58 | #b94946 | #D1A09C |

## 💡 Dicas de Performance

- Classes são carregadas via `@layer components` do Tailwind
- Importadas separadamente em `buttons.css` para melhor organização
- Tree-shaking automático no build de produção
- Sem JavaScript necessário - CSS puro

## 🚀 Próximos Passos

1. Migre botões existentes para a nova nomenclatura
2. Use o style guide para referência visual
3. Adicione ícones usando flexbox: `flex items-center gap-2`
4. Customize quando necessário com classes Tailwind adicionais
