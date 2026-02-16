import { Header } from '@/components/Header/Header';
import { HeaderPrime } from '@/components/HeaderPrime/HeaderPrime';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <HeaderPrime/> */}
      {children}
    </>
  );
}