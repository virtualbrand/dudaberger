import { supabase } from './supabase';

/**
 * Script para criar um usuário administrador inicial
 * Execute este script uma vez para criar o primeiro usuário do sistema
 */

async function createAdminUser() {
  const email = 'admin@dudaberger.com'; // Altere para o email desejado
  const password = 'SenhaSegura123!'; // Altere para uma senha segura

  try {
    console.log('Criando usuário administrador...');
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: 'admin',
          name: 'Administrador',
        },
      },
    });

    if (error) {
      console.error('❌ Erro ao criar usuário:', error.message);
      return;
    }

    if (data.user) {
      console.log('✅ Usuário criado com sucesso!');
      console.log('📧 Email:', email);
      console.log('🆔 ID:', data.user.id);
      console.log('\n⚠️  IMPORTANTE: Verifique seu email para confirmar a conta (se a confirmação por email estiver habilitada no Supabase)');
      console.log('\n🔑 Use estas credenciais para fazer login:');
      console.log('   Email:', email);
      console.log('   Senha:', password);
    }
  } catch (err) {
    console.error('❌ Erro inesperado:', err);
  }
}

// Executa o script
createAdminUser();

/**
 * COMO USAR:
 * 
 * 1. Abra o terminal
 * 2. Navegue até a pasta do projeto
 * 3. Execute: npx tsx src/lib/create-admin-user.ts
 * 
 * OU adicione ao package.json:
 * "scripts": {
 *   "create-admin": "tsx src/lib/create-admin-user.ts"
 * }
 * 
 * E execute: npm run create-admin
 * 
 * NOTA: Você pode criar usuários diretamente pelo Supabase Dashboard em:
 * https://app.supabase.com/project/ijegivunztfwqidhsyau/auth/users
 */
