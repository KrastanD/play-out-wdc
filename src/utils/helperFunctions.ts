import { ConstructorID, ConstructorName, TimeUnit } from "../types";
import { Constructors } from "./constants";

export function arrayColumn<T>(arr: T[][], n: number) {
  return arr.map((x) => x[n]);
}

export function getConstructorIdFromName(
  name: ConstructorName
): ConstructorID | undefined {
  const keys = Object.keys(Constructors) as ConstructorID[];
  const constructor = keys.find((key) => Constructors[key].name === name);
  if (constructor) {
    return constructor;
  }
  return undefined;
}

export function getTeamColor(constructorId: ConstructorID) {
  return Constructors[constructorId].mainColor;
}

export const getTimeString = (amount: number, unit: TimeUnit): string =>
  amount === 1 ? `${amount} ${unit}` : `${amount} ${unit}s`;
