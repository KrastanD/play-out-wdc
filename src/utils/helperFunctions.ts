import { ConstructorID, ConstructorName, TimeUnit } from "../types";

export function arrayColumn<T>(arr: T[][], n: number) {
  return arr.map((x) => x[n]);
}

export function getConstructorIdFromName(name: ConstructorName): ConstructorID {
  const indexOfName = Object.values(ConstructorName).indexOf(name);
  return Object.values(ConstructorID)[indexOfName] as ConstructorID;
}

export const getTimeString = (amount: number, unit: TimeUnit): string =>
  amount === 1 ? `${amount} ${unit}` : `${amount} ${unit}s`;

export function getTeamColor(team: ConstructorID) {
  switch (team) {
    case "mercedes":
      return "#00d2be";
    case "ferrari":
      return "#dc0000";
    case "red_bull":
      return "#0600ef";
    case "mclaren":
      return "#ff8700";
    case "alpine":
      return "#0090ff";
    case "haas":
      return "#000000";
    case "aston_martin":
      return "#005f62";
    case "williams":
      return "#005aff";
    case "alfa":
      return "#900000";
    case "alphatauri":
      return "#2b4562";
    default:
      return "#000000";
  }
}
