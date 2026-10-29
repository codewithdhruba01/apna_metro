import { MetroNetwork, MetroLine, MetroStation } from '../types/metro';

const lines: MetroLine[] = [
  {
    id: 'kolkata-blue',
    name: 'Blue Line (Line 1)',
    color: '#002060',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#002060]',
    borderColor: 'border-[#002060]',
    description: 'Dakshineswar to Kavi Subhash (North-South Corridor)',
    stations: [
      'dakshineswar',
      'baranagar',
      'noapara',
      'dum-dum',
      'belgachia',
      'shyambazar',
      'sovabazar-sutanuti',
      'girish-park',
      'mg-road',
      'central',
      'chandni-chowk',
      'esplanade',
      'park-street',
      'maidan',
      'rabindra-sadan',
      'netaji-bhavan',
      'jatin-das-park',
      'kalighat',
      'rabindra-sarobar',
      'mahanayak-uttam-kumar',
      'netaji',
      'masterda-surya-sen',
      'gitanjali',
      'kavi-nazrul',
      'shahid-khudiram',
      'kavi-subhash'
    ]
  },
  {
    id: 'kolkata-green',
    name: 'Green Line (Line 2)',
    color: '#00802b',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#00802b]',
    borderColor: 'border-[#00802b]',
    description: 'Howrah Maidan to Salt Lake Sector V / Teghoria (East-West Corridor)',
    stations: [
      'howrah-maidan',
      'howrah',
      'mahakaran',
      'esplanade',
      'sealdah',
      'phoolbagan',
      'salt-lake-stadium',
      'bengal-chemical',
      'city-center',
      'central-park',
      'karunamoyee',
      'salt-lake-sector-v',
      'keshtopur',
      'dum-dum-park',
      'baguiati',
      'raghunathpur',
      'teghoria-vip-road'
    ]
  },
  {
    id: 'kolkata-purple',
    name: 'Purple Line (Line 3)',
    color: '#7030A0',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#7030A0]',
    borderColor: 'border-[#7030A0]',
    description: 'Diamond Park to Esplanade (via Joka & Majerhat)',
    stations: [
      'diamond-park',
      'iim',
      'joka',
      'thakurpukur',
      'sakherbazar',
      'behala-chowrasta',
      'behala-bazar',
      'taratala',
      'majerhat',
      'mominpore',
      'kidderpore',
      'victoria',
      'park-street',
      'esplanade'
    ]
  },
  {
    id: 'kolkata-orange',
    name: 'Orange Line (Line 6)',
    color: '#ED7D31',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#ED7D31]',
    borderColor: 'border-[#ED7D31]',
    description: 'Kavi Subhash to Biman Bandar (New Garia - Airport Corridor)',
    stations: [
      'kavi-subhash',
      'satyajit-ray',
      'kavi-sukanta',
      'jyotirindra-nandi',
      'hemanta-mukhopadhyay',
      'vip-bazar',
      'ritwik-ghatak',
      'barun-sengupta',
      'beliaghata',
      'gour-kishor-ghosh',
      'nicco-park',
      'salt-lake-sector-v',
      'technopolis',
      'bidhan-nagar',
      'sub-cbd-1',
      'cbd-1',
      'kalakhetra',
      'new-town',
      'convention-centre',
      'sub-cbd-2',
      'titumir',
      'rabindra-tirtha',
      'teghoria-vip-road',
      'biman-bandar'
    ]
  },
  {
    id: 'kolkata-yellow',
    name: 'Yellow Line (Line 4)',
    color: '#E5B800',
    textColor: '#000000',
    bgColor: 'bg-[#E5B800]',
    borderColor: 'border-[#E5B800]',
    description: 'Noapara to Barasat via Airport',
    stations: [
      'noapara',
      'dum-dum-cantt',
      'jessore-road',
      'biman-bandar',
      'birati',
      'michael-nagar',
      'new-barrackpur',
      'madhyamgram',
      'hridaypur',
      'barasat'
    ]
  },
  {
    id: 'kolkata-pink',
    name: 'Pink Line (Line 5)',
    color: '#ED5E93',
    textColor: '#FFFFFF',
    bgColor: 'bg-[#ED5E93]',
    borderColor: 'border-[#ED5E93]',
    description: 'Baranagar to Barrackpore',
    stations: [
      'baranagar',
      'kamarhati',
      'agarpara',
      'sodepur',
      'panihati',
      'subhash-nagar',
      'khardaha',
      'tata-gate',
      'titagarh',
      'talpukur',
      'barrackpore'
    ]
  }
];

