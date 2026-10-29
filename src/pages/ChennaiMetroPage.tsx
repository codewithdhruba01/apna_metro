import React from 'react';
import { MetroRouteLayout } from '../components/MetroRouteLayout';
import { chennaiMetroData } from '../data/chennaiMetro';

export const ChennaiMetroPage: React.FC = () => {
  return <MetroRouteLayout network={chennaiMetroData} />;
};

