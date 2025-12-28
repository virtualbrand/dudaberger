import NextImage from "next/image";

const HeroSection = () => {
  const links = [
    // {
    //   title: "Workshop de Confeitaria",
    //   description: "R$ 10.000 /mês trabalhando de casa com Confeitaria",
    //   url: "/workshop",
    //   image: "/images/links/workshop-cover.webp"
    // },
    {
   title: "WhatsApp",
   description: "Faça sua encomenda personalizada ou tire suas dúvidas",
   url: "https://wa.link/91yirq",
   image: "/images/links/whatsapp.webp"
    },
    // {
    //   title: "Guirlanda de Natal",
    //   description: "Receita completa + técnica de montagem do produto que me faz faturar até 6 mil a mais todo Natal",
    //   url: "/guirlanda-natal",
    //   image: "/images/links/guirlanda-cover.webp"
    // },
    // {
    //   title: "Efeito Água na Boca",
    //   description: "Presets para fotografia",
    //   url: "/efeito-agua-na-boca",
    // },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#d4c4b2]">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <NextImage
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <NextImage
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D65B58] mb-4">
            Duda Berger
          </h1>
        </div>

        {/* Links Container */}
        <div className="w-full max-w-lg space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group outline-none focus:outline-none focus-visible:outline-none"
            >
              <div className="
                bg-white 
                hover:bg-white/95 
                rounded-xl p-4 
                transition-all duration-300 
                transform group-hover:scale-105 
                shadow-lg hover:shadow-xl
              ">
                <div className="flex items-center space-x-5">
                  <div className="text-2xl flex-shrink-0">
                    {link.image && (
                      <NextImage 
                        src={link.image} 
                        alt={link.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h2 className="font-semibold text-[#703535] md:text-lg lg:text-xl">
                      {link.title}
                    </h2>
                    <p className="text-[#1C1C1D]/80 text-base">
                      {link.description}
                    </p>
                  </div>
                  <div className="text-[#D65B58] group-hover:text-[#D65B58]/80 transition-colors md:text-base lg:text-lg">
                    →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-neutral-300 text-sm">
            © {new Date().getFullYear()} Duda Berger - Todos os direitos reservados
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
