import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  responsive?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  responsive,
  ...props 
}: OptimizedImageProps) => {
  // Se há versões responsivas, usa picture element
  if (responsive) {
    return (
      <picture>
        {responsive.mobile && (
          <source 
            media="(max-width: 767px)" 
            srcSet={responsive.mobile}
          />
        )}
        {responsive.tablet && (
          <source 
            media="(min-width: 768px) and (max-width: 1023px)" 
            srcSet={responsive.tablet}
          />
        )}
        {responsive.desktop && (
          <source 
            media="(min-width: 1024px)" 
            srcSet={responsive.desktop}
          />
        )}
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      </picture>
    );
  }

  // Imagem simples otimizada
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;