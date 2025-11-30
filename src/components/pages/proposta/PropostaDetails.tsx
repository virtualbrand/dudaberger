'use client';

import Image from 'next/image';

const PropostaDetails = () => {
  return (
    <section className="w-full bg-[#f9f7f4] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Proposta */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-[#8B6F47] mb-2">Proposta</h2>
              <div className="h-1 w-16 bg-[#D4A574]" />
            </div>

            {/* O Bolo */}
            <div className="bg-white p-8 rounded-lg border-2 border-[#8B6F47]">
              <h3 className="text-2xl font-bold text-[#8B6F47] mb-6">O Bolo</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li>• Bolo 2 andares cenográfico</li>
                <li>• Decoração branco com texturas de conchas e areia</li>
                <li>• Bolo de corte: 2,5kg</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <p>• Adicional andar R$145</p>
                <p>• Adicional bolo de corte 1,2kg R$130</p>
                <p>• Entrega com motorista R$280</p>
              </div>
            </div>

            {/* Investimento */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-[#8B6F47]">Investimento e forma de pagamento</h3>
              <div className="h-1 w-16 bg-[#D4A574]" />
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-4xl font-bold text-[#8B6F47] mb-2">R$ 740,00</p>
                <p className="text-xl text-gray-600 mb-4">ou 2x R$370</p>
                <p className="text-gray-700">
                  A data é reservada a partir do aceite e pagamento integral por pix ou crédito
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Validade Orçamento: .11.novembro.2025</p>
                </div>
              </div>
            </div>

            {/* Oferta Especial */}
            <div className="bg-[#8B6F47] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">À vista até 28.outubro</h3>
              <p className="text-4xl font-bold mb-2">R$ 620,00 por pix</p>
              <p className="text-base">
                uma oferta especial para os noivos que confirmarem em até 6 dias à vista: condição exclusiva pensada com muita atenção para vocês!
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-full min-h-[800px]">
            <div className="sticky top-8">
              <div className="relative h-[800px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/workshop/workshop-20.webp"
                  alt="Proposta de casamento"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropostaDetails;
