'use client';

import Image from 'next/image';

interface PropostaHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

const PropostaHero = ({ title, subtitle, heroImage }: PropostaHeroProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f5f5f5]">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={subtitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 px-6">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4 text-center tracking-wider">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 text-center font-light">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PropostaHero;
