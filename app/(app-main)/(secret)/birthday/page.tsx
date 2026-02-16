'use client';

// import { useIllusion } from '@/app/context/IllusionContext';
import { Welcome } from '@/components/Welcome/Welcome';
import { useEffect } from 'react';


export default function BirthDayPage() {
    // const { isIllusionBroken, isAnimating, breakIllusion, stopMusic } = useIllusion();
  // useEffect(() => {
  //   stopMusic();
  // }, [])
  return (
    <>
        <Welcome/>
    </>
  );
}
