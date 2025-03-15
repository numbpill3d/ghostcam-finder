
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen dark bg-background scanline">
      {/* Subtle retro grid background */}
      <div className="fixed inset-0 retro-grid opacity-30 pointer-events-none" />
      
      {/* Random matrix code effect elements */}
      <div className="fixed top-0 left-5 h-full w-1 cyber-border opacity-20 pointer-events-none" />
      <div className="fixed top-5 left-0 h-1 w-full cyber-border opacity-20 pointer-events-none" />
      <div className="fixed top-0 right-5 h-full w-1 cyber-border opacity-20 pointer-events-none" />
      <div className="fixed bottom-5 left-0 h-1 w-full cyber-border opacity-20 pointer-events-none" />
      
      <Header />
      
      <main className={cn("relative flex-1 px-4 md:px-8 py-6 md:py-12 z-10", className)}>
        {children}
      </main>
      
      <footer className="relative z-10 py-6 border-t border-primary/30 text-center text-sm text-muted-foreground terminal-text">
        <p className="cyber-glow opacity-70">OmniEye © {new Date().getFullYear()} — <span className="text-primary">SYS.ACCESS.GRANTED</span></p>
      </footer>
    </div>
  );
};

export default Layout;
