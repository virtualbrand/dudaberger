# Configuração de Cache no Cloudflare

## ⚙️ Configurações Necessárias no Cloudflare Dashboard

### 1. **Caching > Configuration**

#### Browser Cache TTL
```
Respect Existing Headers
```
> Isso permite que o Next.js controle o cache via headers que configuramos no código.

#### Edge Cache TTL
```
Padrão: 2 hours (7200 segundos)
```

---

### 2. **Page Rules** (Caching > Cache Rules)

Crie as seguintes regras **nesta ordem** (a ordem importa!):

#### Regra 1: Cache Longo para Assets Estáticos
```
URL Pattern: dudaberger.com.br/_next/static/*
Settings:
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 1 year
  - Cache Level: Cache Everything
```

#### Regra 2: Cache Longo para Imagens
```
URL Pattern: dudaberger.com.br/images/*
Settings:
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 1 year
  - Cache Level: Cache Everything
```

#### Regra 3: Cache Longo para Fontes
```
URL Pattern: dudaberger.com.br/fonts/*
Settings:
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 1 year
  - Cache Level: Cache Everything
```

#### Regra 4: Cache Médio para HTML
```
URL Pattern: dudaberger.com.br/*
Settings:
  - Browser Cache TTL: 30 days
  - Edge Cache TTL: 4 hours
  - Cache Level: Standard
```

---

### 3. **Speed > Optimization**

Ative as seguintes otimizações:

#### Auto Minify
- ✅ JavaScript
- ✅ CSS
- ✅ HTML

#### Brotli
- ✅ Enable Brotli compression

#### Early Hints
- ✅ Enable (envia preload hints antes do HTML)

#### HTTP/3 (with QUIC)
- ✅ Enable

#### 0-RTT Connection Resumption
- ✅ Enable

#### Rocket Loader
- ❌ Disable (conflita com Next.js e GSAP)

---

### 4. **Network > HTTP/2**

```
✅ Enable HTTP/2
✅ Enable Server Push (para preload de assets críticos)
```

---

### 5. **Caching > Cache Purge**

Quando fizer deploy de nova versão:

```
Purge Everything
```

Ou purge seletivo:
```
Purge by URL:
- https://dudaberger.com.br/
- https://dudaberger.com.br/workshop
```

---

## 📊 Como Verificar se Está Funcionando

### 1. Chrome DevTools
1. Abra DevTools (F12)
2. Network tab
3. Recarregue a página (Ctrl+R)
4. Clique em qualquer recurso
5. Headers tab
6. Procure por:
   - `Cache-Control` - Do Next.js
   - `CF-Cache-Status: HIT` - Do Cloudflare CDN
   - `Age: XXX` - Tempo que o recurso está em cache

### 2. Headers que você deve ver

**Para imagens/CSS/JS:**
```
Cache-Control: public, max-age=31536000, immutable
CF-Cache-Status: HIT (na segunda visita)
```

**Para HTML:**
```
Cache-Control: public, max-age=2592000, must-revalidate
CF-Cache-Status: HIT (na segunda visita)
```

---

## 🎯 Resultados Esperados

Com essas configurações:

✅ **Lighthouse vai parar de reclamar** de "efficient cache lifetime"  
✅ **Economia de 7 KiB** mencionada pelo Lighthouse  
✅ **Visitas repetidas serão instantâneas** (cache hit)  
✅ **Redução de custos de banda** no Vercel/servidor  

---

## ⚠️ Importante

- **Next.js (_next/static/)**: Já tem hash no nome do arquivo, então pode ter cache infinito
- **Imagens**: Se você atualizar uma imagem, mude o nome ou versione a URL
- **HTML**: Cache de 30 dias com `must-revalidate` garante que usuários vejam atualizações
- **Cloudflare Edge Cache**: Mantém cópia nos servidores deles (CDN global)

---

## 🔄 Quando Fazer Purge do Cache

- ✅ Após deploy de nova versão do site
- ✅ Se atualizou imagens/assets mantendo o mesmo nome
- ✅ Se encontrar conteúdo desatualizado sendo servido
- ❌ Não é necessário purge para arquivos _next/static/ (hash muda automaticamente)
