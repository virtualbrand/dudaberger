
const PainSection = () => (
  <section className="w-full py-20 lg:py-24 bg-[var(--color-primary-500)]">
    <div className="container mx-auto px-4 md:px-8 text-center">
     <h2
       className="text-3xl md:text-4xl font-bold !text-white mb-6 scroll-fade-in"
     >
       Mas suas fotos não estão ativando o Efeito Água na Boca...
     </h2>
      <p className="text-white mb-4 font-normal scroll-fade-in"
         style={{ animationDelay: '0.2s' }}
       >
         Você não precisa ser uma fotógrafa profissional e nem ter a melhor câmera para despertar desejo nos seus clientes.
       </p>
      <p className="text-white mb-8 font-normal scroll-fade-in"
         style={{ animationDelay: '0.4s' }}
       >
         O segredo não está no equipamento, mas em dominar o <strong className="font-bold">Efeito Água na Boca</strong> - a técnica que faz o cérebro "sentir" o sabor pela foto. Com um celular básico e os gatilhos visuais certos, é possível criar fotos que fazem qualquer pessoa salivar só de olhar.
       </p>
      <button
        className="mt-2 bg-[#CC8A3A] hover:bg-[#b8772d] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg font-kumbh scroll-fade-in hover:scale-105 active:scale-95"
        style={{ animationDelay: '0.6s' }}
        onClick={() => {
          const el = document.getElementById('investimento');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Quero dominar o efeito agora
      </button>
    </div>
  </section>
);

export default PainSection;
