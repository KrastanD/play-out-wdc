export interface MetadataType {
  name: string;
  Max?: number[];
  Lewis?: number[];
}

export const raceMetadata: MetadataType[] = [
  {
    name: "Brazilian Sprint Race",
    Max: [1],
    Lewis: [3],
  },
  {
    name: "Brazilian GP",
    Max: [1],
    Lewis: [0],
  },
  {
    name: "Qatar Grand Prix",
  },
  {
    name: "Saudi Arabian Grand Prix",
  },
  {
    name: "Abu Dhabi GP",
  },
];

export const positions = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "Fastest Lap",
  "Out of points",
];

export const pointsSystem = [
  [3, 2, 1, 0],
  [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
  [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
  [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
  [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
];
