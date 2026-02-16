'use client'

import { BirthdaySurprise } from '@/components/BirthdaySurprise/BirthdaySurprise';
import { HeaderPrime } from '@/components/HeaderPrime/HeaderPrime';
import { IllusionProvider } from '../../context/IllusionContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
     <IllusionProvider>
        
        {children}
        <BirthdaySurprise />
      </IllusionProvider>
    </>
  );
}