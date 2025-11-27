# Migração - Sistema de Botões Atualizado

## 📋 Mapeamento de Classes Antigas → Novas

### Classes Mantidas por Compatibilidade

As seguintes classes antigas continuam funcionando, mas recomendamos migrar para as novas:

| Classe Antiga | Classe Nova | Status |
|--------------|-------------|---------|
| `btn-primary-normal` | `btn-primary-md` | ✅ Compatível |
| `btn-primary-xs` | `btn-primary-xs` | ✅ Mantida |
| `btn-primary-outline-normal` | `btn-primary-md-outline` | ✅ Compatível |
| `btn-primary-outline-xs` | `btn-primary-xs-outline` | ❌ **Atualizar** |
| `btn-secondary-normal` | `btn-secondary-md` | ✅ Compatível |
| `btn-secondary-xs` | `btn-secondary-xs` | ✅ Mantida |
| `btn-secondary-outline-normal` | `btn-secondary-md-outline` | ✅ Compatível |
| `btn-secondary-outline-xs` | `btn-secondary-xs-outline` | ❌ **Atualizar** |

### Ações Necessárias

#### ⚠️ IMPORTANTE: Atualizar classes outline-xs

```bash
# Buscar todas as ocorrências
grep -r "btn-primary-outline-xs" src/
grep -r "btn-secondary-outline-xs" src/
```

**Antes:**
```tsx
<button className="btn-primary-outline-xs">Botão</button>
<button className="btn-secondary-outline-xs">Botão</button>
```

**Depois:**
```tsx
<button className="btn-primary-xs-outline">Botão</button>
<button className="btn-secondary-xs-outline">Botão</button>
```

## 🔍 Script de Migração

Use o seguinte comando para encontrar e substituir automaticamente:

```bash
# No diretório raiz do projeto
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i '' 's/btn-primary-outline-xs/btn-primary-xs-outline/g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i '' 's/btn-secondary-outline-xs/btn-secondary-xs-outline/g' {} +
```

## 📊 Checklist de Migração

### 1. Atualizar Imports e Configurações
- [x] ✅ Criar `src/app/styles/buttons.css`
- [x] ✅ Atualizar `src/app/globals.css` para importar buttons.css
- [x] ✅ Remover plugin de botões do `tailwind.config.js`
- [x] ✅ Atualizar `/style-guide` com novos botões

### 2. Migrar Classes nos Componentes
- [ ] Buscar e substituir `btn-primary-outline-xs` → `btn-primary-xs-outline`
- [ ] Buscar e substituir `btn-secondary-outline-xs` → `btn-secondary-xs-outline`
- [ ] (Opcional) Substituir `-normal` por `-md` para consistência

### 3. Testar Aplicação
- [ ] Verificar visual de todos os botões
- [ ] Testar estados hover
- [ ] Testar estados disabled
- [ ] Verificar responsividade

## 🎯 Novos Recursos Disponíveis

Após a migração, você terá acesso a:

### Novos Tamanhos
```tsx
// Antes: apenas xs e normal
<button className="btn-primary-xs">XS</button>
<button className="btn-primary-normal">Normal</button>

// Agora: xs, sm, md, lg
<button className="btn-primary-xs">XS</button>
<button className="btn-primary-sm">SM</button>
<button className="btn-primary-md">MD</button>
<button className="btn-primary-lg">LG</button>
```

### Novas Variantes
```tsx
// Sucesso (Verde)
<button className="btn-success-md">Salvar</button>
<button className="btn-success-sm-outline">Confirmar</button>

// Aviso (Bronze)
<button className="btn-warning-md">Atenção</button>
<button className="btn-warning-xs-outline">Alerta</button>

// Perigo (Rosa - semântico)
<button className="btn-danger-md">Deletar</button>
<button className="btn-danger-sm-outline">Remover</button>
```

## 📝 Exemplos de Migração Real

### Exemplo 1: Formulário Simples

**Antes:**
```tsx
<form>
  <button type="submit" className="btn-primary-normal">
    Enviar
  </button>
  <button type="button" className="btn-secondary-outline-normal">
    Cancelar
  </button>
</form>
```

**Depois:**
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

### Exemplo 2: Card com Ações

**Antes:**
```tsx
<div className="card">
  <h3>Produto</h3>
  <button className="btn-primary-xs">Comprar</button>
  <button className="btn-secondary-outline-xs">Detalhes</button>
</div>
```

**Depois:**
```tsx
<div className="card">
  <h3>Produto</h3>
  <button className="btn-primary-xs">Comprar</button>
  <button className="btn-secondary-xs-outline">Detalhes</button>
</div>
```

### Exemplo 3: Modal de Confirmação

**Antes:**
```tsx
<Modal>
  <p>Tem certeza que deseja deletar?</p>
  <div className="flex gap-2">
    <button className="btn-primary-normal">Deletar</button>
    <button className="btn-secondary-outline-normal">Cancelar</button>
  </div>
</Modal>
```

**Depois (Usando semântica melhorada):**
```tsx
<Modal>
  <p>Tem certeza que deseja deletar?</p>
  <div className="flex gap-2">
    <button className="btn-danger-md">Deletar</button>
    <button className="btn-secondary-md-outline">Cancelar</button>
  </div>
</Modal>
```

## 🔄 Processo de Migração Gradual

### Fase 1: Compatibilidade (Atual)
- Classes antigas funcionam normalmente
- Código legado não quebra
- Tempo para migrar

### Fase 2: Migração Ativa (Recomendado)
- Buscar e substituir classes antigas
- Testar componente por componente
- Usar novos recursos (success, warning, danger)

### Fase 3: Remoção do Legacy (Futuro)
- Após 100% de migração
- Remover classes de compatibilidade do `buttons.css`
- Otimizar CSS final

## 📚 Recursos

- **Style Guide**: `/style-guide` - Visualize todos os botões
- **Guia Completo**: `BUTTON_SYSTEM_GUIDE.md`
- **Referência Rápida**: `BUTTON_QUICK_REFERENCE.md`

## 💡 Dicas

1. **Migre aos poucos**: Não precisa migrar tudo de uma vez
2. **Use o Style Guide**: Referência visual para escolher o botão certo
3. **Teste sempre**: Verifique hover e disabled após migração
4. **Seja consistente**: Use os mesmos tamanhos em contextos similares

## ❓ FAQ

### As classes antigas param de funcionar?
Não! Classes como `btn-primary-normal` continuam funcionando por compatibilidade.

### Preciso migrar imediatamente?
Não é obrigatório, mas recomendamos para:
- Consistência no código
- Acesso a novos recursos
- Melhores práticas

### O que acontece se eu não migrar?
Nada! O código continua funcionando normalmente.

### Qual a diferença real entre -normal e -md?
Nenhuma! `btn-primary-normal` mapeia para `btn-primary-md`. É apenas padronização de nomenclatura.

### Posso usar Tailwind com os novos botões?
Sim! Total compatibilidade:
```tsx
<button className="btn-primary-md w-full mt-4 shadow-lg">
  Botão com Classes Tailwind
</button>
```
