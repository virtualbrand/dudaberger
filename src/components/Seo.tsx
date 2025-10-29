import { Helmet } from 'react-helmet-async';
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
      // Inicia o preload assim que o componente monta
      startPreload();
    }
  }, [enableVantaPreload, startPreload]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Preload de imagens críticas específicas da página */}
      {criticalImages.map((imageUrl, index) => (
        <link 
          key={index}
          rel="preload" 
          as="image" 
          href={imageUrl} 
          fetchPriority="high" 
        />
      ))}

      {/* Open Graph for Facebook, LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema Markup) */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
