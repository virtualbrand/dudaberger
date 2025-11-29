"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { workshopConfig, getPrimaryButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config";
import { Header, HeroContent } from "@/components/ui/shaders-hero-section";

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#442020] via-[#442020] to-[#652826]">
      <Header />
      <HeroContent />
    </div>
  );
};

export default HeroSection;
