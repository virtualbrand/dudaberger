import Seo from '@/components/Seo';
import { 
  HeroSection, 
  HowToSection,
  PainSection, 
  PricingSection, 
  FAQSection, 
  AboutSection,
  CronogramaSection,
  DisclaimerSection,
  ConteudoSection,
  // FinalCTASection,
} from '../components/pages/workshop'

const WorkshopPage = () => {
  return (
    <>
            <Seo
        title="Do ZERO aos R$ 5.000/mês com Confeitaria | Workshop Ao Vivo"
        description="2 dias ao vivo para sair do zero e faturar R$ 5.000/mês com confeitaria caseira. Aprenda produto, precificação e vendas que realmente funcionam. 08 e 09 de novembro no Zoom."
        canonical="https://dudaberger.com.br/workshop-confeitaria-casa"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'Workshop: Do ZERO aos R$ 5.000/mês com Confeitaria',
          startDate: '2025-11-08',
          endDate: '2025-11-09',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'VirtualLocation',
            url: 'https://dudaberger.com.br/workshop-confeitaria-casa',
          },
          description: '2 dias ao vivo para confeiteiras aprenderem o passo a passo completo para faturar da cozinha de casa: produto + lucro + venda.',
          url: 'https://dudaberger.com.br/workshop-confeitaria-casa',
          offers: {
            '@type': 'Offer',
            price: '37',
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: 'https://dudaberger.com.br/workshop-confeitaria-casa'
          },
          performer: {
            '@type': 'Person',
            name: 'Duda Berger'
          }
        }}
      />
      <HeroSection />
      <HowToSection />
      <PainSection />
      <ConteudoSection />
      <CronogramaSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
      <DisclaimerSection />
    </>
  );
}

export default WorkshopPage;