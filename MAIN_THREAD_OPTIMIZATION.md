# 🚀 Otimizações de Main Thread Work

## ✅ Implementado (Redução esperada: ~1.5s)

### 1. **Code Splitting Agressivo**
- ✅ Hero Section: SSR mantido (crítico)
- ✅ Demais seções: Lazy load sem SSR (ssr: false)
- **Ganho**: ~400-600ms de Script Evaluation

### 2. **Vanta.js Diferido**
- ✅ Carregamento após `requestIdleCallback` ou 2s
- ✅ Three.js não bloqueia mais a thread principal
- **Ganho**: ~300-500ms de Script Evaluation

---

## 📋 Próximas Otimizações (Faça nesta ordem)

### 3. **Remover Bibliotecas Pesadas**

#### a) Substituir Icons do Tabler
```bash
# Tabler Icons é pesado. Use Lucide (mais leve)
npm uninstall @tabler/icons-react
npm install lucide-react
```

**Arquivos para atualizar:**
- `src/components/pages/workshop/HowToSection.tsx`

Substitua:
```tsx
import { IconGift, IconCalculator, ... } from "@tabler/icons-react";
```

Por:
```tsx
import { Gift, Calculator, Target, CheckSquare, TrendingUp, Wrench } from "lucide-react";
```

**Ganho esperado**: ~200-300ms

#### b) Otimizar GSAP
```tsx
// src/hooks/useScrollAnimation.ts
// Carregar GSAP apenas quando necessário
useEffect(() => {
  const loadGSAP = async () => {
    if ('requestIdleCallback' in window) {
      await new Promise(resolve => requestIdleCallback(resolve, { timeout: 1000 }));
    }
    
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    
    gsap.registerPlugin(ScrollTrigger);
    // ... resto do código
  };
  
  loadGSAP();
}, []);
```

**Ganho esperado**: ~150-200ms

### 4. **CSS Critical Path**

Extrair CSS crítico inline e diferir o restante:

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link
          rel="preload"
          href="/styles/non-critical.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Ganho esperado**: ~100-200ms de Style & Layout

### 5. **Debounce em Event Handlers**

```tsx
// src/components/ui/interactive-hover-button.tsx
import { useCallback } from 'react';
import { debounce } from 'lodash-es'; // ou criar seu próprio

const handleMouseMove = useCallback(
  debounce((e) => {
    // lógica do mouse move
  }, 16), // ~60fps
  []
);
```

**Ganho esperado**: ~50-100ms

### 6. **Web Workers para Tarefas Pesadas**

Se houver cálculos complexos (ex: PDF generation):

```tsx
// src/workers/pdf.worker.ts
self.addEventListener('message', async (e) => {
  const { data } = e;
  // Gerar PDF em background
  const pdfBlob = await generatePDF(data);
  self.postMessage(pdfBlob);
});

// Uso:
const worker = new Worker('/workers/pdf.worker.ts');
worker.postMessage(data);
worker.onmessage = (e) => {
  downloadPDF(e.data);
};
```

**Ganho esperado**: ~100-300ms

### 7. **Remover console.logs em Produção**

```js
// next.config.js
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

**Ganho esperado**: ~20-50ms

---

## 📊 Impacto Total Esperado

| Otimização | Tempo Economizado |
|-----------|-------------------|
| Code Splitting | 400-600ms |
| Vanta Diferido | 300-500ms |
| Remover Tabler Icons | 200-300ms |
| GSAP Lazy | 150-200ms |
| CSS Critical | 100-200ms |
| Debounce Events | 50-100ms |
| Web Workers | 100-300ms |
| Remove console | 20-50ms |
| **TOTAL** | **1,320-2,250ms** |

**Main Thread atual**: 4.1s  
**Main Thread após otimizações**: **1.85-2.78s** ✅

---

## 🔧 Scripts Úteis

### Analisar Bundle
```bash
npm run analyze
```

### Medir Performance
```bash
# Lighthouse CLI
npx lighthouse https://dudaberger.com.br/workshop --only-categories=performance --view
```

### Verificar Tree Shaking
```bash
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

---

## 🎯 Meta Final

- Main Thread Work: < 2s ✅
- Time to Interactive (TTI): < 3.5s
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s

## 📝 Checklist

- [x] Code splitting agressivo
- [x] Vanta.js diferido
- [ ] Substituir Tabler por Lucide
- [ ] GSAP lazy load
- [ ] CSS critical inline
- [ ] Debounce em eventos
- [ ] Web Workers para tarefas pesadas
- [ ] Remover console.logs produção
- [ ] Testar em dispositivos reais
- [ ] Monitorar com Chrome DevTools Performance
