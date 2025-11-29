import { CasamentoFormSection } from '@/components/pages/casamento'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulário de Casamento | Duda Berger',
  description: 'Complete nosso formulário multistep para finalizar seu pedido de casamento.',
  openGraph: {
    title: 'Formulário de Casamento | Duda Berger',
    description: 'Complete nosso formulário multistep para finalizar seu pedido de casamento.',
    url: 'https://dudaberger.com.br/casamento',
  },
}

export default function CasamentoPage() {
  return (
    <div className="w-full min-h-screen">
      <CasamentoFormSection />
    </div>
  )
}
