# 🔍 Como Verificar GitHub Actions - Guia Prático

## 📍 **Onde Verificar os Actions**

### **1️⃣ Via GitHub Web**
1. Acesse: `https://github.com/virtualbrand/dudaberger`
2. Clique na aba **"Actions"** (no topo da página)
3. Você verá todos os workflows que rodaram

### **2️⃣ Última Execução**
Após o seu push de agora, você deve ver:
```
🗑️ Cloudflare Cache Purge
⚡ MAJOR: Performance optimization - 89% bundle reduction
by jsonribeiro • now • [status]
```

## 🟢 **Status dos Actions**

### **✅ Sucesso (Verde)**
- **Ícone**: ✅ 
- **Significado**: Cache purge executado com sucesso
- **O que aconteceu**: Cloudflare cache foi limpo

### **🟡 Em Execução (Amarelo)**  
- **Ícone**: 🟡
- **Significado**: Workflow ainda rodando
- **Aguarde**: Geralmente leva 30-60 segundos

### **❌ Falha (Vermelho)**
- **Ícone**: ❌
- **Significado**: Erro na execução
- **Causa comum**: Secrets mal configurados

## 🔧 **Troubleshooting**

### **Se aparecer ❌ (Falha):**

1. **Clique no workflow falhado**
2. **Clique no job "🧹 Limpar Cache Cloudflare"**
3. **Veja os logs de erro**

#### **Erros Comuns:**

**❌ "CLOUDFLARE_ZONE_ID not found"**
```
Solução: Configurar secret CLOUDFLARE_ZONE_ID no GitHub
```

**❌ "CLOUDFLARE_TOKEN not found"**  
```
Solução: Configurar secret CLOUDFLARE_API_TOKEN no GitHub
```

**❌ "Invalid token"**
```
Solução: Regenerar API Token na Cloudflare
```

## 🎯 **Como Testar Manualmente**

Se quiser forçar uma execução:

1. Vá em **Actions** no GitHub
2. Clique no workflow **"🗑️ Cloudflare Cache Purge"**
3. Clique **"Run workflow"** (botão azul)
4. Clique **"Run workflow"** novamente
5. Aguarde a execução

## 📊 **Verificar se Cache Foi Limpo**

### **Método 1: Headers HTTP**
```bash
curl -I https://dudaberger.com.br
```
Procure por: `CF-Cache-Status: MISS` (primeira visita após purge)

### **Método 2: DevTools**
1. Abra o site: `https://dudaberger.com.br`
2. F12 → Network tab
3. Recarregue a página
4. Veja se recursos mostram `200` (novo) vs `304` (cache)

### **Método 3: Cloudflare Dashboard**
1. Cloudflare Dashboard → seu domínio
2. **Analytics** → **Caching**
3. Veja o gráfico de "Cache Hit Ratio"

## 🚀 **Logs de Sucesso**

Quando funcionar, você verá nos logs:
```
🎉 Cache da Cloudflare limpo com sucesso!
🚀 Site atualizado em: https://dudaberger.com.br
⏰ Timestamp: Mon Nov  4 12:48:00 UTC 2025
👤 Autor: jsonribeiro
💬 Commit: ⚡ MAJOR: Performance optimization...
🔗 Hash: 5a980f0
📊 Próximos acessos ao site terão conteúdo 100% atualizado!
```

## ⚡ **Status Atual**

**Baseado no seu push de agora:**
- **Commit**: `5a980f0`
- **Trigger**: Push para master ✅
- **Esperado**: Action rodando em 30-60 segundos
- **Resultado**: Cache purge automático

---

**🔗 Link direto**: `https://github.com/virtualbrand/dudaberger/actions`

Clique lá agora para ver o status! 👆