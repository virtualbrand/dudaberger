'use client';

import Image from 'next/image';

const PropostaFinal = () => {
  return (
    <section className="w-full bg-[#8B6F47] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center text-white">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">UMA ÚLTIMA COISA IMPORTANTE</h2>
            
            <p className="text-lg leading-relaxed">
              Este não é só um trabalho pra mim.
            </p>
            
            <p className="text-lg leading-relaxed">
              Quando você escolhe ter o bolo do seu casamento criado aqui, você está escolhendo alguém que:
            </p>

            <ul className="space-y-3 text-base">
              <li>• Vai tratar seu projeto como único (porque é)</li>
              <li>• Vai se importar com cada detalhe (porque importa)</li>
              <li>• Vai estar pensando em vocês enquanto cria cada elemento</li>
              <li>• Vai garantir que o resultado final seja digno do dia mais importante da sua vida</li>
            </ul>

            <p className="text-lg leading-relaxed">
              E isso, pra mim, não tem preço.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/workshop/workshop-21.webp"
              alt="Casal feliz"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-white text-[#8B6F47] p-8 rounded-lg text-center">
          <h3 className="text-3xl font-bold mb-4">À vista até 28.outubro</h3>
          <p className="text-5xl font-bold mb-4">R$ 620,00 por pix</p>
          <p className="text-lg">
            uma oferta especial para os noivos que confirmarem em até 6 dias à vista: condição exclusiva pensada com muita atenção para vocês!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropostaFinal;
