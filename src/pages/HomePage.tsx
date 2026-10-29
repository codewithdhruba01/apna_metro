import React from 'react';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { FeaturesSection } from '../components/home/FeaturesSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* 1. Hero Section with Mock Card containing Demo Metro Route */}
      <Hero />

      {/* 2. 3-Step Process (01, 02, 03) */}
      <HowItWorks />

      {/* 3. Platform Capabilities */}
      <FeaturesSection />
    </div>
  );
};
