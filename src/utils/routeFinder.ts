import { MetroNetwork, MetroRoute, RouteSegment, MetroStation, MetroLine } from '../types/metro';

interface AdjacencyEdge {
  toStationId: string;
  lineId: string;
}

interface PathHop {
  fromStationId: string;
  toStationId: string;
  lineId: string;
}

interface QueueNode {
  stationId: string;
  currentLineId: string | null;
  hops: PathHop[];
  transfers: number;
  cost: number;
}

export function findRoute(
  network: MetroNetwork,
  sourceId: string,
  destinationId: string
): MetroRoute | null {
  if (!sourceId || !destinationId) return null;
  if (sourceId === destinationId) return null;

  const sourceStation = network.stations[sourceId];
  const destStation = network.stations[destinationId];

  if (!sourceStation || !destStation) return null;

  // Build Adjacency Graph from network lines
  const graph: Map<string, AdjacencyEdge[]> = new Map();

  network.lines.forEach((line) => {
    for (let i = 0; i < line.stations.length - 1; i++) {
      const u = line.stations[i];
      const v = line.stations[i + 1];

      if (!graph.has(u)) graph.set(u, []);
      if (!graph.has(v)) graph.set(v, []);

      graph.get(u)!.push({ toStationId: v, lineId: line.id });
      graph.get(v)!.push({ toStationId: u, lineId: line.id });
    }
  });

  // Dijkstra state: key = `${stationId}::${lineId}`
  // Hop cost = 100, transfer penalty = 25
  // Ensures minimal stops first, and if tied, minimal line switches.
  const visited = new Map<string, number>();

  const queue: QueueNode[] = [
    {
      stationId: sourceId,
      currentLineId: null,
      hops: [],
      transfers: 0,
      cost: 0,
    },
  ];

  let bestNode: QueueNode | null = null;

  while (queue.length > 0) {
    // Pick node with lowest cost
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    if (current.stationId === destinationId) {
      bestNode = current;
      break;
    }

    const stateKey = `${current.stationId}::${current.currentLineId || 'NONE'}`;
    const prevCost = visited.get(stateKey);
    if (prevCost !== undefined && prevCost <= current.cost) {
      continue;
    }
    visited.set(stateKey, current.cost);

    const neighbors = graph.get(current.stationId) || [];

    for (const edge of neighbors) {
      // Prevent immediate backtracking along the exact same edge
      if (
        current.hops.length > 0 &&
        current.hops[current.hops.length - 1].fromStationId === edge.toStationId
      ) {
        continue;
      }

      const isTransfer = current.currentLineId !== null && current.currentLineId !== edge.lineId;
      const transferPenalty = isTransfer ? 25 : 0;
      const hopCost = 100;
      const nextCost = current.cost + hopCost + transferPenalty;

      const nextNode: QueueNode = {
        stationId: edge.toStationId,
        currentLineId: edge.lineId,
        hops: [
          ...current.hops,
          {
            fromStationId: current.stationId,
            toStationId: edge.toStationId,
            lineId: edge.lineId,
          },
        ],
        transfers: current.transfers + (isTransfer ? 1 : 0),
        cost: nextCost,
      };

      const nextStateKey = `${edge.toStationId}::${edge.lineId}`;
      const existingCost = visited.get(nextStateKey);
      if (existingCost === undefined || nextCost < existingCost) {
        queue.push(nextNode);
      }
    }
  }

  if (!bestNode || bestNode.hops.length === 0) {
    return null;
  }

  const linesMap = new Map<string, MetroLine>(
    network.lines.map((l) => [l.id, l])
  );

  // Build full ordered path of stations
  const path: MetroStation[] = [sourceStation];
  bestNode.hops.forEach((hop) => {
    path.push(network.stations[hop.toStationId]);
  });

  // Group hops into contiguous segments by lineId
  const segments: RouteSegment[] = [];
  let currentLineId = bestNode.hops[0].lineId;
  let currentStations: MetroStation[] = [sourceStation, network.stations[bestNode.hops[0].toStationId]];

  for (let i = 1; i < bestNode.hops.length; i++) {
    const hop = bestNode.hops[i];
    const toStation = network.stations[hop.toStationId];

    if (hop.lineId === currentLineId) {
      currentStations.push(toStation);
    } else {
      // Line change occurs at currentStations[currentStations.length - 1]
      const interchangeStation = currentStations[currentStations.length - 1];
      const curLine = linesMap.get(currentLineId);
      const nextLine = linesMap.get(hop.lineId);

      segments.push({
        lineId: currentLineId,
        lineName: curLine?.name || 'Metro Line',
        lineColor: curLine?.color || '#3B82F6',
        textColor: curLine?.textColor || '#FFFFFF',
        bgColor: curLine?.bgColor || 'bg-blue-600',
        stations: [...currentStations],
        interchangeAtEnd: {
          station: interchangeStation,
          nextLineId: hop.lineId,
          nextLineName: nextLine?.name || 'Connecting Line',
          nextLineColor: nextLine?.color || '#10B981',
        },
      });

      // Next segment starts at the interchange station
      currentLineId = hop.lineId;
      currentStations = [interchangeStation, toStation];
    }
  }

  // Push final segment
  if (currentStations.length > 0) {
    const finalLine = linesMap.get(currentLineId);
    segments.push({
      lineId: currentLineId,
      lineName: finalLine?.name || 'Metro Line',
      lineColor: finalLine?.color || '#3B82F6',
      textColor: finalLine?.textColor || '#FFFFFF',
      bgColor: finalLine?.bgColor || 'bg-blue-600',
      stations: currentStations,
    });
  }

  const usedLineIds = Array.from(new Set(segments.map((s) => s.lineId)));
  const linesUsed = usedLineIds
    .map((id) => linesMap.get(id))
    .filter((l): l is MetroLine => !!l);

  const totalStations = path.length;
  const hops = Math.max(0, totalStations - 1);
  const totalInterchanges = Math.max(0, segments.length - 1);

  return {
    source: sourceStation,
    destination: destStation,
    totalStations,
    hops,
    totalInterchanges,
    linesUsed,
    segments,
    path,
  };
}
