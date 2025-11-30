'use client';

import Image from 'next/image';

const PropostaStory = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="border-t-2 border-[#8B6F47] w-16 mb-8" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B6F47] leading-tight">
              O QUE NINGUÉM CONTA SOBRE O BOLO DE CASAMENTO
            </h2>

            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Nos últimos anos, <strong className="text-[#8B6F47]">muitos casais eliminaram o bolo da lista</strong>, por quê:
              </p>

              <ul className="space-y-3 text-base">
                <li>"É muito tradicional."</li>
                <li>"É coisa antiga."</li>
                <li>"Vamos fazer algo mais moderno."</li>
                <li>"Bolo de casamento não é bom"</li>
              </ul>

              <div className="border-l-4 border-[#8B6F47] pl-6 py-4 bg-[#f9f7f4]">
                <p className="text-lg">
                  Nossos <strong>casais que buscam cerimônias significativas</strong> acreditam em algo importante:
                </p>
                <p className="text-lg mt-4">
                  Eliminar uma tradição sem entender seu significado <strong className="text-[#8B6F47]">é jogar fora</strong> uma oportunidade de criar um momento <strong className="text-[#8B6F47]">genuinamente impactante</strong>."
                </p>
              </div>

              <div className="bg-[#8B6F47] text-white p-6 rounded-lg">
                <p className="text-xl font-bold mb-2">O problema nunca foi o bolo.</p>
                <p className="text-base">O problema é como era feito:</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>• Genérico</li>
                  <li>• Sem conexão com o casal</li>
                  <li>• Focado em "impressionar" ao invés de "significar"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/workshop/workshop-15.webp"
              alt="Casal no casamento"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropostaStory;
