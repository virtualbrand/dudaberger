import { TransparentLoader } from './transparent-loader';

interface VantaLoadingProps {
  className?: string;
}

export const VantaLoading = ({ 
  className = "",
}: VantaLoadingProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Usar o TransparentLoader */}
        <TransparentLoader 
          size="medium" 
          color="white"
          className="opacity-90"
        />
      </div>
    </div>
  );
};

export default VantaLoading;