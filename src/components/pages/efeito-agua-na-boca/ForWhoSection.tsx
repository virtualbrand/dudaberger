import { Check } from "lucide-react"
import { CarouselComparing } from "./CarouselComparing"

export const ForWhoSection = () => {
  const targetAudience = [
    {
      title: "Cupcakes"
    },
    {
      title: "Biscoitos e Cookies"
    },
    {
      title: "Doces e Sobremesas"
    },
    {
      title: "Tortas, Mousses e Cremes"
    },
    {
      title: "Salgados"
    }
  ]

  return (
    <>
      <section className="w-full py-20 lg:py-24 bg-gradient-to-br from-neutral-50 to-accent-50">
  <div className="container w-[86%] mx-auto md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Coluna Esquerda - Título, Descrição e Lista */}
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold text-primary-700 scroll-fade-in">
                Como ativar o Efeito Água na Boca em qualquer doce?
              </h2>
              
              <p className="text-lg leading-relaxed text-chocolate-600 scroll-fade-in">
                Qualquer comida que você queira fazer alguém ficar com desejo só de olhar:
              </p>
              
              <div className="flex flex-col gap-4 pt-4 scroll-fade-in">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex flex-row gap-4 items-center">
                    <Check className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <p className="!font-bold text-primary-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Direita - Box Branco com Shadow */}
            <div className="bg-white rounded-2xl shadow-xl px-8 py-12 lg:px-10 lg:py-16 flex flex-col gap-6 scroll-fade-in">
              <p className="text-lg text-primary-700 leading-relaxed">
                Páscoa, Natal, Dia das Crianças, Dia da Mulher e qualquer outra data comemorativa na qual você queira{" "}
                <strong className="text-bold">multiplicar suas vendas!</strong>
                <br /><br />
                <span className="text-chocolate-600">
                  O <strong className="text-accent-600">Efeito Água na Boca</strong> funciona com qualquer tipo de doce, transformando fotos comuns em imagens que despertam vontade instantânea.
                </span>
              </p>
              
              <div>
                <button 
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold text-base px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl w-full lg:w-auto"
                  onClick={() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Quero ativar o efeito nos meus doces
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    <div className="w-full bg-gradient-to-br from-neutral-50 to-accent-50 pb-20">
      <div className="w-full scroll-fade-in">
        <CarouselComparing />
      </div>
    </div>
    </>
  )
}

export default ForWhoSection
