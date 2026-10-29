import { kolkataMetroData } from '../data/kolkataMetro';
import { chennaiMetroData } from '../data/chennaiMetro';
import { delhiMetroData } from '../data/delhiMetro';
import { findRoute } from '../utils/routeFinder';
import { MetroNetwork } from '../types/metro';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('🧪 Starting MetroMap Automated Test Suite...\n');

// 1. Data Integrity Tests
function testDataIntegrity(network: MetroNetwork) {
  console.log(`Checking data integrity for ${network.name}:`);

  // Verify all stations in lines exist in network.stations
  network.lines.forEach((line) => {
    assert(line.stations.length > 0, `Line ${line.name} must have stations`);
    line.stations.forEach((stId) => {
      assert(
        !!network.stations[stId],
        `Station ID "${stId}" referenced in line "${line.name}" must exist in stations map`
      );
      assert(
        network.stations[stId].lineIds.includes(line.id),
        `Station "${stId}" must have lineId "${line.id}" in its lineIds array`
      );
    });
  });

  // Verify interchange station calculation
  Object.values(network.stations).forEach((station) => {
    if (station.lineIds.length > 1) {
      assert(
        station.isInterchange === true,
        `Station ${station.name} (${station.id}) has multiple lines so isInterchange must be true`
      );
    }
  });

  console.log(
    `  ✅ ${network.name}: ${network.lines.length} lines, ${
      Object.keys(network.stations).length
    } stations verified without orphaned IDs.`
  );
}

testDataIntegrity(kolkataMetroData);
testDataIntegrity(chennaiMetroData);
testDataIntegrity(delhiMetroData);

// 2. Kolkata Metro Routing Tests
console.log('\nTesting Kolkata Metro Routes:');

// Test A: Direct Green Line (Howrah Maidan to Salt Lake Sector V)
const kolkataDirect = findRoute(kolkataMetroData, 'howrah-maidan', 'salt-lake-sector-v');
assert(kolkataDirect !== null, 'Route Howrah Maidan -> Sector V should exist');
assert(kolkataDirect!.totalInterchanges === 0, 'Direct route should have 0 interchanges');
assert(kolkataDirect!.segments.length === 1, 'Direct route should have 1 segment');
assert(kolkataDirect!.segments[0].lineId === 'kolkata-green', 'Segment must be Green line');
console.log(`  ✅ Direct Green Line: Howrah Maidan to Sector V (${kolkataDirect!.hops} hops, 0 transfers)`);

// Test B: Underwater Hooghly Crossing & Interchange at Esplanade (Howrah to Kalighat)
const kolkataTransfer = findRoute(kolkataMetroData, 'howrah', 'kalighat');
assert(kolkataTransfer !== null, 'Route Howrah -> Kalighat should exist');
assert(kolkataTransfer!.totalInterchanges === 1, 'Should have 1 interchange at Esplanade');
assert(
  kolkataTransfer!.segments[0].interchangeAtEnd?.station.id === 'esplanade',
  'Interchange must be at Esplanade'
);
assert(kolkataTransfer!.segments[1].lineId === 'kolkata-blue', 'Second segment must be Blue Line');
console.log(
  `  ✅ Hooghly Crossing + Esplanade Transfer: Howrah -> Kalighat (${kolkataTransfer!.hops} hops, transfer at Esplanade)`
);

// 3. Chennai Metro Routing Tests
console.log('\nTesting Chennai Metro Routes:');

// Test A: Direct Blue Line (Chennai Central to Airport)
const chennaiDirect = findRoute(
  chennaiMetroData,
  'puratchi-thalaivar-dr-mgr-central',
  'chennai-airport'
);
assert(chennaiDirect !== null, 'Direct route Central -> Airport should exist');
assert(chennaiDirect!.totalInterchanges === 0, 'Central to Airport should have 0 interchanges');
assert(chennaiDirect!.segments[0].lineId === 'chennai-blue', 'Must be Blue line');
console.log(`  ✅ Direct Blue Line: Central to Airport (${chennaiDirect!.hops} hops, 0 transfers)`);

