"use client";
import React from "react";

const testimonials = [
  {
    text: "Os presets da A Confeiteira Próspera transformaram completamente minhas fotos! Antes eu passava horas tentando editar, agora em poucos cliques tenho fotos profissionais que realmente vendem.",
    image: "/images/testimonial-1.jpg",
    name: "Maria Silva",
    role: "Confeiteira"
  },
  {
    text: "Incrível como essas edições fazem diferença nas vendas! Meus bolos nunca pareceram tão apetitosos. Os clientes sempre comentam como as fotos chamam atenção.",
    image: "/images/testimonial-2.jpg", 
    name: "Ana Santos",
    role: "Doceira"
  },
  {
    text: "Economia de tempo e resultado profissional. Exatamente o que eu precisava para impulsionar meu negócio. Recomendo para todas as confeiteiras!",
    image: "/images/testimonial-3.jpg",
    name: "Carla Oliveira", 
    role: "Empresária"
  },
  {
    text: "As fotos dos meus doces ficaram com aquela cara de revista! Percebi o aumento nas encomendas logo na primeira semana usando os presets.",
    image: "/images/testimonial-4.jpg",
    name: "Lucia Costa",
    role: "Confeiteira"
  },
  {
    text: "Nunca imaginei que editar fotos pudesse ser tão fácil. Os presets são perfeitos para quem não tem tempo mas quer qualidade profissional.",
    image: "/images/testimonial-5.jpg",
    name: "Beatriz Alves",
    role: "Doceira Artesanal"
  },
  {
    text: "Meu Instagram nunca teve tanto engajamento! As fotos ficaram lindas e os clientes não param de elogiar. Valeu cada centavo investido.",
    image: "/images/testimonial-6.jpg",
    name: "Fernanda Lima",
    role: "Confeiteira Digital"
  }
];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-3 pb-3"
        style={{ animation: `scrollUp ${props.duration || 15}s linear infinite` }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name }, i) => (
                <div className="px-6 py-7 rounded-2xl bg-white shadow-lg max-w-xs w-full" key={i}>
                  {/* 5 Estrelas */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm md:text-base text-text-800 leading-relaxed mb-4">"{text}"</div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="font-bold text-primary-700 tracking-tight leading-5">{name}</div>
                      </div>
                    </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
  <section className="w-full py-12 lg:py-16 bg-gradient-to-br from-neutral-50 to-accent-50 overflow-hidden">
  <div className="container w-[86%] mx-auto md:px-8">

        {/* Título da seção */}
        <div className="text-center mb-10 scroll-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-3">
            O que nossas clientes falam sobre o Efeito Água na Boca
          </h2>
          <p className="text-lg text-text-600 max-w-2xl mx-auto leading-relaxed">
            Mais de 200 confeiteiras já dominaram a técnica e transformaram fotos amadoras em imagens que despertam desejo instantâneo - veja o que aconteceu com as vendas delas:
          </p>
        </div>

        {/* Colunas de depoimentos */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[500px] overflow-hidden">
          <div className="flex gap-[15px] md:gap-[20px] h-full">
            <TestimonialsColumn
              className="w-1/2 md:w-1/3 lg:w-1/4"
              testimonials={testimonials.slice(0, 2)}
              duration={20}
            />
            <TestimonialsColumn
              className="w-1/2 md:w-1/3 lg:w-1/4"
              testimonials={testimonials.slice(2, 4)}
              duration={25}
            />
            <TestimonialsColumn
              className="hidden md:block w-1/3 lg:w-1/4"
              testimonials={testimonials.slice(4, 6)}
              duration={30}
            />
            <TestimonialsColumn
              className="hidden lg:block w-1/4"
              testimonials={testimonials.slice(0, 2)}
              duration={35}
            />
          </div>
          
          {/* Gradiente de fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
