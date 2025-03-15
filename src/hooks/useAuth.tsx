
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  preferredLocation?: string;
  savedFeeds?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  savePreference: (key: string, value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('omnieye-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('omnieye-user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just mock successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        savedFeeds: []
      };
      
      setUser(mockUser);
      localStorage.setItem('omnieye-user', JSON.stringify(mockUser));
      toast({
        title: "Successfully signed in",
        description: "Welcome back to OmniEye",
      });
      return true;
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user creation
      const newUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        savedFeeds: []
      };
      
      setUser(newUser);
      localStorage.setItem('omnieye-user', JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: "Welcome to OmniEye",
      });
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Unable to create your account",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('omnieye-user');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const savePreference = (key: string, value: string) => {
    if (!user) return;
    
    // Update user preference
    const updatedUser = {
      ...user,
      [key]: value
    };
    
    // In a real app, this would also be an API call
    setUser(updatedUser);
    localStorage.setItem('omnieye-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, savePreference }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
