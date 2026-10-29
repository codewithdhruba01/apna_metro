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
          <div key={item.step} className="flex flex-col text-left">
            <div className="text-zinc-500 text-sm mb-2 font-medium">
              {item.step}
            </div>
            <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs font-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
