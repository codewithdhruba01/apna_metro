import React from 'react';
import { MetroRouteLayout } from '../components/MetroRouteLayout';
import { delhiMetroData } from '../data/delhiMetro';

export const DelhiMetroPage: React.FC = () => {
  return <MetroRouteLayout network={delhiMetroData} />;
};

