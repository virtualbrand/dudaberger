"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming a cn utility from shadcn/ui

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

// Helper function to generate a random number in a range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate a set of non-overlapping positions
const generateNonOverlappingTransforms = (items: PhotoStackItem[]) => {
  const positions: { x: number; y: number; r: number }[] = [];
  const displayedItems = items.slice(0, 5);

  const cardWidthVW = 25;
  const cardHeightVH = 45;
  const maxRetries = 100;

  displayedItems.forEach(() => {
    let newPos;
    let collision;
    let retries = 0;

    do {
      collision = false;
      const x = random(-30, 30); // vw - aumentado de -20/20 para -30/30
      const y = random(-18, 18); // vh - aumentado de -12/12 para -18/18
      const r = random(-18, 18); // deg - aumentado de -15/15 para -18/18
      newPos = { x, y, r };

      for (const pos of positions) {
        const dx = Math.abs(newPos.x - pos.x);
        const dy = Math.abs(newPos.y - pos.y);
        if (dx < cardWidthVW && dy < cardHeightVH) {
          collision = true;
          break;
        }
      }
      retries++;
    } while (collision && retries < maxRetries);
    
    positions.push(newPos);
  });

  return positions.map(pos => `translate(${pos.x}vw, ${pos.y}vh) rotate(${pos.r}deg)`);
};


const InteractivePhotoStack = React.forwardRef<
  HTMLDivElement,
  InteractivePhotoStackProps
>(({ items, title, className, ...props }, ref) => {
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [isGroupHovered, setIsGroupHovered] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  // State to hold the current set of random positions
  const [spreadTransforms, setSpreadTransforms] = React.useState<string[]>([]);

  const displayedItems = items.slice(0, 5);
  const baseRotations = ["rotate-2", "-rotate-2", "rotate-4", "-rotate-4", "rotate-6"];

  // Generate new positions on mount
  React.useEffect(() => {
    const newTransforms = generateNonOverlappingTransforms(items);
    setSpreadTransforms(newTransforms);
  }, [items]);

  const handleMouseEnter = () => {
    // Generate new random positions every time the mouse enters
    const newTransforms = generateNonOverlappingTransforms(items);
    setSpreadTransforms(newTransforms);
    setIsGroupHovered(true);
  };

  const handleMouseLeave = () => {
    if (!clickedIndex) {
      setIsGroupHovered(false);
      // Generate new positions for next hover
      const newTransforms = generateNonOverlappingTransforms(items);
      setSpreadTransforms(newTransforms);
    }
  };

  const handleCardClick = (index: number) => {
    if (isGroupHovered) {
      setClickedIndex(index);
      setTimeout(() => {
        setIsGroupHovered(false);
        setTopCardIndex(index);
        setClickedIndex(null);
      }, 700);
    } else {
      setTopCardIndex(index);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-12",
        className,
      )}
      {...props}
    >
      <div
        className="relative h-[600px] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative left-1/2 top-1/2 h-[550px] w-96 -translate-x-1/2 -translate-y-1/2">
          {displayedItems.map((item, index) => {
            const isTopCard = index === topCardIndex;
            const numItems = displayedItems.length;
            let stackPosition = index - topCardIndex;
            if (stackPosition < 0) stackPosition += numItems;
            const isClicked = index === clickedIndex;
            // Use the dynamically generated transforms from state
            const transform = isGroupHovered
              ? spreadTransforms[index]
              : `translateY(${stackPosition * 0.5}rem) scale(${1 - stackPosition * 0.05})`;

            return (
              <div
                key={item.name}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "absolute inset-0 cursor-pointer transition-all duration-500 ease-in-out opacity-100",
                  {
                    "rotate-0": isGroupHovered,
                    [baseRotations[stackPosition]]: !isGroupHovered && !isTopCard,
                    "hover:scale-110": isGroupHovered && !isClicked,
                    "animate-spin-y": isClicked,
                  }
                )}
                style={{
                  transform: transform,
                  zIndex: isClicked ? 200 : isGroupHovered ? 100 : isTopCard ? numItems + 50 : numItems - stackPosition + 50,
                  opacity: 1,
                }}
              >
                <div 
                  className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 flex flex-col bg-white"
                >
                  <div className="w-full h-96 flex-shrink-0 bg-white">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="mt-3 px-2 py-2 bg-white">
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
              </div>
            );
          })}
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
