// ...existing code...

export const HeroSection = () => {
  // ...existing code...

  return (
    <section
      className="h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/presets-hero-after.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-full w-full relative">
        <div className="absolute inset-0 flex items-center pointer-events-none z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div
              className="backdrop-blur-md rounded-2xl p-8 md:p-10 md:pb-10 lg:p-12 max-w-xl lg:max-w-2xl text-white shadow-2xl pointer-events-auto bg-[var(--color-primary-500)]"
              style={{ animation: 'slideInLeft 0.8s ease-out 0.3s both' }}
            >
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold !text-white"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
            >
              Foto que dá água na boca vende mais!
            </h1>
            
            <div 
              className="text-white mb-6 leading-relaxed text-base md:text-lg"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}
            >
              <p className="mb-3">
                Não basta a comida <strong className="text-white">ser gostosa</strong>, ela precisa <strong className="text-white">parecer gostosa!</strong>
              </p>
              <p className="mb-3">
                Antes dos seus clientes comprarem o seu produto, eles saboreiam com os olhos. E pra <strong className="text-white">vender mais</strong>, as suas fotos precisam ativar o <strong className="text-white">Efeito Água na Boca</strong> - a única técnica que faz qualquer pessoa sentir vontade de comer só de olhar.
              </p>
            </div>

            <div
              className="space-y-3"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.9s both' }}
            >
              <button
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 w-full text-base md:text-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
                onClick={() => {
                  const el = document.getElementById('investimento');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Quero despertar o Efeito Água na Boca
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
