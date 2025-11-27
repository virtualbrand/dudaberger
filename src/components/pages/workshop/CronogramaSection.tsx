import { workshopConfig } from "@/data/workshop-config";

export const CronogramaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#fbf7ef] shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] relative z-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna da esquerda */}
          <div className="lg:col-span-5 lg:col-start-2">
            <div>
              <div className="fade-in inline-block px-6 py-2 rounded-full bg-[#d4c4b2] text-sm mb-6 md:mb-8 text-[#2e1515]">
                {workshopConfig.event.date}
              </div>
              
              <h2 className="fade-in text-3xl md:text-4xl lg:text-5xl font-bold font-bold mb-6 md:mb-8 text-[#D65B58]">
                Cronograma
              </h2>
            </div>
          </div>

          {/* Coluna da direita - Lista de horários */}
          <div className="lg:col-span-5">
            <div className="space-y-6 md:space-y-8">
              {/* Sábado */}
              <div className="mb-8">
                <h3 className="fade-in text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#D65B58]">Sábado</h3>
                <div className="space-y-4">
                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">16h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Início</div>
                  </div>

                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">20h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Encerramento*</div>
                  </div>
                </div>
              </div>

              {/* Domingo */}
              <div>
                <h3 className="fade-in text-lg md:text-xl lg:text-2xl font-bold my-4 text-[#D65B58]">Domingo</h3>
                <div className="space-y-4">
                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">9h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Início</div>
                  </div>

                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">12h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Intervalo</div>
                  </div>

                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">14h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Retorno</div>
                  </div>

                  <div className="fade-in flex justify-between items-end border-b border-[#e8d4d4] pb-3 md:pb-4">
                    <div className="text-md md:text-xl font-bold text-[#703535]">18h</div>
                    <div className="text-md md:text-xl font-bold text-[#703535]">Encerramento*</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota de rodapé */}
            <p className="fade-in text-sm mt-6 md:mt-8 max-w-xl text-left text-[#703535]">
              *Considere encerrar mais tarde, caso as participantes peçam para nos aprofundarmos em algum ponto. Porém, o conteúdo combinado será entregue dentro do horário programado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CronogramaSection;