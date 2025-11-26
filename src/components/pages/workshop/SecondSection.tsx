"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export const SecondSection = () => {
  useScrollAnimation();

  return (
    <section 
      className="w-full pt-30 pb-60"
      style={{ backgroundColor: '#F6EEE1' }}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mt-16 mb-2">
          <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#C9184A' }}>
            Por que esse Workshop pode transformar o seu negócio?
          </h2>
          <p className="fade-in text-lg md:text-xl max-w-3xl mx-auto" style={{ color: '#23060E' }}>
            Se você sonha em faturar com confeitaria mas não sabe por onde começar, este workshop foi feito para você. Em 2 dias, você vai descobrir o método validado que me levou do zero aos R$ 10.000/mês trabalhando de casa - e como aplicar isso na sua realidade, mesmo sem experiência ou investimento alto.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SecondSection