export interface MetroStation {
  id: string;
  name: string;
  lineIds: string[];
  isInterchange?: boolean;
  latitude?: number;
  longitude?: number;
  code?: string;
}

export interface MetroLine {
  id: string;
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  stations: string[]; // Ordered list of station IDs
  description?: string;
}

export interface MetroConnection {
  fromStationId: string;
  toStationId: string;
  lineId: string;
  distanceKm?: number;
}

export interface MetroNetwork {
  id: string;
  name: string;
  city: string;
  tagline: string;
  description: string;
  mapImage: string;
  vectorMapImage?: string;
  mapAlt: string;
  lines: MetroLine[];
  stations: Record<string, MetroStation>;
  popularRoutes: {
    fromId: string;
    toId: string;
    label: string;
  }[];
}

export interface RouteSegment {
  lineId: string;
  lineName: string;
  lineColor: string;
  textColor: string;
  bgColor: string;
  stations: MetroStation[];
  interchangeAtEnd?: {
    station: MetroStation;
    nextLineId: string;
    nextLineName: string;
    nextLineColor: string;
  };
}

export interface MetroRoute {
  source: MetroStation;
  destination: MetroStation;
  totalStations: number; // Count of stations in route
  hops: number; // Total station-to-station connections
  totalInterchanges: number;
  linesUsed: MetroLine[];
  segments: RouteSegment[];
  path: MetroStation[];
}

