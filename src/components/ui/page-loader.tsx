interface PageLoaderProps {
  theme?: 'light' | 'dark' | 'auto';
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

export const PageLoader = ({ 
  theme = 'auto', 
  size = 'medium',
  overlay = true 
}: PageLoaderProps) => {
  // Configurações baseadas no tema
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-white/80',
          spinner: 'border-gray-300 border-t-gray-700',
          innerSpinner: 'border-gray-400 border-b-transparent',
          text: 'text-gray-700'
        };
      case 'dark':
        return {
          bg: 'bg-black/80',
          spinner: 'border-white/20 border-t-white',
          innerSpinner: 'border-white/30 border-b-transparent',
          text: 'text-white/70'
        };
      default: // auto
        return {
          bg: 'bg-transparent',
          spinner: 'border-white/20 border-t-white',
          innerSpinner: 'border-white/30 border-b-transparent',
          text: 'text-white/70'
        };
    }
  };

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

  const themeClasses = getThemeClasses();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${overlay ? 'backdrop-blur-sm' : ''} ${themeClasses.bg}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Sistema de spinner duplo */}
        <div className="relative">
          {/* Spinner principal */}
          <div className={`${sizeClasses.container} border-2 ${themeClasses.spinner} rounded-full animate-spin`}></div>
          
          {/* Efeito de pulso de fundo */}
          <div className={`absolute inset-0 ${sizeClasses.container} border-2 border-white/10 rounded-full animate-pulse`}></div>
          
          {/* Spinner interno contra-rotação */}
          <div 
            className={`absolute ${sizeClasses.inner} border-2 ${themeClasses.innerSpinner} rounded-full animate-spin`}
            style={{ 
              animationDirection: 'reverse', 
              animationDuration: '0.8s' 
            }}
          ></div>
        </div>
        
        {/* Texto elegante */}
        <p className={`${themeClasses.text} ${sizeClasses.text} font-light tracking-wide animate-pulse`}>
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;