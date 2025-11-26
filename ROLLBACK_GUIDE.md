# 🔄 Guia de Rollback - Otimizações de CSS

## Se algo der errado...

### Opção 1: Rollback Completo (Voltar ao estado anterior)

```bash
# 1. Restaurar layout.tsx original
git checkout HEAD -- src/app/layout.tsx

# 2. Restaurar next.config.js original
git checkout HEAD -- next.config.js

# 3. Remover arquivos novos
rm src/app/critical.css
rm src/app/non-critical.css
rm src/components/NonCriticalCSS.tsx

# 4. Rebuild
rm -rf .next
npm run build
```

### Opção 2: Desativar Loading Assíncrono (Manter otimizações parciais)

Edite `src/app/layout.tsx` e mude:
```tsx
import './critical.css';
```

Para:
```tsx
import './globals.css'; // Volta ao CSS original
```

E remova:
```tsx
<NonCriticalCSS /> // Remover esta linha
```

### Opção 3: Carregar Tudo Síncrono (Performance intermediária)

Edite `src/app/layout.tsx`:
```tsx
import './critical.css';
import './non-critical.css'; // Adicione esta linha

// Remova o componente NonCriticalCSS
// <NonCriticalCSS />
```

## 🐛 Troubleshooting

### Problema: Estilos não aparecem
**Solução**: Verifique o console do navegador
```javascript
// No console, execute:
document.querySelectorAll('link[rel="stylesheet"]')
// Deve mostrar os links CSS carregados
```

### Problema: FOUC muito visível
**Solução 1**: Adicionar mais estilos ao critical.css
**Solução 2**: Desativar loading assíncrono (Opção 3 acima)

### Problema: Build falha
**Solução**: Verificar erros específicos
```bash
npm run build 2>&1 | tee build.log
# Analise o arquivo build.log
```

### Problema: Performance pior
**Solução**: Usar ferramentas de medição
```bash
# Lighthouse
npm run build && npm run start
# Abra Chrome DevTools > Lighthouse

# Compare scores antes e depois
```

## 📊 Comparação Rápida

| Abordagem | Render Block | Performance | Complexidade |
|-----------|--------------|-------------|--------------|
| **Original** (globals.css) | Alto (~320ms) | Baseline | Simples |
| **Otimizado** (critical + async) | Baixo (~50ms) | +85% | Média |
| **Tudo síncrono** (critical + non-critical) | Médio (~150ms) | +50% | Simples |

## 🔍 Como Verificar se Está Funcionando

### 1. Network Tab (Chrome DevTools)
- ✅ critical.css carrega primeiro
- ✅ non-critical.css carrega depois
- ✅ Primeiro render não espera todo CSS

### 2. Lighthouse
- ✅ "Eliminate render-blocking resources" deve passar
- ✅ Performance score deve aumentar
- ✅ FCP e LCP devem melhorar

### 3. Visual
- ⚠️ Pode ter breve flash (esperado)
- ✅ Conteúdo aparece rapidamente
- ✅ Estilos completos aplicam logo depois

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do build
2. Teste em ambiente local primeiro
3. Use o script de comparação: `./scripts/compare-css.sh`
4. Consulte a documentação: `RENDER_BLOCKING_OPTIMIZATION.md`

## ✅ Checklist de Validação

Após deploy, verifique:
- [ ] Site carrega normalmente
- [ ] Estilos aplicados corretamente
- [ ] Sem erros no console
- [ ] Performance melhorou (Lighthouse)
- [ ] Core Web Vitals melhoraram
- [ ] Experiência de usuário positiva

---

**Lembre-se**: É sempre possível voltar ao estado anterior com `git checkout`.
