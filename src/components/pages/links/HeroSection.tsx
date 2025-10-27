const HeroSection = () => {
  const links = [
    {
      title: "Guirlanda de Natal",
      description: "Aprenda a fazer Guirlandas",
      url: "/guirlanda-natal",
      image: "/images/links/guirlanda-cover.webp"
    },
    {
      title: "Workshop de Confeitaria",
      description: "Aprenda comigo",
      url: "/workshop",
      image: "/images/links/workshop-cover.webp"
    },
    // {
    //   title: "Efeito Água na Boca",
    //   description: "Presets para fotografia",
    //   url: "/efeito-agua-na-boca",
    // },
       {
      title: "WhatsApp",
      description: "Encomendas",
      url: "https://wa.link/91yirq",
      image: "/images/links/whatsapp.webp"
    }
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/images/links/hero-desktop.webp"
        alt="Duda Berger Links"
        className="absolute inset-0 h-full w-full object-cover object-center hidden md:block"
        style={{ 
          imageRendering: 'crisp-edges',
          filter: 'contrast(1.02) brightness(1.01)'
        }}
        loading="eager"
        decoding="sync"
      />
      
      {/* Mobile background image */}
      <img
        src="/images/links/hero-mobile.webp"
        alt="Duda Berger Links"
        className="absolute inset-0 h-full w-full object-cover object-center block md:hidden"
        style={{ 
          imageRendering: 'crisp-edges',
          filter: 'contrast(1.02) brightness(1.01)'
        }}
        loading="eager"
        decoding="sync"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-[5]" />
      
      {/* Content overlay */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Duda Berger
          </h1>
        </div>

        {/* Links Container */}
        <div className="w-full max-w-md space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="
                backdrop-blur-md bg-white/10 
                hover:bg-white/15 
                rounded-xl p-4 
                transition-all duration-300 
                transform group-hover:scale-105 
                shadow-lg hover:shadow-xl
                border border-white/20 hover:border-white/30
                group-hover:backdrop-blur-lg
              ">
                <div className="flex items-center space-x-5">
                  <div className="text-2xl flex-shrink-0">
                    {link.image && (
                      <img 
                        src={link.image} 
                        alt={link.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold !text-white text-xl drop-shadow-lg">
                      {link.title}
                    </h3>
                    <p className="text-white/90 text-base drop-shadow-md">
                      {link.description}
                    </p>
                  </div>
                  <div className="text-white/70 group-hover:text-white transition-colors text-xl">
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
