import axios from "axios";
import { MetadataType } from "../utils/constants";
import { Race } from "./types";

// Generate raceMetadata
export const raceMetadata: MetadataType[] = [];

const fetchResults = async () => {
  const maxResp = await axios({
    method: "GET",
    url: "http://ergast.com/api/f1/2021/drivers/max_verstappen/results.json",
  });
  const maxRaces: Race[] = maxResp.data.MRData.RaceTable.Races;

  const lewisResp = await axios({
    method: "GET",
    url: "http://ergast.com/api/f1/2021/drivers/hamilton/results.json",
  });
  const lewisRaces: Race[] = lewisResp.data.MRData.RaceTable.Races;

  const redBullResp = await axios({
    method: "GET",
    url: "http://ergast.com/api/f1/2021/constructors/red_bull/results.json?limit=45",
  });
  const redBullRaces: Race[] = redBullResp.data.MRData.RaceTable.Races;

  const mercedesResp = await axios({
    method: "GET",
    url: "http://ergast.com/api/f1/2021/constructors/mercedes/results.json?limit=45",
  });
  const mercedesRaces: Race[] = mercedesResp.data.MRData.RaceTable.Races;

  maxRaces.forEach((race, index: number) => {
    raceMetadata[index] = { name: race.raceName };
    raceMetadata[index].Max = [];
    let position = parseInt(race.Results[0].position) - 1;
    if (position > 9) {
      position = 9;
    }
    raceMetadata[index].Max = [position];
    if (
      race.Results[0].FastestLap?.rank &&
      race.Results[0].FastestLap.rank === "1"
    ) {
      if (position !== 9) {
        raceMetadata[index].Max?.push(10);
      }
    }
  });

  lewisRaces.forEach((race, index: number) => {
    raceMetadata[index].Lewis = [];
    let position = parseInt(race.Results[0].position) - 1;
    if (position > 9) {
      position = 9;
    }
    raceMetadata[index].Lewis = [position];
    if (
      race.Results[0].FastestLap?.rank &&
      race.Results[0].FastestLap.rank === "1"
    ) {
      if (position !== 9) {
        raceMetadata[index].Lewis?.push(10);
      }
    }
  });

  redBullRaces.forEach((race, raceIndex: number) => {
    raceMetadata[raceIndex].RedBull = [];
    race.Results.forEach((Result, resultIndex) => {
      let position = parseInt(race.Results[resultIndex].position) - 1;
      if (position > 9) {
        position = 11;
      }
      raceMetadata[raceIndex].RedBull?.push(position);
      if (
        race.Results[resultIndex].FastestLap?.rank &&
        race.Results[resultIndex].FastestLap?.rank === "1"
      ) {
        if (position !== 9) {
          raceMetadata[raceIndex].RedBull?.push(10);
        }
      }
    });
  });

  mercedesRaces.forEach((race, raceIndex: number) => {
    raceMetadata[raceIndex].Mercedes = [];
    race.Results.forEach((Result, resultIndex) => {
      let position = parseInt(race.Results[resultIndex].position) - 1;
      if (position > 9) {
        position = 11;
      }
      raceMetadata[raceIndex].Mercedes?.push(position);
      if (
        race.Results[resultIndex].FastestLap?.rank &&
        race.Results[resultIndex].FastestLap?.rank === "1"
      ) {
        if (position !== 9) {
          raceMetadata[raceIndex].Mercedes?.push(10);
        }
      }
    });
  });

  console.log(JSON.stringify(raceMetadata));
};

export default fetchResults;
