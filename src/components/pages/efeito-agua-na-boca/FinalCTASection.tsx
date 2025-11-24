
import { useState } from "react";
import { GradientBackground } from "../../ui/gradient-background";
import PresetAccessModal from "./PresetAccessModal";

const FinalCTASection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <GradientBackground
      gradients={[ 
        "linear-gradient(135deg, #CC4C31 0%, #8D412A 100%)",
        "linear-gradient(135deg, #8D412A 0%, #CC4C31 100%)"
      ]}
      animationDuration={8}
      animationDelay={0.5}
      className="py-16 md:py-24"
    >
  <div className="w-[90%] max-w-[800px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 scroll-fade-in">
          Pronta para ativar o Efeito Água na Boca e multiplicar suas vendas?
        </h2>
        <p className="text-lg text-white mb-8 scroll-fade-in">
          Pare de perder vendas por causa de fotos sem impacto. Domine o Efeito Água na Boca e transforme cada foto em uma oportunidade de venda.
        </p>
        <button
          className="bg-[#CC8A3A] hover:bg-[#b8772d] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg font-kumbh text-lg scroll-fade-in hover:scale-105 active:scale-95"
          onClick={handleOpenModal}
        >
          Quero dominar o efeito água na boca agora
        </button>
        <PresetAccessModal open={showModal} onClose={handleCloseModal} />
      </div>
    </GradientBackground>
  );
};

export default FinalCTASection;
