import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Choose Metro',
    description: 'Select Delhi, Kolkata, or Chennai Metro network to access its high-resolution transit system map.',
  },
  {
    step: '02',
    title: 'Select Stations',
    description: 'Search origin and destination stations with instant autocomplete and line interchange badges.',
  },
  {
    step: '03',
    title: 'Explore Route',
    description: 'View the optimal station sequence, platform transfer guidance, and total station hops.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 sm:pt-14 pb-6 sm:pb-8 border-t border-zinc-200 dark:border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left">
        {steps.map((item) => (
          <div key={item.step} className="space-y-1.5">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {item.step}
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
