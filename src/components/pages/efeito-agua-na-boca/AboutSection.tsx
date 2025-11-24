
export const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-50 to-accent-50">
      <div className="max-w-6xl w-[90%] mx-auto md:px-8">
        <div className="md:flex items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative scroll-fade-in">
              <img 
                src="/images/duda-about-presets.webp" 
                alt="Duda Berger confeitando" 
                className="w-full min-h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="scroll-fade-in">
              <div className="flex items-center mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-700">Quem é a Duda Berger?</h2>
                </div>
              </div>
                
                <div className="space-y-4 text-chocolate-600 leading-relaxed">
                  <p>
                    Formada em Gastronomia pela UFPEL, sempre gostei de fotografia e fiz um curso básico para registrar meus pratos. Quando comecei na confeitaria, criei meus próprios presets específicos para realçar doces e algo incrível aconteceu: meus bolos vendiam muito mais que o normal.
                    As fotos tinham algo especial - despertavam vontade de comer só de olhar.</p>
                    <p>Logo outras confeiteiras começaram a perguntar: "O que você faz para suas fotos ficarem tão irresistíveis?"
                    Foi aí que percebi: eu havia criado, intuitivamente, presets que ativam os gatilhos visuais do apetite.</p>
                    <p>Assim nasceu o <strong>Efeito Água na Boca.</strong></p>
                    <p>Quando comecei a compartilhar meus presets exclusivos com outras confeiteiras, os resultados foram impressionantes. Fotos que antes passavam despercebidas começaram a gerar comentários como "nossa, que vontade!" e, principalmente, mais vendas.</p>
                    <p>Hoje, mais de 200 confeiteiras já usam meus presets exclusivos e comprovaram: quando você aplica as configurações certas, seus doces não competem por preço - competem por desejo.
                    Minha missão é compartilhar os presets que criei especificamente para fazer doces parecerem irresistíveis.
                    Porque uso apenas meu celular e acredito que toda confeiteira pode ter fotos que fazem jus à qualidade dos seus doces.
                    Agora é sua vez de usar meus presets e dominar o <strong>Efeito Água na Boca.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default AboutSection
