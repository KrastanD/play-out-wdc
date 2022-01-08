export interface MetadataType {
  name: string;
  Max?: number[];
  Lewis?: number[];
  RedBull?: number[];
  Mercedes?: number[];
}

export const raceMetadata: MetadataType[] = [
  {
    name: "Brazilian Sprint Race",
    Max: [1],
    Lewis: [3],
    RedBull: [1],
    Mercedes: [0],
  },
  {
    name: "Brazilian GP",
    Max: [1],
    Lewis: [0],
    RedBull: [1, 3, 10],
    Mercedes: [0, 2],
  },
  {
    name: "Qatar Grand Prix",
    Max: [1, 10],
    Lewis: [0],
    RedBull: [1, 3, 10],
    Mercedes: [0, 11],
  },
  {
    name: "Saudi Arabian Grand Prix",
  },
  {
    name: "Abu Dhabi GP",
  },
];

export const teamTiebreakerData = {
  1: [9, 5, 4, 3, 3, 1, 0, 1, 2, 0],
  2: [6, 8, 8, 2, 2, 1, 1, 0, 0, 0],
};

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

export const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0];

export enum Drivers {
  None,
  Max,
  Lewis,
}

export enum Teams {
  None,
  RedBull,
  Mercedes,
}
