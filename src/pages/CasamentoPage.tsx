import { CasamentoFormSection } from '@/components/pages/casamento'
import Seo from '@/components/Seo'

const CasamentoPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Seo
        title="Formulário de Casamento | Duda Berger"
        description="Complete nosso formulário multistep para finalizar seu pedido de casamento."
        canonical="https://dudaberger.com.br/casamento"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Formulário de Casamento',
          url: 'https://dudaberger.com.br/casamento',
        }}
      />
      <CasamentoFormSection />
    </div>
  )
}

export default CasamentoPage