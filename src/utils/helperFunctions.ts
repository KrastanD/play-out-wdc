import { ConstructorID, ConstructorName } from "../types";

export function arrayColumn<T>(arr: T[][], n: number) {
  return arr.map((x) => x[n]);
}

export function getConstructorIdFromName(name: ConstructorName): ConstructorID {
  const indexOfName = Object.values(ConstructorName).indexOf(name);
  return Object.values(ConstructorID)[indexOfName] as ConstructorID;
}
