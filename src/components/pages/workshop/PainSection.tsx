
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Componente para cada item da lista com efeito de riscar
const CheckboxItem = ({ text }: { text: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    setIsChecked(checked === true);
  };

  return (
    <div className="scroll-left flex items-start gap-4 text-white">
      <Checkbox 
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        className="mt-1"
        aria-label={text}
      />
      <p className={`text-base leading-relaxed transition-all duration-300 ${
        isChecked ? 'line-through opacity-60' : ''
      }`}>
        {text}
      </p>
    </div>
  );
};

const PainSection = () => {
  useScrollAnimation();

  return (
    <section 
      className="w-full py-24 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#23060E] via-[#800F2F] to-[#23060E]"
    >
      {/* Gradiente estático para performance */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A4133C] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFB3C1] rounded-full filter blur-3xl" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <h2 className="fade-in text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Você está presa em alguma dessas situações?
        </h2>
        <p className="fade-in text-lg text-center text-white mb-8 max-w-6xl mx-auto">
          Se você marcar pelo menos 3 dessas situações, o que falta é estratégia clara. <br className="hidden xl:block" />
           Comecei do zero no meio da pandemia, numa cidade pequena onde não conhecia ninguém, <br className="hidden xl:block" />
           e cheguei a R$ 10 mil/mês no primeiro ano porque fui direto ao que funciona. <br className="hidden xl:block" />
           E é o meu método validado que você vai aprender neste workshop.
        </p>
        
        <div className="fade-in max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl text-left">
          <div className="space-y-6">
            <CheckboxItem 
              text="Faz bolos deliciosos, mas não sabe como transformar isso em dinheiro de verdade"
            />
            
            <CheckboxItem 
              text="Trabalha muito e ganha pouco porque não sabe precificar corretamente"
            />
            
            <CheckboxItem 
              text="Se sente perdida sem saber por onde começar ou o que vender primeiro"
            />
            
            <CheckboxItem 
              text="Tem medo de não conseguir clientes porque não tem seguidores ou é nova na cidade"
            />
            
            <CheckboxItem 
              text="Não tem dinheiro para investir em equipamentos caros ou cozinha industrial"
            />
            
            <CheckboxItem 
              text="Quer trabalhar de casa para ter mais tempo com os filhos, mas não sabe se é possível faturar bem assim"
            />
            
            <CheckboxItem 
              text="Já tentou vender mas não deu certo e agora está com medo de tentar de novo"
            />
            
            <CheckboxItem 
              text="Sonha em ter independência financeira mas não acredita que a confeitaria pode te dar isso"
            />
          </div>
        </div>
      </div>
  </section>
  );
};

export default PainSection;
