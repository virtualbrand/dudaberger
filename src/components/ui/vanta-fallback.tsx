interface VantaFallbackProps {
  highlightColor?: string;
  midtoneColor?: string;
  lowlightColor?: string;
  baseColor?: string;
  className?: string;
}

export const VantaFallback = ({ 
  highlightColor = "#800F2F",
  midtoneColor = "#FFB3C1", 
  lowlightColor = "#A4133C",
  baseColor = "#23060E",
  className = ""
}: VantaFallbackProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Gradiente estático que simula o efeito do Vanta */}
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-90"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${lowlightColor}99 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${highlightColor}99 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${midtoneColor}33 0%, transparent 50%),
            linear-gradient(135deg, ${baseColor} 0%, ${lowlightColor} 100%)
          `
        }}
      />
      
      {/* Efeito de movimento sutil com CSS */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute w-full h-full animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 30% 70%, ${midtoneColor}44 0%, transparent 60%),
              radial-gradient(circle at 70% 30%, ${highlightColor}33 0%, transparent 60%)
            `,
            animationDuration: '4s',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute w-full h-full animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 60% 20%, ${lowlightColor}44 0%, transparent 60%),
              radial-gradient(circle at 20% 60%, ${midtoneColor}33 0%, transparent 60%)
            `,
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
      </div>
    </div>
  );
};

export default VantaFallback;