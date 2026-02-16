'use client';

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

interface IllusionContextType {
  isIllusionBroken: boolean;
  isAnimating: boolean;
  breakIllusion: () => void;
  stopMusic: () => void
}

const IllusionContext = createContext<IllusionContextType | undefined>(undefined);

export function IllusionProvider({ children }: { children: ReactNode }) {
  const [isIllusionBroken, setIsIllusionBroken] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/howEveryOne1.mp3');
    audioRef.current.loop = true;

    const stored = localStorage.getItem('isIllusionBroken');
    if (stored === 'true') {
      setIsIllusionBroken(true);
     
      audioRef.current.play().catch(() => {});
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const breakIllusion = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(e => console.log('Аудио не запустилось:', e));
    setIsAnimating(true);
    setTimeout(() => {
      setIsIllusionBroken(true);
      setIsAnimating(false);
      localStorage.setItem('isIllusionBroken', 'true');
    }, 1000);
  };
  const stopMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();

  }
  return (
    <IllusionContext.Provider value={{ isIllusionBroken, isAnimating, breakIllusion, stopMusic }}>
      {children}
    </IllusionContext.Provider>
  );
}

export function useIllusion() {
  const context = useContext(IllusionContext);
  if (!context) {
    throw new Error('useIllusion must be used within IllusionProvider');
  }
  return context;
}