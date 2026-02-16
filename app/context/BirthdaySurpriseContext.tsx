'use client';

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

interface BirthdayContextType {
  authCompleted: boolean;
  setAuthCompleted: (value: boolean) => void;
  birthdayVisited: boolean;
  setBirthdayVisited: (value: boolean) => void;
  hasAttemptedAuth: boolean;
  setHasAttemptedAuth: (value: boolean) => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
 
  const [authCompleted, setAuthCompleted] = useState(false);
  const [birthdayVisited, setBirthdayVisited] = useState(false);
  const [hasAttemptedAuth, setHasAttemptedAuth] = useState(false);

  // Инициализация аудио и восстановление из localStorage
  useEffect(() => {

    const storedAuth = localStorage.getItem('authCompleted');
    if (storedAuth === 'true') setAuthCompleted(true);

    const storedVisited = localStorage.getItem('birthdayVisited');
    if (storedVisited === 'true') setBirthdayVisited(true);

    const storedAttempt = localStorage.getItem('hasAttemptedAuth');
    if (storedAttempt === 'true') setHasAttemptedAuth(true);

    
  }, []);

 

  // Сохраняем флаги в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('authCompleted', String(authCompleted));
  }, [authCompleted]);

  useEffect(() => {
    localStorage.setItem('birthdayVisited', String(birthdayVisited));
  }, [birthdayVisited]);

  useEffect(() => {
    localStorage.setItem('hasAttemptedAuth', String(hasAttemptedAuth));
  }, [hasAttemptedAuth]);

  return (
    <BirthdayContext.Provider
      value={{
        authCompleted,
        setAuthCompleted,
        birthdayVisited,
        setBirthdayVisited,
        hasAttemptedAuth,
        setHasAttemptedAuth,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthday() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within BirthdayProvider');
  }
  return context;
}