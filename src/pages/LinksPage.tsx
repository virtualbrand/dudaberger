import HeroSection from '../components/pages/links/HeroSection'
import Seo from '@/components/Seo';

const LinksPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Seo
        title="Duda Berger | Links"
        description="Links úteis e importantes da Duda Berger - Confeiteira."
        canonical="https://dudaberger.com.br/links"
        criticalImages={["/images/links/hero-desktop.webp"]}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Duda Berger',
          url: 'https://dudaberger.com.br/',
        }}
      />
      <HeroSection />
    </div>
  );
}

export default LinksPage;