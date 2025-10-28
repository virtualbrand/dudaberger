import { workshopConfig } from "@/data/workshop-config";

export const CronogramaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-10 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] relative z-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna da esquerda */}
          <div className="lg:col-span-5 lg:col-start-2">
            <div>
              <div className="inline-block px-6 py-2 rounded-full bg-gray-200 text-[var(--color-amaranth-500)] text-sm mb-6 md:mb-8">
                {workshopConfig.event.date}
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-[var(--color-amaranth-500)] mb-6 md:mb-8">
                Cronograma
              </h2>
            </div>
          </div>

          {/* Coluna da direita - Lista de horários */}
          <div className="lg:col-span-5">
            <div className="space-y-6 md:space-y-8">
              {/* Sábado */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold !text-[var(--color-amaranth-500)] mb-4">Sábado</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">16h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Início</div>
                  </div>

                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">20h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Encerramento*</div>
                  </div>
                </div>
              </div>

              {/* Domingo */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold !text-[var(--color-amaranth-500)] my-4">Domingo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">9h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Início</div>
                  </div>

                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">12h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Intervalo</div>
                  </div>

                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">14h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Retorno</div>
                  </div>

                  <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">18h</div>
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-amaranth-500)]">Encerramento*</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota de rodapé */}
            <p className="text-[var(--color-primary-500)] text-sm mt-6 md:mt-8 max-w-xl text-left">
              *Considere encerrar mais tarde, caso as participantes peçam para nos aprofundarmos em algum ponto. Porém, o conteúdo combinado será entregue dentro do horário programado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CronogramaSection;