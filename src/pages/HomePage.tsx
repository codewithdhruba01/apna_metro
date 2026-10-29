import React from 'react';
import { Hero } from '../components/home/Hero';
import { MetroCard } from '../components/home/MetroCard';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { FinalCTA } from '../components/home/FinalCTA';
import { delhiMetroData } from '../data/delhiMetro';
import { kolkataMetroData } from '../data/kolkataMetro';
import { chennaiMetroData } from '../data/chennaiMetro';
import { Map } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Metro Network Cards Section */}
      <section id="metro-networks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60 text-xs font-bold uppercase tracking-wider">
            <Map className="w-3.5 h-3.5" />
            <span>Supported Networks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore India's Premier Metro Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Select a city network to inspect full high-resolution system maps, browse line connections, and find routes.
          </p>
        </div>

        {/* 3 City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Delhi Metro */}
          <MetroCard
            network={delhiMetroData}
            to="/delhi-metro"
            badge="Largest Transit"
            lineAccentColors={['#E11D48', '#EAB308', '#2563EB', '#7C3AED', '#EC4899', '#BE185D', '#EA580C']}
          />

          {/* Kolkata Metro */}
          <MetroCard
            network={kolkataMetroData}
            to="/kolkata-metro"
            badge="India's First Metro"
            lineAccentColors={['#002060', '#00802b', '#7030A0', '#ED7D31', '#E5B800', '#ED5E93']}
          />

          {/* Chennai Metro */}
          <MetroCard
            network={chennaiMetroData}
            to="/chennai-metro"
            badge="Rapid Airport Link"
            lineAccentColors={['#0085CA', '#43B02A']}
          />
        </div>
      </section>

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. How to Use Section */}
      <HowItWorks />

      {/* 5. Final CTA Section */}
      <FinalCTA />
    </div>
  );
};
