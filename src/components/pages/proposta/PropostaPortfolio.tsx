'use client';

import Image from 'next/image';

const PropostaPortfolio = () => {
  const portfolioImages = [
    '/images/workshop/workshop-1.webp',
    '/images/workshop/workshop-2.webp',
    '/images/workshop/workshop-3.webp',
    '/images/workshop/workshop-5.webp',
    '/images/workshop/workshop-7.webp',
    '/images/workshop/workshop-10.webp',
    '/images/workshop/workshop-11.webp',
    '/images/workshop/workshop-12.webp',
  ];

  return (
    <section className="w-full bg-[#f9f7f4] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <Image
                src={image}
                alt={`Portfólio ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropostaPortfolio;
