"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

// Definir as galerias de bolos - separadas por linha
const firstRowImages = [
  "/images/casamento/galeria-scroll-1.webp",
  "/images/casamento/galeria-scroll-2.webp",
  "/images/casamento/galeria-scroll-3.webp",
  "/images/casamento/galeria-scroll-4.webp",
  "/images/casamento/galeria-scroll-5.webp",
  "/images/casamento/galeria-scroll-6.webp",
  "/images/casamento/galeria-scroll-7.webp",
];

const secondRowImages = [
  "/images/casamento/galeria-scroll-8.webp",
  "/images/casamento/galeria-scroll-9.webp",
  "/images/casamento/galeria-scroll-10.webp",
  "/images/casamento/galeria-scroll-11.webp",
  "/images/casamento/galeria-scroll-12.webp",
  "/images/casamento/galeria-scroll-13.webp",
  "/images/casamento/galeria-scroll-14.webp",
];

const boloGalleries = {
  "galeria": [...firstRowImages, ...secondRowImages],
};

// Função para embaralhar array usando Fisher-Yates
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Função para gerar os produtos de forma separada para cada linha
const generateProductsForRow = (images: string[], rowPrefix: string): Array<{
  title: string;
  link: string;
  thumbnail: string;
  productId: string;
}> => {
  return images.map((imagePath, index) => ({
    title: "Bolo",
    link: "#",
    thumbnail: imagePath,
    productId: `galeria-${rowPrefix}-${index}`,
  }));
};

// Gerar produtos sem embaralhar (para evitar hydration mismatch)
const baseFirstRowProducts = generateProductsForRow(firstRowImages, "first");
const baseSecondRowProducts = generateProductsForRow(secondRowImages, "second");
const baseProducts = [...baseFirstRowProducts, ...baseSecondRowProducts];

