"use client";

import { useState } from "react";

const CalculatorSection = () => {
  const [cakesPerWeek, setCakesPerWeek] = useState(3);
  const [selectedPrice, setSelectedPrice] = useState(200);

  // Opções de preço
  const priceOptions = [200, 250, 300];

  // Cálculos
  const cakesPerMonth = cakesPerWeek * 4;
  const monthlyRevenue = cakesPerMonth * selectedPrice;

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#fbf7ef] to-[#f5ede0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4c4b2]/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b2a290]/20 rounded-full filter blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#D65B58] mx-auto">
            Descubra quanto você poderia estar faturando
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#d4c4b2]/30">
            {/* Slider Section */}
            <div className="mb-12">
              <div className="flex flex-col items-center mb-6">
                <label className="text-lg md:text-xl font-semibold text-[#703535] mb-3 text-center">
                  Quantos bolos você faz por semana?
                </label>
              </div>
              
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={cakesPerWeek}
                onChange={(e) => setCakesPerWeek(Number(e.target.value))}
                className="w-full h-3 bg-[#d4c4b2] rounded-lg appearance-none cursor-pointer slider-range"
                style={{
                  background: `linear-gradient(to right, #b94946 0%, #b94946 ${((cakesPerWeek - 1) / 49) * 100}%, #d4c4b2 ${((cakesPerWeek - 1) / 49) * 100}%, #d4c4b2 100%)`
                }}
              />
              <style jsx>{`
                .slider-range::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #b94946;
                  cursor: pointer;
                  box-shadow: 0 2px 8px rgba(185, 73, 70, 0.4);
                  transition: all 0.2s;
                }
                .slider-range::-webkit-slider-thumb:hover {
                  transform: scale(1.15);
                  box-shadow: 0 4px 12px rgba(185, 73, 70, 0.6);
                }
                .slider-range::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #b94946;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 2px 8px rgba(185, 73, 70, 0.4);
                  transition: all 0.2s;
                }
                .slider-range::-moz-range-thumb:hover {
                  transform: scale(1.15);
                  box-shadow: 0 4px 12px rgba(185, 73, 70, 0.6);
                }
              `}</style>
            </div>

            {/* Price Selection */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <label className="text-lg md:text-xl font-semibold text-[#703535]">
                  Preço médio do seu bolo:
                </label>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {priceOptions.map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={selectedPrice === price ? "btn-primary-xs" : "btn-primary-xs-outline"}
                  >
                    {formatCurrency(price)}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {/* Card - Faturamento mensal */}
              <div className="bg-gradient-to-br from-[#fbf7ef] to-[#f5ede0] rounded-2xl p-8 md:p-12 text-center border border-[#d4c4b2]/30">
                <div className="mb-4">
                  <div className="text-lg md:text-xl text-[#8f645f] mb-2">
                    {cakesPerWeek} {cakesPerWeek === 1 ? 'bolo' : 'bolos'}/semana × 4 semanas × {formatCurrency(selectedPrice)}
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-unbounded text-[#b94946]">
                    {formatCurrency(monthlyRevenue)}/mês
                  </div>
                </div>
                <div className="text-base md:text-lg text-[#703535] mt-6">
                  ({cakesPerMonth} {cakesPerMonth === 1 ? 'bolo' : 'bolos'} por mês)
                </div>
              </div>
            </div>

            {/* CTA Message */}
            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl text-[#703535] font-semibold">
                {monthlyRevenue >= 10000 ? (
                  <>Você está no caminho certo! No workshop, vamos te ensinar a manter essa consistência e crescer ainda mais.</>
                ) : monthlyRevenue >= 5000 ? (
                  <>Você está perto! No workshop, vamos te mostrar como chegar nos R$ 10.000/mês com estratégias que funcionam.</>
                ) : (
                  <>Imagina dobrar ou triplicar esse valor? No workshop você aprende a precificar melhor, vender mais e conquistar mais clientes!</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
