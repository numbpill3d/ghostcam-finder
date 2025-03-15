
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import WorldMap from '@/components/WorldMap';
import { mockMapPoints } from '@/utils/mockData';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  
  const handlePointClick = (point: any) => {
    console.log("Map point clicked:", point);
    // In a real application, this could navigate to the specific camera
  };

  return (
    <Layout>
      <Hero />
      
      <div className="container mx-auto max-w-6xl">
        <div className="bg-card rounded-xl border p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Global Camera Network</h2>
            {user && (
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                VERIFIED.USER: {user.name}
              </span>
            )}
          </div>
          
          <WorldMap 
            points={mockMapPoints} 
            className="h-[400px] mb-6"
            onPointClick={handlePointClick}
          />
          
          <p className="text-center text-muted-foreground">
            Our system monitors over 10,000 camera feeds across 150 countries worldwide.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
