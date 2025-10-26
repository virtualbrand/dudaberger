import { Check } from "lucide-react";
import { useState } from "react";
import { InteractiveHoverButton } from "../../ui/interactive-hover-button";
import { Progress } from "@/components/ui/progress";
import { getPrimaryButtonText, getHoverButtonText, getProgressText, getCurrentLot, getInstallmentPrice, getPaymentLink } from "@/data/workshop-config";
import PresetAccessModal from "./PresetAccessModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useVantaEffect } from "@/hooks/useVantaEffect";

const PricingSection = () => {
  useScrollAnimation();
  const [showModal, setShowModal] = useState(false)
  const vantaRef = useVantaEffect({
    highlightColor: 0x800F2F,
    midtoneColor: 0xFFB3C1,
    lowlightColor: 0xA4133C,
    baseColor: 0x23060E,
  });

  // Função que redireciona direto para o checkout
  const handleCheckout = () => {
    const paymentUrl = getPaymentLink();
    window.location.href = paymentUrl;
  }

  // const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <section 
      ref={vantaRef}
      className="w-full py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div id="investimento" className="mx-auto max-w-5xl px-6 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center !text-white font-kumbh fade-in">
              Quanto você vai investir para adquirir todo esse conhecimento?
            </h2>
          </div>
          <div className="bg-white/80 rounded-3xl shadow-2xl shadow-zinc-950/5">
            <div className="grid items-center gap-12 divide-y p-8 md:grid-cols-2 md:divide-x md:divide-y-0">
              {/* Box de preço */}
              <div className="pb-12 text-center md:pb-0 md:pr-12">
                {/* <h3 className="text-2xl md:text-2xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">Efeito Água na Boca</h3> */}
                {/* <p className="text-lg text-foreground font-kumbh font-normal">O efeito que faz seus doces parecerem irresistíveis</p> */}
                <span className="mb-6 mt-6 inline-block text-5xl font-bold">
                  <span className="block text-sm md:text-base text-gray-700 line-through font-kumbh" style={{ opacity: 0.7 }}>R$ {getCurrentLot().originalPrice}</span>
                  <span className="block text-4xl md:text-5xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">R$ {getCurrentLot().currentPrice}</span>
                  <span className="block text-lg md:text-xl font-bold !text-[var(--color-amaranth-500)] font-kumbh">ou {getInstallmentPrice()}</span>
                </span>
                <div className="flex flex-col gap-4 max-w-[360px]">
                  <InteractiveHoverButton
                    text={getPrimaryButtonText()}
                    hoverText={getHoverButtonText()}
                    className="w-full"
                    onClick={handleCheckout}
                  />
                  <div className="flex flex-col gap-2">
                    <Progress
                      value={getCurrentLot().soldPercentage}
                      className="w-full h-2 bg-white/10 rounded-full"
                      barClassName="bg-[#996b74] rounded-full transition-all"
                    />
                    <span className="text-sm text-grey-700">{getProgressText()}</span>
                  </div>
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
                <ul role="list" className="space-y-2 text-foreground text-base md:text-lg font-kumbh font-normal">
                  {[
                    'Planilha de precificação',
                    'Template de pesquisa de mercado',
                    'Scripts de atendimento no WhatsApp prontos',
                    'Checklist dos primeiros 30 dias'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-4 text-[#C9184A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground mt-6 text-sm font-kumbh font-normal">Ideal para confeiteiras que, assim como eu em 2020, têm mão pra bolo mas ainda não descobriram como transformar esse talento em um negócio lucrativo e organizado.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Modal mantido no projeto mas não utilizado por enquanto */}
        <PresetAccessModal open={showModal} onClose={handleCloseModal} />
      </div>
    </section>
  )
}

export default PricingSection;
