export const arrayColumn = (arr: number[][], n: number) => arr.map((x) => x[n]);

export const getTimeString = (amount: number, unit: string): string => {
    return amount === 1 ? `${amount} ${unit}` : `${amount} ${unit}s`;
  };