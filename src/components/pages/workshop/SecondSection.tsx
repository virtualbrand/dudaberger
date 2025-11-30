"use client";

import ImmersiveScrollGallery from "@/components/ui/immersive-scroll-gallery";

const workshopImages = [
  { src: "/images/workshop/workshop-4.webp" },
  { src: "/images/workshop/workshop-9.webp" },
  { src: "/images/workshop/workshop-8.webp" },
  { src: "/images/workshop/workshop-19.webp" },
  { src: "/images/workshop/workshop-30.webp" },
  { src: "/images/workshop/workshop-32.webp" },
  { src: "/images/workshop/workshop-31.webp" },
];

export const SecondSection = () => {
  return (
    <section className="w-full bg-[#F6EEE1] py-16 md:py-24 px-6 md:px-0">
      <ImmersiveScrollGallery images={workshopImages}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[#D65B58] max-w-2xl mx-auto">
            Por que esse Workshop pode transformar o seu negócio?
          </h2>
          <p className="text-lg md:text-xl text-[#5a2a2a] max-w-6xl mx-auto leading-relaxed">
            Se você sonha em faturar com confeitaria mas não sabe por onde começar, este workshop foi feito para você.
            <br className="hidden md:block" />
            Em 2 dias, vou compartilhar minha estratégia que me levou do zero aos R$ 10.000/mês trabalhando de casa
            <br className="hidden md:block" />
            - e como aplicar isso na sua realidade, mesmo sem experiência ou investimento alto.
          </p>
        </div>
      </ImmersiveScrollGallery>
    </section>
  );
};

export default SecondSection;