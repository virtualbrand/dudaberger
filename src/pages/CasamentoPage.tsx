import { useState } from 'react'
import { StartSection } from '@/components/pages/casamento'
import CasamentoSection from '@/components/pages/casamento/CasamentoSection'
import Seo from '@/components/Seo'

const CasamentoPage = () => {
  const [hasStarted, setHasStarted] = useState(false)

  const handleStart = () => {
    setHasStarted(true)
  }

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
      {!hasStarted ? (
        <StartSection onStart={handleStart} />
      ) : (
        <CasamentoSection />
      )}
    </div>
  )
}

export default CasamentoPage