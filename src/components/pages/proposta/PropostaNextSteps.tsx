'use client';

const PropostaNextSteps = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-6">
            OS PRÓXIMOS PASSOS
          </h2>
          <div className="h-1 w-24 bg-[#D4A574] mx-auto" />
        </div>

        <div className="space-y-8 text-gray-700">
          <p className="text-lg">
            Se você chegou até aqui, provavelmente está pensando em duas coisas:
          </p>

          <ol className="space-y-2 text-lg ml-8">
            <li>1. "Eu adorei, mas precisamos pensar."</li>
            <li>2. "Como a gente torna isso real?"</li>
          </ol>

          <p className="text-lg">
            Ambas são completamente normais. E eu vou te ajudar com as duas.
          </p>

          {/* Se precisa de tempo */}
          <div className="bg-[#f9f7f4] p-8 rounded-lg mt-8">
            <h3 className="text-2xl font-bold text-[#8B6F47] mb-4">
              SE VOCÊ PRECISA DE TEMPO PRA DECIDIR:
            </h3>
            <p className="text-lg mb-4">
              Totalmente normal. Salve esta proposta, mostre pro seu parceiro(a) especialmente a página sobre simbolismos, anote suas dúvidas e me mande mensagem quando quiser conversar.
            </p>
            <p className="text-lg font-semibold">
              Prazo de validade desta proposta: [21 dias]
            </p>
          </div>

          {/* Se já sabe que quer seguir */}
          <div className="bg-[#8B6F47] text-white p-8 rounded-lg mt-8">
            <h3 className="text-2xl font-bold mb-6">SE VOCÊ JÁ SABE QUE QUER SEGUIR:</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl mb-2">PASSO 1: Confirmação</h4>
                <p>
                  Responda esta proposta confirmando interesse. Pode ser um simples "Vamos em frente!"
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-2">PASSO 2: Agendamos a degustação onde vocês podem escolher 4 sabores do nosso menu para experimentar.</h4>
                <p className="mt-2">
                  Investimento: R$ 110,00, criamos uma caixinha com os bolos para o casal retirar ou optar pela entrega na pousada que estão hospedados.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-2">PASSO 3: Contrato e Reserva da data</h4>
                <p>
                  Fechamos tudo documentado, você recebe o contrato e efetua a reserva através do pagamento integral.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-2">PASSO 4: Criação</h4>
                <p>
                  Aqui é onde a mágica acontece. Com base em tudo que conversamos - sua história, suas inspirações, a estética do casamento - eu crio um bolo exclusivo e único pra vocês.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-2">PASSO 5: O Grande Dia</h4>
                <p>
                  Entrego no local e garanto que tudo esteja perfeito pro momento mais importante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropostaNextSteps;
