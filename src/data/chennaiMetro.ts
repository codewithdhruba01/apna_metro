import { MetroNetwork, MetroLine, MetroStation } from '../types/metro';

const lines: MetroLine[] = [
  {
    id: 'chennai-blue',
    name: 'Blue Line (Corridor 1)',
    color: '#0085CA',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#0085CA]',
    borderColor: 'border-[#0085CA]',
    description: 'Wimco Nagar Depot to Chennai International Airport via Chennai Central',
    stations: [
      'wimco-nagar-depot',
      'wimco-nagar',
      'tiruvottriyur',
      'tiruvottriyur-theradi',
      'kaladipet',
      'tollgate',
      'new-washermanpet',
      'tondiarpet',
      'sir-theagaraya-college',
      'washermanpet',
      'mannadi',
      'high-court',
      'puratchi-thalaivar-dr-mgr-central',
      'government-estate',
      'lic',
      'thousand-lights',
      'ag-dms',
      'teynampet',
      'nandanam',
      'saidapet',
      'little-mount',
      'guindy',
      'arignar-anna-alandur',
      'nanganallur-road',
      'meenambakkam',
      'chennai-airport'
    ]
  },
  {
    id: 'chennai-green',
    name: 'Green Line (Corridor 2)',
    color: '#43B02A',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#43B02A]',
    borderColor: 'border-[#43B02A]',
    description: 'Puratchi Thalaivar Dr. MGR Central to St. Thomas Mount via Koyambedu',
    stations: [
      'puratchi-thalaivar-dr-mgr-central',
      'egmore',
      'nehru-park',
      'kilpauk-medical-college',
      'pachaiyappas-college',
      'shenoy-nagar',
      'anna-nagar-east',
      'anna-nagar-tower',
      'thirumangalam',
      'koyambedu',
      'cmbt',
      'arumbakkam',
      'vadapalani',
      'ashok-nagar',
      'ekkattuthangal',
      'arignar-anna-alandur',
      'st-thomas-mount'
    ]
  }
];

const rawStationNames: Record<string, string> = {
  // Blue Line
  'wimco-nagar-depot': 'Wimco Nagar Depot',
  'wimco-nagar': 'Wimco Nagar',
  'tiruvottriyur': 'Tiruvottriyur',
  'tiruvottriyur-theradi': 'Tiruvottriyur Theradi',
  'kaladipet': 'Kaladipet',
  'tollgate': 'Tollgate',
  'new-washermanpet': 'New Washermanpet',
  'tondiarpet': 'Tondiarpet',
  'sir-theagaraya-college': 'Sir Theagaraya College',
  'washermanpet': 'Washermanpet',
  'mannadi': 'Mannadi',
  'high-court': 'High Court',
  'puratchi-thalaivar-dr-mgr-central': 'Puratchi Thalaivar Dr. M.G. Ramachandran Central (Chennai Central)',
  'government-estate': 'Government Estate',
  'lic': 'LIC',
  'thousand-lights': 'Thousand Lights',
  'ag-dms': 'AG-DMS',
  'teynampet': 'Teynampet',
  'nandanam': 'Nandanam',
  'saidapet': 'Saidapet',
  'little-mount': 'Little Mount',
  'guindy': 'Guindy',
  'arignar-anna-alandur': 'Arignar Anna Alandur (Alandur)',
  'nanganallur-road': 'Nanganallur Road',
  'meenambakkam': 'Meenambakkam',
  'chennai-airport': 'Chennai International Airport',

  // Green Line
  'egmore': 'Chennai Egmore',
  'nehru-park': 'Nehru Park',
  'kilpauk-medical-college': 'Kilpauk Medical College',
  'pachaiyappas-college': "Pachaiyappa's College",
  'shenoy-nagar': 'Shenoy Nagar',
  'anna-nagar-east': 'Anna Nagar East',
  'anna-nagar-tower': 'Anna Nagar Tower',
  'thirumangalam': 'Thirumangalam',
  'koyambedu': 'Koyambedu',
  'cmbt': 'CMBT (Chennai Mofussil Bus Terminus)',
  'arumbakkam': 'Arumbakkam',
  'vadapalani': 'Vadapalani',
  'ashok-nagar': 'Ashok Nagar',
  'ekkattuthangal': 'Ekkattuthangal',
  'st-thomas-mount': 'St. Thomas Mount'
};

const stations: Record<string, MetroStation> = {};

Object.entries(rawStationNames).forEach(([id, name]) => {
  const lineIds = lines
    .filter(line => line.stations.includes(id))
    .map(line => line.id);

  stations[id] = {
    id,
    name,
    lineIds,
    isInterchange: lineIds.length > 1
  };
});

export const chennaiMetroData: MetroNetwork = {
  id: 'chennai',
  name: 'Chennai Metro',
  city: 'Chennai',
  tagline: 'Modern Rapid Transit Connecting Coromandel Coast & Transport Hubs',
  description: 'Chennai Metro (CMRL) seamlessly links Chennai Central Railway Station, Egmore, CMBT Bus Terminus, and Chennai International Airport across modern elevated and underground corridors.',
  mapImage: '/assets/maps/chennai-metro-map.jpg',
  mapAlt: 'Official Chennai Metro Network Route Map showing Blue Line and Green Line with Alandur and Chennai Central interchanges',
  lines,
  stations,
  popularRoutes: [
    { fromId: 'puratchi-thalaivar-dr-mgr-central', toId: 'chennai-airport', label: 'Chennai Central to Airport (Direct Blue Line)' },
    { fromId: 'puratchi-thalaivar-dr-mgr-central', toId: 'cmbt', label: 'Chennai Central to CMBT (Green Line)' },
    { fromId: 'koyambedu', toId: 'chennai-airport', label: 'Koyambedu to Airport (via Alandur Interchange)' },
    { fromId: 'egmore', toId: 'arignar-anna-alandur', label: 'Egmore to Alandur' },
    { fromId: 'washermanpet', toId: 'guindy', label: 'Washermanpet to Guindy' }
  ]
};

