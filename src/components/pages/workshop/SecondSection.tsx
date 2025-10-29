import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export const SecondSection = () => {
  useScrollAnimation();

  return (
    <section className="w-full bg-white pt-30 pb-60">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mt-16 mb-2">
          <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold !text-[var(--color-amaranth-500)] mb-4">
            Por que esse Workshop pode transformar o seu negócio?
          </h2>
          <p className="fade-in text-lg md:text-xl text-[var(--color-primary-500)] max-w-3xl mx-auto">
            Se você sonha em faturar com confeitaria mas não sabe por onde começar, este workshop foi feito para você. Em 2 dias, você vai descobrir o método validado que me levou do zero aos R$ 5.000/mês trabalhando de casa - e como aplicar isso na sua realidade, mesmo sem experiência ou investimento alto.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SecondSection