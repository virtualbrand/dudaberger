'use client';

import Image from 'next/image';

const PropostaGallery = () => {
  const images = [
    { src: '/images/workshop/workshop-1.webp', size: 'large', span: 'col-span-2 row-span-2' },
    { src: '/images/workshop/workshop-2.webp', size: 'medium', span: 'col-span-1 row-span-1' },
    { src: '/images/workshop/workshop-3.webp', size: 'medium', span: 'col-span-1 row-span-1' },
    { src: '/images/workshop/workshop-5.webp', size: 'small', span: 'col-span-1 row-span-1' },
    { src: '/images/workshop/workshop-7.webp', size: 'small', span: 'col-span-1 row-span-1' },
    { src: '/images/workshop/workshop-10.webp', size: 'small', span: 'col-span-1 row-span-1' },
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${image.span} aspect-square`}
          >
            <Image
              src={image.src}
              alt={`Casamento foto ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropostaGallery;
