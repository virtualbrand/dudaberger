"use client";

import { useState } from "react";

const CalculatorSection = () => {
  const [cakePrice, setCakePrice] = useState(200);

  // Cálculos
  const monthlyGoal = 10000;
  const cakesPerMonth = Math.ceil(monthlyGoal / cakePrice);
  const cakesPerWeek = Math.ceil(cakesPerMonth / 4);

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
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#703535] mb-4">
            Descubra quantos bolos você precisa vender
          </h2>
          <p className="text-lg md:text-xl text-[#8f645f]">
            Arraste o controle e veja quantos bolos por semana você precisa para faturar R$ 10.000/mês
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#d4c4b2]/30">
            {/* Slider Section */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <label className="text-lg md:text-xl font-semibold text-[#703535]">
                  Se seu bolo custa:
                </label>
                <div className="text-3xl md:text-4xl font-bold text-[#b94946]">
                  {formatCurrency(cakePrice)}
                </div>
              </div>
              
              <input
                type="range"
                min={100}
                max={400}
                step={10}
                value={cakePrice}
                onChange={(e) => setCakePrice(Number(e.target.value))}
                className="w-full h-3 bg-[#d4c4b2] rounded-lg appearance-none cursor-pointer slider-range"
                style={{
                  background: `linear-gradient(to right, #b94946 0%, #b94946 ${((cakePrice - 100) / 300) * 100}%, #d4c4b2 ${((cakePrice - 100) / 300) * 100}%, #d4c4b2 100%)`
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
              
              <div className="flex justify-between mt-3 text-sm text-[#8f645f]">
                <span>R$ 100</span>
                <span>R$ 400</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Card 1 - Bolos/mês */}
              <div className="bg-gradient-to-br from-[#fbf7ef] to-[#f5ede0] rounded-2xl p-6 md:p-8 text-center border border-[#d4c4b2]/30">
                <div className="text-5xl md:text-6xl font-bold text-[#b94946] mb-2">
                  {formatCurrency(monthlyGoal)} ÷ {formatCurrency(cakePrice)} = {cakesPerMonth} bolos/mês
                </div>
                <div className="text-xl md:text-2xl font-bold text-[#703535] mt-4">
                  = {cakesPerWeek} bolos /semana
                </div>
              </div>

              {/* Card 2 - Bolos/semana */}
              <div className="bg-gradient-to-br from-[#fbf7ef] to-[#f5ede0] rounded-2xl p-6 md:p-8 text-center border border-[#d4c4b2]/30">
                <div className="text-5xl md:text-6xl font-bold text-[#b94946] mb-2">
                  {formatCurrency(monthlyGoal)} ÷ {formatCurrency(cakePrice)} = {Math.ceil(monthlyGoal / cakePrice / 4 * 10)} bolos/mês
                </div>
                <div className="text-xl md:text-2xl font-bold text-[#703535] mt-4">
                  = {Math.ceil(monthlyGoal / cakePrice / 4 * 10 / 4)} bolos /semana
                </div>
              </div>
            </div>

            {/* CTA Message */}
            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl text-[#703535] font-semibold">
                {cakesPerWeek <= 3 ? (
                  <>É totalmente possível! Você só precisa da estratégia certa.</>
                ) : cakesPerWeek <= 6 ? (
                  <>Desafiador, mas alcançável com organização e vendas estratégicas.</>
                ) : (
                  <>Parece muito? No workshop você aprende a precificar melhor e vender mais caro!</>
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
