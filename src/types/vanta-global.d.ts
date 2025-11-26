// Tipos globais para Vanta.js e Three.js

export interface VantaEffectInstance {
  destroy: () => void;
}

export interface VantaFogOptions {
  el: HTMLElement;
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
  blurFactor?: number;
  speed?: number;
  zoom?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
}

declare global {
  interface Window {
    THREE: unknown;
    VANTA: {
      FOG: (options: VantaFogOptions) => VantaEffectInstance;
    };
  }
}
