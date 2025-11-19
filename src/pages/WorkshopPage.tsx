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
  SecondSection
  // FinalCTASection,
} from '../components/pages/workshop'

const WorkshopPage = () => {
  return (
    <>
      <Seo
        title="R$ 10.000/mês trabalhando de casa com Confeitaria | Workshop Ao Vivo"
        description="2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa. Aprenda produto, precificação e vendas que realmente funcionam. 13 e 14 de dezembro no Zoom."
        canonical="https://dudaberger.com.br/workshop"
        enableVantaPreload={true}
        criticalImages={["/images/workshop-duda-logo.svg"]}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'Workshop: R$ 10.000/mês trabalhando de casa com Confeitaria',
          startDate: '2025-12-13',
          endDate: '2025-12-14',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'VirtualLocation',
            url: 'https://dudaberger.com.br/workshop',
          },
          description: '2 dias ao vivo para confeiteiras aprenderem o passo a passo completo para faturar da cozinha de casa: produto + lucro + venda.',
          url: 'https://dudaberger.com.br/workshop',
          offers: {
            '@type': 'Offer',
            price: '37',
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: 'https://dudaberger.com.br/workshop'
          },
          performer: {
            '@type': 'Person',
            name: 'Duda Berger'
          }
        }}
      />
      <HeroSection />
      <SecondSection />
      <PainSection />
      <HowToSection />
      <CronogramaSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
      <DisclaimerSection />
    </>
  );
}

export default WorkshopPage;