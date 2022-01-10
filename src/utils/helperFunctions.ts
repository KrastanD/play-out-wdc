export const arrayColumn = (arr: number[][], n: number) => arr.map((x) => x[n]);

type TimeUnit = "second" | "minute" | "hour" | "day" | "month" | "year"

export const getTimeString = (amount: number, unit: TimeUnit): string => {
    return amount === 1 ? `${amount} ${unit}` : `${amount} ${unit}s`;
  };