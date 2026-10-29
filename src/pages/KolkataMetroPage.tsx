import React from 'react';
import { MetroRouteLayout } from '../components/MetroRouteLayout';
import { kolkataMetroData } from '../data/kolkataMetro';

export const KolkataMetroPage: React.FC = () => {
  return <MetroRouteLayout network={kolkataMetroData} />;
};

