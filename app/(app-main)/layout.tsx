'use client'

import { BirthdayProvider } from '../context/BirthdaySurpriseContext';

export default function AppMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
     <BirthdayProvider>
        
        {children}
       
      </BirthdayProvider>
    </>
  );
}