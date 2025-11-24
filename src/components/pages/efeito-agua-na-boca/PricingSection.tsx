import { GradientBackground } from "../../ui/gradient-background"
import { Check } from "lucide-react"

const PricingSection = () => {
  return (
    <GradientBackground
      gradients={[ 
        "linear-gradient(135deg, #CC4C31 0%, #8D412A 100%)",
        "linear-gradient(135deg, #8D412A 0%, #CC4C31 100%)"
      ]}
      animationDuration={8}
      animationDelay={0.5}
      className="py-16 md:py-24"
    >
      <div id="investimento" className="mx-auto max-w-5xl px-6 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center !text-white font-kumbh scroll-fade-in">
            Investimento
          </h2>
        </div>
        <div className="bg-white/80 rounded-3xl shadow-2xl shadow-zinc-950/5">
          <div className="grid items-center gap-12 divide-y p-8 md:grid-cols-2 md:divide-x md:divide-y-0">
            {/* Box de preço */}
            <div className="pb-12 text-center md:pb-0 md:pr-12">
              <h3 className="text-2xl md:text-2xl font-bold text-primary-700 font-kumbh">Efeito Água na Boca</h3>
              <p className="text-lg text-foreground font-kumbh font-normal">O efeito que faz seus doces parecerem irresistíveis</p>
              <span className="mb-6 mt-6 inline-block text-5xl font-bold">
                {/* <span className="block text-lg text-gray-900 line-through font-normal mb-1 font-kumbh">R$ 127</span> */}
                <span className="block text-sm md:text-base text-gray-700 line-through font-kumbh" style={{ opacity: 0.7 }}>R$ 97</span>
                <span className="block text-4xl md:text-5xl font-bold text-[#CC4C31] font-kumbh">R$ 67</span>
                <span className="block text-lg md:text-xl font-bold text-[#CC4C31] font-kumbh">ou 11x R$ 7,44</span>
              </span>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://pay.hotmart.com/T86837978R?off=uq6jsrns&bid=1756069046655&offDiscount=DESCONTO",
                      "noopener,noreferrer"
                    )
                  }
                  className="mt-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg font-kumbh text-lg md:text-xl hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(242,185,75,0.15)",
                  }}
                >
                  Quero o efeito agora
                </button>
              </div>
              <div className="flex items-center justify-center pt-4">
                  <img 
                    src="/images/formas-pagamento.svg" 
                    alt="Formas de pagamento aceitas: Visa, Mastercard, American Express, Elo, Hipercard, Diners, PIX" 
                    className="h-7 md:h-8 rounded-md px-2 py-1 filter grayscale contrast-80 brightness-10"
                  />
              </div>
            </div>
            {/* Lista de vantagens */}
            <div className="relative">
              <ul role="list" className="space-y-4 text-foreground text-base md:text-lg font-kumbh font-normal">
                {[
                  '10 presets profissionais',
                  'Edição com App gratuito',
                  'Aulas de edição na prática',
                  'Acesso vitalício'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-4 text-[#CC4C31]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground mt-6 text-sm font-kumbh font-normal">Ideal para confeiteiras que querem transformar fotos amadoras em imagens que despertam vontade irresistível.</p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}

export default PricingSection
