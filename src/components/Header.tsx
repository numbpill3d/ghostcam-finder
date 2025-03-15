
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eye, Menu, X, Terminal, Shield, Database } from 'lucide-react';
import ASCIIHeader from './ASCIIHeader';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'View', href: '/view' },
];

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-1 bg-background/80 backdrop-blur-md border-b border-primary/30" : "py-2"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* ASCII Art Logo */}
        <ASCIIHeader />
        
        <div className="flex items-center justify-between mt-2">
          {/* Small icon version for mobile */}
          <Link 
            to="/" 
            className="flex md:hidden items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
          >
            <Terminal className="size-5 text-primary cyber-glow" />
            <span className="text-lg font-mono tracking-tight cyber-glow">OmniEye</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mx-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-mono transition-colors duration-300 flex items-center gap-2 px-3 py-1",
                  location.pathname === item.href
                    ? "text-primary cyber-glow cyber-border"
                    : "text-muted-foreground hover:text-primary hover:cyber-glow"
                )}
              >
                {item.name === 'Home' && <Database className="size-3.5" />}
                {item.name === 'Discover' && <Eye className="size-3.5" />}
                {item.name === 'View' && <Shield className="size-3.5" />}
                <span data-text={item.name} className={location.pathname === item.href ? "glitch" : ""}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden cyber-border p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5 text-primary" />
            ) : (
              <Menu className="size-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/30 animate-fade-in glass">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-base font-mono transition-colors py-2 flex items-center gap-2",
                    location.pathname === item.href
                      ? "text-primary cyber-glow"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name === 'Home' && <Database className="size-4" />}
                  {item.name === 'Discover' && <Eye className="size-4" />}
                  {item.name === 'View' && <Shield className="size-4" />}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
