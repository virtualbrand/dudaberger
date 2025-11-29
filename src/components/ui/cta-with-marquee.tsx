"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:0rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

// Imagens do workshop de confeitaria
export const workshopImages1 = [
  "/images/workshop/workshop-1.webp",
  "/images/workshop/workshop-17.webp",
  "/images/workshop/workshop-3.webp",
  "/images/workshop/workshop-2.webp",
];

export const workshopImages2 = [
  "/images/workshop/workshop-15.webp",
  "/images/workshop/workshop-7.webp",
  "/images/workshop/workshop-10.webp",
  "/images/workshop/workshop-11.webp",
];

export function WorkshopMarquee() {
  return (
    <div className="w-full h-screen flex flex-col space-y-0">
      <div className="flex-1 overflow-hidden">
        <Marquee speed={30} className="[--gap:0rem] h-full">
          {workshopImages1.map((src, idx) => (
            <div
              key={idx}
              className="relative w-[50vh] h-[50vh] overflow-hidden flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Produto do workshop ${idx + 1}`}
                fill
                className="object-cover"
                sizes="50vh"
              />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex-1 overflow-hidden">
        <Marquee speed={30} reverse className="[--gap:0rem] h-full">
          {workshopImages2.map((src, idx) => (
            <div
              key={idx}
              className="relative w-[50vh] h-[50vh] overflow-hidden flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Produto do workshop ${idx + 5}`}
                fill
                className="object-cover"
                sizes="50vh"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
