"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { OptimizedImage } from "@/components/ui/optimized-image"

export const AboutSection = () => {
  useScrollAnimation();

  return (
    <section className="py-20 bg-[#F6EEE1]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagem da Duda à esquerda */}
          <div className="fade-in">
            <OptimizedImage 
              src="/images/duda-about-presets.webp" 
              alt="Duda Berger - Mentora em Confeitaria"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Conteúdo à direita */}
          <div className="space-y-6">
            <h2 className="fade-in text-3xl md:text-4xl font-bold mb-8 text-[#D65B58]">
              Quem será sua Mentora
            </h2>
            
            <div className="space-y-4 leading-relaxed text-[#703535]">
              <p className="fade-in">
                De mochileira aventureira a confeiteira: minha história começou servindo café da manhã numa pousada boutique na Praia do Rosa, onde aprendi que produtos artesanais e locais valem ouro.
              </p>
              <p className="fade-in">
                Formada em Gastronomia pela UFPEL, descobri meu verdadeiro talento quando todos diziam que eu tinha "mão para bolo".
              </p>
              <p className="fade-in">
                Comecei no meio da pandemia, em setembro de 2020, numa cidade de 30 mil habitantes onde ninguém me conhecia. Meus primeiros testes? O aniversário do meu esposo (feito com caixinha de leite condensado como espátula), o batizado da minha afilhada e o aniversário do meu sobrinho.
              </p>
              <p className="fade-in">
                Foi ali que vi a mão de Deus: o produto era excepcional e eu seria capaz de faturar muito mais do que trabalhando para outras pessoas.
              </p>
              <p className="fade-in">
                Em janeiro de 2021 criei o Instagram da Conto Atelier. No primeiro ano bati R$ 10 mil/mês, no segundo cheguei a R$ 15 mil, e na alta temporada alcancei R$ 30 mil/mês com quatro funcionárias.
              </p>
              <p className="fade-in">
                Quando engravidei, escolhi ter mais tempo com meu filho. Repaginei tudo: transformei a confeitaria num formato menor, mais lucrativo, que me permite faturar bem enquanto cuido da minha família.
              </p>
              <p className="fade-in">
                Acredito que fazer bolos incríveis não basta – você precisa saber o que vender, como precificar e onde divulgar. E é exatamente isso que eu ensino: o lado estratégico que ninguém te conta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