const Header = () => {
  return (
    <div className="container mx-auto mt-36 py-10 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
      <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded text-[#D65B58] max-w-md mx-auto text-center">
        Momentos que se tornam memória
      </h2>
      <p className="fade-in max-w-2xl mx-auto leading-relaxed text-lg md:text-xl mt-4 text-[#5a2a2a] text-center">
        Cada bolo que você vê aqui foi criado para um casal real, com história, escolhas e intenções únicas — do jeito que o de vocês também será.
      </p>
    </div>
  );
};

// Componente de Galeria (Lightbox) com Embla Carousel
const GalleryModal = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0,
  productTitle 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  images: string[]; 
  initialIndex?: number;
  productTitle: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    startIndex: initialIndex 
  });
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const onThumbClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(initialIndex, true);
  }, [emblaApi, initialIndex]);

  useEffect(() => {
    if (!emblaApi || !isOpen) return;
    
    const timer = setTimeout(() => {
      emblaApi.reInit();
      emblaApi.scrollTo(initialIndex, true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isOpen, emblaApi, initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !emblaApi) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, emblaApi, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <div className="text-white">
              <h3 className="text-xl font-bold font-unbounded">{productTitle}</h3>
              <p className="text-sm text-gray-300">{selectedIndex + 1} / {images.length}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Fechar galeria"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative w-full max-w-7xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex items-center justify-center h-[70vh] relative select-none">
                      <Image
                        src={image}
                        alt={`${productTitle} - Imagem ${index + 1}`}
                        fill
                        quality={85}
                        className="object-contain pointer-events-none"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        unselectable="on"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm z-10"
                  aria-label="Imagem anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm z-10"
                  aria-label="Próxima imagem"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-8" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md p-3 shadow-2xl" ref={emblaThumbsRef}>
              <div className="flex gap-3 items-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onThumbClick(index)}
                    className={`group relative flex-[0_0_auto] min-w-0 overflow-hidden transition-all duration-300 ${
                      index === selectedIndex 
                        ? "rounded-[10px] scale-110 shadow-2xl opacity-100" 
                        : "rounded-[5px] opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <div className="relative h-20 w-24">
                      <Image 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        quality={60}
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-110 pointer-events-none select-none rounded-md"
                        sizes="100px"
                        draggable={false}
                        unselectable="on"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                      index === selectedIndex ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({
  product,
  translate,
  onOpenGallery,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    productId: string | null;
  };
  translate: MotionValue<number>;
  onOpenGallery: (productId: string | null, thumbnail: string) => void;
}) => {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenGallery(product.productId, product.thumbnail);
  };

  return (
    <motion.div
      style={{
        x: translate,
      }}
      key={product.productId}
      className="group/product h-48 w-64 md:h-64 md:w-80 lg:h-72 lg:w-96 relative flex-shrink-0"
    >
      <div
        onClick={handleClick}
        className="block group-hover/product:shadow-2xl rounded-xl overflow-hidden relative h-full w-full cursor-pointer touch-manipulation select-none bg-white"
        style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          quality={75}
          loading="lazy"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-300 group-hover/product:scale-105 pointer-events-none"
          alt={product.title}
          sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
        />
        <div className="absolute inset-0 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Maximize2 className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
        </div>
      </div>
    </motion.div>
  );
};

export default function BolosGallerySection() {
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    productId: string | null;
    initialIndex: number;
    productTitle: string;
  }>({
    isOpen: false,
    productId: null,
    initialIndex: 0,
    productTitle: "",
  });

  // Detectar se é desktop para aplicar efeitos 3D
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleOpenGallery = (productId: string | null, clickedThumbnail: string) => {
    if (!productId) return;
    
    const gallery = boloGalleries["galeria"];
    const initialIndex = gallery.findIndex(img => img === clickedThumbnail);
    
    const product = baseProducts.find(p => p.thumbnail === clickedThumbnail);
    const productTitle = product?.title || "Bolo";

    setGalleryState({
      isOpen: true,
      productId: "galeria",
      initialIndex: initialIndex >= 0 ? initialIndex : 0,
      productTitle,
    });
  };

  const handleCloseGallery = () => {
    setGalleryState({
      isOpen: false,
      productId: null,
      initialIndex: 0,
      productTitle: "",
    });
  };

  const [shuffledFirstRow, setShuffledFirstRow] = useState(baseFirstRowProducts);
  const [shuffledSecondRow, setShuffledSecondRow] = useState(baseSecondRowProducts);
  
  useEffect(() => {
    setShuffledFirstRow(shuffleArray(baseFirstRowProducts));
    setShuffledSecondRow(shuffleArray(baseSecondRowProducts));
  }, []);

  // Duplicar produtos para criar efeito infinito - cada linha mantém suas próprias fotos
  const infiniteFirstRow = [...shuffledFirstRow, ...shuffledFirstRow, ...shuffledFirstRow, ...shuffledFirstRow];
  const infiniteSecondRow = [...shuffledSecondRow, ...shuffledSecondRow, ...shuffledSecondRow, ...shuffledSecondRow];

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 50, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1200]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1200]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig
  );

  return (
    <div className="bg-[#F6EEE1] w-full relative overflow-hidden">
      {galleryState.productId && (
        <GalleryModal
          isOpen={galleryState.isOpen}
          onClose={handleCloseGallery}
          images={boloGalleries[galleryState.productId as keyof typeof boloGalleries]}
          initialIndex={galleryState.initialIndex}
          productTitle={galleryState.productTitle}
        />
      )}

      <div
        ref={ref}
        className="py-20 antialiased relative flex flex-col self-auto lg:[perspective:1000px] lg:[transform-style:preserve-3d] z-10"
      >
        <Header />
        <motion.div
          style={isDesktop ? {
            rotateX,
            rotateZ,
            opacity,
          } : {
            opacity,
          }}
          className=""
        >
          {/* Desktop, Tablet e Mobile: Primeira linha com fotos 1-7 */}
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-3 md:space-x-4 mb-3 md:mb-4">
            {infiniteFirstRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                onOpenGallery={handleOpenGallery}
                key={`first-row-${product.productId}-${index}`}
              />
            ))}
          </motion.div>
          
          {/* Desktop, Tablet e Mobile: Segunda linha com fotos 8-14 */}
          <motion.div className="flex flex-row space-x-3 md:space-x-4 mb-3 md:mb-4">
            {infiniteSecondRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                onOpenGallery={handleOpenGallery}
                key={`second-row-${product.productId}-${index}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
