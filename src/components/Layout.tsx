
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen dark bg-background">
      <Header />
      <main className={cn("flex-1 px-4 md:px-8 py-6 md:py-12", className)}>
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>OmniEye © {new Date().getFullYear()} — All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
