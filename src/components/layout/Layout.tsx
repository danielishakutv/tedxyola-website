import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsapp } from '@/components/common/FloatingWhatsapp';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const bare = pathname.startsWith('/admin');

  if (bare) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 overflow-x-hidden">{children}</main>
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
};
