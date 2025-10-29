interface TransparentLoaderProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'dark' | 'primary';
}

export const TransparentLoader = ({ 
  className = "",
  size = 'medium',
  color = 'white'
}: TransparentLoaderProps) => {
  // Configurações de tamanho
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-8 h-8',
          inner: 'inset-1 w-6 h-6',
          text: 'text-xs'
        };
      case 'large':
        return {
          container: 'w-16 h-16',
          inner: 'inset-3 w-10 h-10',
          text: 'text-base'
        };
      default: // medium
        return {
          container: 'w-12 h-12',
          inner: 'inset-2 w-8 h-8',
          text: 'text-sm'
        };
    }
  };

  // Configurações de cor
  const getColorClasses = () => {
    switch (color) {
      case 'dark':
        return {
          spinner: 'border-gray-300 border-t-gray-700',
          innerSpinner: 'border-gray-400 border-b-transparent',
          pulse: 'border-gray-400/20',
          text: 'text-gray-700'
        };
      case 'primary':
        return {
          spinner: 'border-[var(--color-primary-200)] border-t-[var(--color-primary-600)]',
          innerSpinner: 'border-[var(--color-primary-400)] border-b-transparent',
          pulse: 'border-[var(--color-primary-300)]/20',
          text: 'text-[var(--color-primary-600)]'
        };
      default: // white
        return {
          spinner: 'border-white/20 border-t-white',
          innerSpinner: 'border-white/30 border-b-transparent',
          pulse: 'border-white/10',
          text: 'text-white/70'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const colorClasses = getColorClasses();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        {/* Spinner simples e minimalista - apenas um traço */}
        <div className="relative">
          {/* Spinner principal - apenas um traço */}
          <div className={`${sizeClasses.container} border-2 ${colorClasses.spinner} rounded-full animate-spin`}></div>
        </div>
      </div>
    </div>
  );
};

export default TransparentLoader;