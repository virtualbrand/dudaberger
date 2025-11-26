/**
 * @deprecated Este componente não deve ser usado no Next.js 15.
 * Use a Metadata API nativa do Next.js em vez disso.
 * 
 * Exemplo:
 * export const metadata: Metadata = {
 *   title: 'Título da Página',
 *   description: 'Descrição...',
 *   openGraph: {...},
 * };
 * 
 * Ver: /src/app/workshop/page.tsx para exemplo completo
 */

// Componente stub para compatibilidade com código legado
// TODO: Remover após migração completa para App Router

import { useEffect } from 'react';
import { useVantaPreload } from '@/hooks/useVantaPreload';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  schemaMarkup?: object;
  enableVantaPreload?: boolean;
  criticalImages?: string[]; // Novas imagens críticas para preload
}

const Seo = ({ 
  title, 
  description, 
  canonical, 
  image, 
  schemaMarkup, 
  enableVantaPreload = false,
  criticalImages = []
}: SeoProps) => {
  const { startPreload } = useVantaPreload();

  useEffect(() => {
    if (enableVantaPreload) {
      startPreload();
    }
    
    // Log de aviso para desenvolvedores
    console.warn('[DEPRECATED] O componente Seo está deprecated. Use Next.js Metadata API.');
  }, [enableVantaPreload, startPreload]);

  // Retorna null - SEO é gerenciado pelo Next.js
  return null;
};

export default Seo;
