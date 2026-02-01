"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the props for the component
export interface PhotoStackItem {
  src: string;
  name: string;
  description?: string;
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title: React.ReactNode;
  className?: string;
}

const InteractivePhotoStack = React.forwardRef<
  HTMLDivElement,
  InteractivePhotoStackProps
>(({ items, title, className, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-8 w-full",
        className,
      )}
      {...props}
    >
      <div className="relative w-full max-w-[400px] px-6 md:px-0">
        {/* Card with Fade Transition */}
        <div className="w-full relative">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 flex flex-col bg-white transition-opacity duration-700 ease-in-out w-full",
                index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              )}
            >
              <div className="w-full h-96 flex-shrink-0 bg-white">
                <img
                  src={item.src}
                  alt={item.name}
                  title={item.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="mt-3 px-2 py-2 bg-white min-h-[80px] flex flex-col justify-start">
                <p className="font-unbounded text-xs text-[#703535] text-center font-semibold mb-1">
                  {item.name}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600 text-center font-medium leading-snug break-words">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Centered Below */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white text-[#D65B58] hover:bg-[#D65B58] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg border border-gray-200"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white text-[#D65B58] hover:bg-[#D65B58] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg border border-gray-200"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h3 className="text-center text-2xl font-bold text-foreground">
        {title}
      </h3>
    </div>
  );
});

InteractivePhotoStack.displayName = "InteractivePhotoStack";

export { InteractivePhotoStack };
