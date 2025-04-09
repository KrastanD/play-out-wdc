import { Race, ResultsResponse } from "../../types";

export async function fetchRaceResults(year: number) {
  const races: Race[] = [];

  let limit = 100;
  let offset = 0;
  let total = 0;

  do {
    const json: ResultsResponse = await fetchResultsJson(year, limit, offset);

    limit = Number(json.MRData.limit);
    offset = Number(json.MRData.offset) + limit;
    total = Number(json.MRData.total);

    const newRaces = json.MRData.RaceTable.Races;

    mergeNewRaces(races, newRaces);
  } while (offset + limit < total + limit);

  return races;
}

async function fetchResultsJson(year: number, limit: number, offset: number) {
  const baseUrl = "https://api.jolpi.ca/ergast/f1/";
  const response = await fetch(
    `${baseUrl}${year}/results.json?limit=${limit}&offset=${offset}`
  );

  const json: ResultsResponse = await response.json();
  return json;
}

function mergeNewRaces(races: Race[], newRaces: Race[]) {
  const isRaceSplitBetweenResponses =
    races.at(-1)?.round === newRaces?.[0]?.round;

  if (isRaceSplitBetweenResponses) {
    mergeSplitRaceResults(races, newRaces);
    races.push(...newRaces.slice(1));
  } else if (newRaces.length) {
    races.push(...newRaces);
  }
}

function mergeSplitRaceResults(races: Race[], newRaces: Race[]) {
  const lastRace = races.at(-1);
  const firstRace = newRaces[0];
  firstRace?.Results.forEach((result) => lastRace?.Results.push(result));
}
