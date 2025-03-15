
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import WorldMap from '@/components/WorldMap';
import { mockMapPoints } from '@/utils/mockData';

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      <div className="container mx-auto max-w-6xl">
        <div className="bg-card rounded-xl border p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Global Camera Network</h2>
          <WorldMap 
            points={mockMapPoints} 
            className="h-[400px] mb-6" 
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
