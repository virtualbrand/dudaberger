# Quick Reference - Sistema de Botões

## 🚀 Cópia Rápida

### Primary Buttons (Rosa Coral - Ações Principais)

```html
<!-- Filled -->
<button className="btn-primary-xs">XS</button>
<button className="btn-primary-sm">SM</button>
<button className="btn-primary-md">MD</button>
<button className="btn-primary-lg">LG</button>

<!-- Outline -->
<button className="btn-primary-xs-outline">XS Outline</button>
<button className="btn-primary-sm-outline">SM Outline</button>
<button className="btn-primary-md-outline">MD Outline</button>
<button className="btn-primary-lg-outline">LG Outline</button>
```

### Secondary Buttons (Chocolate - Ações Secundárias)

```html
<!-- Filled -->
<button className="btn-secondary-xs">XS</button>
<button className="btn-secondary-sm">SM</button>
<button className="btn-secondary-md">MD</button>
<button className="btn-secondary-lg">LG</button>

<!-- Outline -->
<button className="btn-secondary-xs-outline">XS Outline</button>
<button className="btn-secondary-sm-outline">SM Outline</button>
<button className="btn-secondary-md-outline">MD Outline</button>
<button className="btn-secondary-lg-outline">LG Outline</button>
```

### Success Buttons (Verde - Sucesso)

```html
<!-- Filled -->
<button className="btn-success-xs">XS</button>
<button className="btn-success-sm">SM</button>
<button className="btn-success-md">MD</button>
<button className="btn-success-lg">LG</button>

<!-- Outline -->
<button className="btn-success-xs-outline">XS Outline</button>
<button className="btn-success-sm-outline">SM Outline</button>
<button className="btn-success-md-outline">MD Outline</button>
<button className="btn-success-lg-outline">LG Outline</button>
```

### Warning Buttons (Bronze Mel - Avisos)

```html
<!-- Filled -->
<button className="btn-warning-xs">XS</button>
<button className="btn-warning-sm">SM</button>
<button className="btn-warning-md">MD</button>
<button className="btn-warning-lg">LG</button>

<!-- Outline -->
<button className="btn-warning-xs-outline">XS Outline</button>
<button className="btn-warning-sm-outline">SM Outline</button>
<button className="btn-warning-md-outline">MD Outline</button>
<button className="btn-warning-lg-outline">LG Outline</button>
```

### Danger Buttons (Rosa - Ações Destrutivas)

```html
<!-- Filled -->
<button className="btn-danger-xs">XS</button>
<button className="btn-danger-sm">SM</button>
<button className="btn-danger-md">MD</button>
<button className="btn-danger-lg">LG</button>

<!-- Outline -->
<button className="btn-danger-xs-outline">XS Outline</button>
<button className="btn-danger-sm-outline">SM Outline</button>
<button className="btn-danger-md-outline">MD Outline</button>
<button className="btn-danger-lg-outline">LG Outline</button>
```

## 📋 Padrões Comuns

### Par Confirmar/Cancelar
```html
<div className="flex gap-3">
  <button className="btn-primary-md">Confirmar</button>
  <button className="btn-secondary-md-outline">Cancelar</button>
</div>
```

### Par Salvar/Cancelar
```html
<div className="flex gap-3">
  <button className="btn-success-md">Salvar</button>
  <button className="btn-secondary-md-outline">Cancelar</button>
</div>
```

### Par Deletar/Cancelar
```html
<div className="flex gap-3">
  <button className="btn-danger-md">Deletar</button>
  <button className="btn-secondary-md-outline">Cancelar</button>
</div>
```

### Botão com Ícone
```html
<button className="btn-primary-md flex items-center gap-2">
  <Icon />
  Texto do Botão
</button>
```

### Botão Full Width
```html
<button className="btn-primary-md w-full">
  Botão Largura Total
</button>
```

### Botão Disabled
```html
<button className="btn-primary-md" disabled>
  Botão Desabilitado
</button>
```

## 🎯 Quando Usar Cada Variante

| Variante | Uso |
|----------|-----|
| **Primary** | Ação principal da página/seção (ex: "Comprar", "Enviar", "Próximo") |
| **Secondary** | Ações secundárias, navegação, cancelar (ex: "Voltar", "Cancelar") |
| **Success** | Confirmações positivas (ex: "Salvar", "Confirmar", "Concluir") |
| **Warning** | Avisos que requerem atenção (ex: "Atenção", "Revisar") |
| **Danger** | Ações destrutivas irreversíveis (ex: "Deletar", "Remover", "Descartar") |

## 🎨 Quando Usar Filled vs Outline

| Estilo | Uso |
|--------|-----|
| **Filled** | Ação primária, principal foco de atenção |
| **Outline** | Ação secundária, menos ênfase, complementar |

## 💡 Dica de Hierarquia Visual

Em uma mesma interface:
1. **Filled Primary** = Ação mais importante
2. **Filled Secondary** = Ação importante secundária
3. **Outline** = Ações alternativas/opcionais

Exemplo:
```html
<!-- Hierarquia correta -->
<button className="btn-primary-md">Comprar Agora</button>
<button className="btn-secondary-md-outline">Adicionar ao Carrinho</button>
<button className="btn-secondary-sm-outline">Ver Detalhes</button>
```
