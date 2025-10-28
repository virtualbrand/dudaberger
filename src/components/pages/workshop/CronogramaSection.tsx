export const CronogramaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-offwhite)] shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] relative z-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna da esquerda */}
          <div className="lg:col-span-5 lg:col-start-2">
            <div>
              <div className="text-[var(--color-primary-500)] text-sm mb-6 md:mb-8">
                08 E 09 DE NOVEMBRO | NO ZOOM | AO VIVO
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-[var(--color-amaranth-500)] mb-6 md:mb-8">
                Cronograma
              </h2>
              
              <p className="text-[var(--color-primary-500)] text-sm mb-8 lg:mb-0">
                Ambos os dias seguirão esse cronograma:
              </p>
            </div>
          </div>

          {/* Coluna da direita - Lista de horários */}
          <div className="lg:col-span-5">
            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-amaranth-500)]">13h30</div>
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-amaranth-500)]">Início</div>
              </div>

              <div className="flex justify-between items-end border-b border-[var(--color-primary-200)] pb-3 md:pb-4">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-amaranth-500)]">17h30</div>
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-amaranth-500)]">Encerramento*</div>
              </div>
            </div>

            {/* Nota de rodapé */}
            <p className="text-[var(--color-primary-500)] text-sm mt-6 md:mt-8 max-w-xl text-left lg:text-right lg:ml-auto">
              *Considere encerrar mais tarde, caso as participantes peçam para nos aprofundarmos em algum ponto. Porém, o conteúdo combinado será entregue dentro do horário programado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CronogramaSection;