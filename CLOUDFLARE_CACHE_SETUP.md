# 🔑 Configuração de Cache Purge Automático - Cloudflare

## 🎯 **Objetivo**
Limpar automaticamente o cache da Cloudflare sempre que você fizer `git push origin master`.

## 📋 **Passos de Configuração**

### **1️⃣ Obter Credenciais da Cloudflare**

#### **A) Zone ID do seu domínio:**
1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Clique no seu domínio (`dudaberger.com.br`)
3. Na barra lateral direita, copie o **Zone ID**
   ```
   Exemplo: 1234567890abcdef1234567890abcdef
   ```

#### **B) API Token:**
1. No Cloudflare Dashboard, clique no seu **avatar** (canto superior direito)
2. Vá em **"My Profile"** → **"API Tokens"**
3. Clique **"Create Token"**
4. Use o template **"Custom token"**
5. Configure:
   ```
   Token name: GitHub Actions Cache Purge
   Permissions:
   - Zone:Cache Purge:Edit
   - Zone:Zone:Read
   
   Zone Resources:
   - Include:Specific zone:dudaberger.com.br
   ```
6. Clique **"Continue to summary"** → **"Create Token"**
7. **COPIE O TOKEN** (só aparece uma vez!)

### **2️⃣ Configurar Secrets no GitHub**

1. Vá para o repositório no GitHub: `https://github.com/virtualbrand/dudaberger`
2. Clique em **"Settings"** (aba no topo)
3. Na barra lateral, clique **"Secrets and variables"** → **"Actions"**
4. Clique **"New repository secret"**

#### **Secret 1:**
```
Name: CLOUDFLARE_ZONE_ID
Value: [SEU_ZONE_ID_AQUI]
```

#### **Secret 2:**
```
Name: CLOUDFLARE_API_TOKEN  
Value: [SEU_API_TOKEN_AQUI]
```

### **3️⃣ Como Funciona**

Agora, **automaticamente**:
1. ✅ Você faz `git push origin master`
2. ✅ GitHub Actions detecta o push
3. ✅ Executa o workflow de cache purge
4. ✅ Cloudflare limpa todo o cache
5. ✅ Site atualizado instantaneamente

### **4️⃣ Monitoramento**

Para verificar se funcionou:
1. Após fazer push, vá em **"Actions"** no GitHub
2. Você verá o workflow **"🗑️ Cloudflare Cache Purge"** rodando
3. Se verde ✅ = sucesso
4. Se vermelho ❌ = erro (verifique os secrets)

### **5️⃣ Teste Manual (Opcional)**

Você pode disparar manualmente:
1. Vá em **"Actions"** no GitHub  
2. Clique no workflow **"🗑️ Cloudflare Cache Purge"**
3. Clique **"Run workflow"** → **"Run workflow"**

## 🚀 **Vantagens**

- ✅ **Zero configuração**: Funciona automaticamente
- ✅ **Logs completos**: Vê exatamente o que aconteceu
- ✅ **Seguro**: Credenciais protegidas como secrets
- ✅ **Confiável**: GitHub Actions é extremamente estável
- ✅ **Gratuito**: Dentro dos limites do GitHub Actions

## ⚡ **Resultado**

Após configurar, **toda atualização no master = cache limpo instantaneamente!**

---

**💡 Dica:** Mantenha os tokens seguros e nunca commite eles no código!