// Test B: Green Line to Blue Line Transfer at Alandur (Koyambedu to Airport)
const chennaiTransfer = findRoute(chennaiMetroData, 'koyambedu', 'chennai-airport');
assert(chennaiTransfer !== null, 'Route Koyambedu -> Airport should exist');
assert(chennaiTransfer!.totalInterchanges === 1, 'Should have 1 interchange at Alandur');
assert(
  chennaiTransfer!.segments[0].interchangeAtEnd?.station.id === 'arignar-anna-alandur',
  'Interchange must be at Alandur'
);
console.log(
  `  ✅ Alandur Transfer: Koyambedu -> Airport (${chennaiTransfer!.hops} hops, transfer at Alandur)`
);

// 4. Delhi Metro Routing Tests
console.log('\nTesting Delhi Metro Routes:');

// Test A: Airport Express Transfer at New Delhi (Rajiv Chowk to IGI Airport T3)
const delhiAirport = findRoute(delhiMetroData, 'rajiv-chowk', 'igi-airport-terminal-3');
assert(delhiAirport !== null, 'Route Rajiv Chowk -> Airport T3 should exist');
assert(delhiAirport!.totalInterchanges === 1, 'Should have 1 interchange at New Delhi');
assert(
  delhiAirport!.segments[0].interchangeAtEnd?.station.id === 'new-delhi',
  'Interchange must be at New Delhi'
);
assert(delhiAirport!.segments[1].lineId === 'delhi-airport', 'Second segment must be Airport Express');
console.log(
  `  ✅ Airport Express Link: Rajiv Chowk -> Airport T3 (${delhiAirport!.hops} hops, transfer at New Delhi)`
);

// Test B: Blue Line to Violet Line Transfer at Mandi House (Noida Electronic City to Central Secretariat)
const delhiCross = findRoute(delhiMetroData, 'noida-electronic-city', 'central-secretariat');
assert(delhiCross !== null, 'Noida Electronic City -> Central Secretariat route should exist');
assert(delhiCross!.totalInterchanges === 1, 'Should interchange once');
assert(
  delhiCross!.segments[0].interchangeAtEnd?.station.id === 'mandi-house',
  'Optimal interchange must be at Mandi House'
);
console.log(
  `  ✅ Mandi House Shortcut: Noida Electronic City -> Central Secretariat (transfer at Mandi House)`
);

// Test C: Blue Line to Yellow Line Transfer at Rajiv Chowk (Noida Electronic City to New Delhi)
const delhiRajiv = findRoute(delhiMetroData, 'noida-electronic-city', 'new-delhi');
assert(delhiRajiv !== null, 'Noida Electronic City -> New Delhi route should exist');
assert(delhiRajiv!.totalInterchanges === 1, 'Should interchange once at Rajiv Chowk');
assert(
  delhiRajiv!.segments[0].interchangeAtEnd?.station.id === 'rajiv-chowk',
  'Interchange must be at Rajiv Chowk'
);
console.log(
  `  ✅ Major Interchange: Noida Electronic City -> New Delhi (transfer at Rajiv Chowk)`
);

// 5. Edge Cases & Validation Tests
console.log('\nTesting Edge Cases & Validations:');

// Test A: Same Origin and Destination
const sameStation = findRoute(delhiMetroData, 'rajiv-chowk', 'rajiv-chowk');
assert(sameStation === null, 'Same origin and destination must return null');
console.log('  ✅ Same-station selection correctly returns null');

// Test B: Empty / Non-existent station IDs
const invalidStation = findRoute(delhiMetroData, 'invalid-station-xyz', 'rajiv-chowk');
assert(invalidStation === null, 'Invalid station ID must return null');
console.log('  ✅ Invalid/empty station IDs safely rejected');

// Test C: Station swap symmetry (hops from A -> B == hops from B -> A)
const forwardRoute = findRoute(kolkataMetroData, 'dakshineswar', 'kavi-subhash');
const reverseRoute = findRoute(kolkataMetroData, 'kavi-subhash', 'dakshineswar');
assert(forwardRoute !== null && reverseRoute !== null, 'Both directions must exist');
assert(
  forwardRoute!.hops === reverseRoute!.hops,
  `Forward hops (${forwardRoute!.hops}) must equal reverse hops (${reverseRoute!.hops})`
);
console.log(
  `  ✅ Route Symmetry: Dakshineswar <-> Kavi Subhash bidirectional consistency verified (${forwardRoute!.hops} hops)`
);

console.log('\n🎉 ALL METROMAP TEST SUITES PASSED CLEANLY!\n');
