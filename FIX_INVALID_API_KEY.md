# 🔧 Como Corrigir o Erro "Invalid API Key"

## Problema Identificado:

As chaves do Supabase no arquivo `.env.local` estão **incompletas/truncadas**. 

As chaves JWT do Supabase são muito longas (centenas de caracteres) e precisam estar completas para funcionar.

## ✅ Solução - Obter as Chaves Corretas:

### 1. Acesse o Supabase Dashboard:

Vá para: https://app.supabase.com/project/ijegivunztfwqidhsyau/settings/api

### 2. Copie as Chaves Completas:

Na página de configurações da API, você verá:

- **Project URL**: `https://ijegivunztfwqidhsyau.supabase.co`
- **anon public**: Uma chave JWT LONGA começando com `eyJ...` (copie TUDO)
- **service_role**: Outra chave JWT LONGA (copie TUDO)

⚠️ **IMPORTANTE**: As chaves JWT têm centenas de caracteres. Certifique-se de copiar TODA a chave, incluindo o final!

### 3. Atualize o arquivo `.env.local`:

Abra o arquivo `.env.local` na raiz do projeto e substitua pelas chaves completas:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ijegivunztfwqidhsyau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZWdpdnVuenRmd3FpZGhzeWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjY4NDYsImV4cCI6MjA0OTYwMjg0Nn0.COLE_O_RESTO_DA_CHAVE_AQUI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZWdpdnVuenRmd3FpZGhzeWF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDAyNjg0NiwiZXhwIjoyMDQ5NjAyODQ2fQ.COLE_O_RESTO_DA_CHAVE_AQUI
```

### 4. Reinicie o Servidor:

Após atualizar o `.env.local`:

1. Pare o servidor (Ctrl+C)
2. Reinicie: `npm run dev`

## 🔍 Como Verificar se as Chaves Estão Corretas:

Uma chave JWT válida do Supabase tem 3 partes separadas por pontos:

```
eyJxxxxx.eyJxxxxx.xxxxx
  HEADER  PAYLOAD  SIGNATURE
```

E geralmente tem **mais de 200 caracteres** no total.

## 📝 Exemplo de Chave Válida (formato):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmd4eXoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzEyMzQ1NiwiZXhwIjoxOTM4Njk5NDU2fQ.Abcd1234Efgh5678Ijkl9012Mnop3456Qrst7890Uvwx
```

(Este é apenas um exemplo, use suas chaves reais do Supabase!)

## 🚨 Ainda com Problema?

Se após copiar as chaves completas o erro persistir:

1. Verifique se não há espaços no início/fim das chaves
2. Certifique-se de que copiou a chave **anon** (não a service_role) para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Limpe o cache do navegador (Ctrl+Shift+Delete)
4. Teste em uma aba anônima do navegador

## 📞 Precisa de Ajuda?

Compartilhe a mensagem de erro completa do console do navegador (F12 > Console).
