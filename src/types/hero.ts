// types/hero.ts

export interface HeroProps {
    onExploreClick?: () => void;
  }
  
  export interface ParticleProps {
    position: [number, number, number];
    color: string;
  }
  
  export interface ModelProps {
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
  }