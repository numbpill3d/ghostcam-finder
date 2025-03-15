
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Search, Eye, UserCircle, LogOut } from 'lucide-react';
import ASCIIHeader from './ASCIIHeader';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ASCIIHeader />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/discover" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                isActive('/discover') ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Search className="mr-1 size-4" />
              Discover
            </Link>
            <Link 
              to="/view" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                isActive('/view') ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Eye className="mr-1 size-4" />
              Live View
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <span className="hidden sm:inline">USER:</span> {user.name}
                </div>
                <button 
                  onClick={signOut}
                  className="p-2 rounded-full hover:bg-muted/10 text-muted-foreground hover:text-primary transition-colors"
                  title="Sign out"
                >
                  <LogOut className="size-5" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/sign-in" 
                  className="px-4 py-1.5 rounded-md border border-input hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign-up" 
                  className="px-4 py-1.5 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/10 text-muted-foreground"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-scale-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive('/') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/discover" 
                className={cn(
                  "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive('/discover') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                <Search className="mr-2 size-4" />
                Discover
              </Link>
              <Link 
                to="/view" 
                className={cn(
                  "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive('/view') ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                <Eye className="mr-2 size-4" />
                Live View
              </Link>
              
              {/* Mobile Auth Links */}
              <div className="pt-2 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center py-2 gap-2">
                      <UserCircle className="size-5 text-primary" />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <button 
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className="flex items-center py-2 w-full text-sm font-medium text-red-400 hover:text-red-300"
                    >
                      <LogOut className="mr-2 size-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={closeMenu}
                    >
                      <UserCircle className="mr-2 size-4" />
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="flex items-center py-2 text-sm font-medium text-primary"
                      onClick={closeMenu}
                    >
                      <UserCircle className="mr-2 size-4" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
