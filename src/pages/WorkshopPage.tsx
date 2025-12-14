import Seo from '@/components/Seo';
import SectionErrorBoundary from '@/components/SectionErrorBoundary';
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
        description="2 dias ao vivo para faturar R$ 10.000/mês com confeitaria trabalhando de casa. Aprenda produto, precificação e vendas que realmente funcionam. 17 e 18 de janeiro no Zoom."
        canonical="https://dudaberger.com.br/workshop"
        enableVantaPreload={false}
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
      <SectionErrorBoundary sectionName="Hero">
        <HeroSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Apresentação">
        <SecondSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Problemas">
        <PainSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Como Funciona">
        <HowToSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Cronograma">
        <CronogramaSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Investimento">
        <PricingSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Perguntas Frequentes">
        <FAQSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Sobre a Duda">
        <AboutSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary sectionName="Aviso Legal">
        <DisclaimerSection />
      </SectionErrorBoundary>
    </>
  );
}

export default WorkshopPage;