// Helper to compile stations map with lineIds
const rawStationNames: Record<string, string> = {
  // Blue Line
  'dakshineswar': 'Dakshineswar',
  'baranagar': 'Baranagar',
  'noapara': 'Noapara',
  'dum-dum': 'Dum Dum',
  'belgachia': 'Belgachia',
  'shyambazar': 'Shyambazar',
  'sovabazar-sutanuti': 'Sovabazar Sutanuti',
  'girish-park': 'Girish Park',
  'mg-road': 'MG Road',
  'central': 'Central',
  'chandni-chowk': 'Chandni Chowk',
  'esplanade': 'Esplanade',
  'park-street': 'Park Street',
  'maidan': 'Maidan',
  'rabindra-sadan': 'Rabindra Sadan',
  'netaji-bhavan': 'Netaji Bhavan',
  'jatin-das-park': 'Jatin Das Park',
  'kalighat': 'Kalighat',
  'rabindra-sarobar': 'Rabindra Sarobar',
  'mahanayak-uttam-kumar': 'Mahanayak Uttam Kumar',
  'netaji': 'Netaji',
  'masterda-surya-sen': 'Masterda Surya Sen',
  'gitanjali': 'Gitanjali',
  'kavi-nazrul': 'Kavi Nazrul',
  'shahid-khudiram': 'Shahid Khudiram',
  'kavi-subhash': 'Kavi Subhash',

  // Green Line
  'howrah-maidan': 'Howrah Maidan',
  'howrah': 'Howrah',
  'mahakaran': 'Mahakaran',
  'sealdah': 'Sealdah',
  'phoolbagan': 'Phoolbagan',
  'salt-lake-stadium': 'Salt Lake Stadium',
  'bengal-chemical': 'Bengal Chemical',
  'city-center': 'City Center',
  'central-park': 'Central Park',
  'karunamoyee': 'Karunamoyee',
  'salt-lake-sector-v': 'Salt Lake Sector V',
  'keshtopur': 'Keshtopur',
  'dum-dum-park': 'Dum Dum Park',
  'baguiati': 'Baguiati',
  'raghunathpur': 'Raghunathpur',
  'teghoria-vip-road': 'Teghoria / VIP Road',

  // Purple Line
  'diamond-park': 'Diamond Park',
  'iim': 'IIM',
  'joka': 'Joka',
  'thakurpukur': 'Thakurpukur',
  'sakherbazar': 'Sakherbazar',
  'behala-chowrasta': 'Behala Chowrasta',
  'behala-bazar': 'Behala Bazar',
  'taratala': 'Taratala',
  'majerhat': 'Majerhat',
  'mominpore': 'Mominpore',
  'kidderpore': 'Kidderpore',
  'victoria': 'Victoria',

  // Orange Line
  'satyajit-ray': 'Satyajit Ray',
  'kavi-sukanta': 'Kavi Sukanta',
  'jyotirindra-nandi': 'Jyotirindra Nandi',
  'hemanta-mukhopadhyay': 'Hemanta Mukhopadhyay',
  'vip-bazar': 'VIP Bazar',
  'ritwik-ghatak': 'Ritwik Ghatak',
  'barun-sengupta': 'Barun Sengupta',
  'beliaghata': 'Beliaghata',
  'gour-kishor-ghosh': 'Gour Kishor Ghosh',
  'nicco-park': 'Nicco Park',
  'technopolis': 'Technopolis',
  'bidhan-nagar': 'Bidhan Nagar',
  'sub-cbd-1': 'Sub CBD 1',
  'cbd-1': 'CBD 1',
  'kalakhetra': 'Kalakhetra',
  'new-town': 'New Town',
  'convention-centre': 'Convention Centre',
  'sub-cbd-2': 'Sub-CBD 2',
  'titumir': 'Titumir',
  'rabindra-tirtha': 'Rabindra Tirtha',
  'biman-bandar': 'Biman Bandar',

  // Yellow Line
  'dum-dum-cantt': 'Dum Dum Cantt.',
  'jessore-road': 'Jessore Road',
  'birati': 'Birati',
  'michael-nagar': 'Michael Nagar',
  'new-barrackpur': 'New Barrackpur',
  'madhyamgram': 'Madhyamgram',
  'hridaypur': 'Hridaypur',
  'barasat': 'Barasat',

  // Pink Line
  'kamarhati': 'Kamarhati',
  'agarpara': 'Agarpara',
  'sodepur': 'Sodepur',
  'panihati': 'Panihati',
  'subhash-nagar': 'Subhash Nagar',
  'khardaha': 'Khardaha',
  'tata-gate': 'Tata Gate',
  'titagarh': 'Titagarh',
  'talpukur': 'Talpukur',
  'barrackpore': 'Barrackpore'
};

const stations: Record<string, MetroStation> = {};

// Build station objects with lines mapping
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

export const kolkataMetroData: MetroNetwork = {
  id: 'kolkata',
  name: 'Kolkata Metro',
  city: 'Kolkata',
  tagline: "India's Pioneer Metro System & Underwater Transit Wonder",
  description: "Operating since 1984, Kolkata Metro spans historic North-South lines, India's first underwater metro tunnel beneath the Hooghly river on the Green Line, and expanding links to New Town and Airport.",
  mapImage: '/assets/maps/kolkata-metro-map.jpg',
  mapAlt: 'Kolkata Metro Network Route Map showing Blue, Green, Purple, Orange, Yellow, and Pink lines',
  lines,
  stations,
  popularRoutes: [
    { fromId: 'howrah-maidan', toId: 'salt-lake-sector-v', label: 'Howrah Maidan to Sector V (Underwater Corridor)' },
    { fromId: 'dakshineswar', toId: 'kavi-subhash', label: 'Dakshineswar to Kavi Subhash (Complete Blue Line)' },
    { fromId: 'howrah', toId: 'esplanade', label: 'Howrah to Esplanade (Hooghly River Crossing)' },
    { fromId: 'joka', toId: 'majerhat', label: 'Joka to Majerhat (Purple Line)' },
    { fromId: 'esplanade', toId: 'salt-lake-sector-v', label: 'Esplanade to Salt Lake Sector V' }
  ]
};

