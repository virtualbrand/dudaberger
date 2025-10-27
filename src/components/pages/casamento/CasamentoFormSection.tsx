import ProgressIndicator from '@/components/ui/progress-indicator'

const CasamentoFormSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Formulário de Casamento
          </h1>
          <p className="text-lg text-gray-600">
            Complete as etapas abaixo para finalizar seu pedido
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <ProgressIndicator />
        </div>
      </div>
    </section>
  )
}

export default CasamentoFormSection