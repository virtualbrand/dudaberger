'use client';

import Image from 'next/image';

const PropostaOffer = () => {
  return (
    <section className="w-full bg-[#f9f7f4] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Images */}
          <div className="space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/workshop/workshop-16.webp"
                alt="Bolo minimalista"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/workshop/workshop-17.webp"
                alt="Bolo sofisticado"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/workshop/workshop-18.webp"
                alt="Bolo personalizado"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B6F47] leading-tight">
              Hoje, <span className="italic">você não precisa escolher entre tradição ou modernidade</span>.
            </h2>

            <p className="text-lg text-gray-700">Você pode ter um bolo:</p>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>• Clean e minimalista</li>
              <li>• Contemporâneo e sofisticado</li>
              <li>• Que seja completamente à cara de vocês</li>
            </ul>

            <p className="text-lg text-gray-700">
              E ainda assim honrar o simbolismo milenar desse momento.
            </p>

            <div className="bg-[#8B6F47] text-white p-8 rounded-lg mt-8">
              <h3 className="text-2xl font-bold mb-4">É EXATAMENTE ISSO QUE CRIAMOS;</h3>
              
              <p className="text-lg mb-6">Bolos que unem:</p>
              
              <ul className="space-y-3 text-base">
                <li>
                  <strong>Design contemporâneo</strong> (nada de brega ou ultrapassado)
                </li>
                <li>
                  <strong>Significado profundo</strong> (cada detalhe pensado com intenção)
                </li>
                <li>
                  <strong>A essência de vocês</strong> (personalização total)
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-[#8B6F47] pl-6 py-4 mt-8">
              <p className="text-xl font-bold text-[#8B6F47] mb-4">AO LADO:</p>
              
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Carolina e Guilherme</strong> - ela pratica esqui, ele snowboard. também pediram que tivesse uma recordação do pet presente
                </li>
                <li>
                  <strong>Gabriela e Gabriel O Pensador</strong> - decoração inspirada no mar
                </li>
                <li>
                  <strong>Marcelle e Rafael</strong> - o casal é apaixonado pelo Star Wars
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropostaOffer;
