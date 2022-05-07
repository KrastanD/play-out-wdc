export enum DriverNationality {
  Australian = "Australian",
  British = "British",
  Canadian = "Canadian",
  Dutch = "Dutch",
  Finnish = "Finnish",
  French = "French",
  German = "German",
  Italian = "Italian",
  Japanese = "Japanese",
  Mexican = "Mexican",
  Monegasque = "Monegasque",
  Polish = "Polish",
  Russian = "Russian",
  Spanish = "Spanish",
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: DriverNationality;
}

export enum ConstructorName {
  AlfaRomeo = "Alfa Romeo",
  AlphaTauri = "AlphaTauri",
  AlpineF1Team = "Alpine F1 Team",
  AstonMartin = "Aston Martin",
  Ferrari = "Ferrari",
  HaasF1Team = "Haas F1 Team",
  McLaren = "McLaren",
  Mercedes = "Mercedes",
  RedBull = "Red Bull",
  Williams = "Williams",
  RacingPoint = "Racing Point",
  Renault = "Renault",
  ToroRosso = "Toro Rosso",
  ForceIndia = "Force India",
  Sauber = "Sauber",
  Manor = "Manor",
  LotusF1 = "Lotus F1",
  Caterham = "Caterham",
  Marussia = "Marussia",
  Hrt = "HRT",
  LotusRacing = "Team Lotus",
  Virgin = "Virgin",
}

export enum ConstructorNationality {
  American = "American",
  Austrian = "Austrian",
  British = "British",
  French = "French",
  German = "German",
  Italian = "Italian",
  Swiss = "Swiss",
}

export enum ConstructorID {
  AlfaRomeo = "alfa",
  Alphatauri = "alphatauri",
  Alpine = "alpine",
  AstonMartin = "aston_martin",
  Ferrari = "ferrari",
  Haas = "haas",
  Mclaren = "mclaren",
  Mercedes = "mercedes",
  RedBull = "red_bull",
  Williams = "williams",
  RacingPoint = "racing_point",
  Renault = "renault",
  ToroRosso = "toro_rosso",
  ForceIndia = "force_india",
  Sauber = "sauber",
  Manor = "manor",
  LotusF1 = "lotus_f1",
  Caterham = "caterham",
  Marussia = "marussia",
  Hrt = "hrt",
  LotusRacing = "lotus_racing",
  Virgin = "virgin",
}

export interface Constructor {
  constructorId: ConstructorID;
  url: string;
  name: ConstructorName;
  nationality: ConstructorNationality;
}

export enum Units {
  Kph = "kph",
}

export interface AverageSpeed {
  units: Units;
  speed: string;
}
export interface FastestLapTime {
  time: string;
}
export interface FastestLap {
  rank: string;
  lap: string;
  Time: FastestLapTime;
  AverageSpeed: AverageSpeed;
}

export interface ResultTime {
  millis: string;
  time: string;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: ResultTime;
  FastestLap?: FastestLap;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}
export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}
export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: Date;
  time: string;
  Results: Result[];
  SprintResults: Result[];
}

export interface RaceTable {
  season: string;
  Races: Race[];
}

export interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}

export interface ResultsResponse {
  MRData: MRData;
}

export interface TeamResultType {
  race: string;
  constructor: ConstructorName;
  points: number;
}
export type TimeUnit = "second" | "minute" | "hour" | "day" | "month" | "year";
