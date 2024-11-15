import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreType } from "../store";
import { Race, ResultsResponse } from "../types";

export enum RequestState {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface ResultsSlice {
  pastRaces: Race[];
  raceStatus: RequestState;
  sprintStatus: RequestState;
  requestYear: number;
  error: string | null;
}

export type FetchResultsProps = {
  year: number;
};

type Action = PayloadAction<
  ResultsResponse,
  string,
  {
    arg: FetchResultsProps;
    requestId: string;
    requestStatus: "fulfilled";
  },
  never
>;

const initialState: ResultsSlice = {
  pastRaces: [],
  raceStatus: RequestState.Idle,
  sprintStatus: RequestState.Idle,
  requestYear: 0,
  error: null,
};

function sortRaces(a: Race, b: Race) {
  const aNum = Number(a.round);
  const bNum = Number(b.round);
  if (aNum < bNum) {
    return -1;
  }
  if (aNum > bNum) {
    return 1;
  }
  if (a.raceName.length > b.raceName.length) {
    return -1;
  }
  if (a.raceName.length < b.raceName.length) {
    return 1;
  }
  return 0;
}

function onFetchSuccess(action: Action, state: ResultsSlice, isSprint = false) {
  const sprints: Race[] = action.payload.MRData.RaceTable.Races;
  const responseYear = Number(action.payload.MRData.RaceTable.season);

  if (state.requestYear !== responseYear) {
    state.pastRaces = [];
  }
  if (sprints.length > 0) {
    sprints.forEach((sprint) => {
      const raceName = isSprint ? `${sprint.raceName} Sprint` : sprint.raceName;

      if (
        state.pastRaces.findIndex(
          (pastRace) => pastRace.raceName === raceName
        ) === -1
      ) {
        sprint.raceName = raceName;
        state.pastRaces.push(sprint);
      }
    });
  }
  state.requestYear = responseYear;

  state.pastRaces.sort((a, b) => sortRaces(a, b));
}

export const fetchRaceResults = createAsyncThunk(
  "results/fetchResults",
  async ({ year }: FetchResultsProps) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${year}/results.json?limit=100`
    );
    const firstJson: ResultsResponse = await response.json();
    const races = firstJson.MRData.RaceTable.Races;

    let limit = Number(firstJson.MRData.limit),
      offset = Number(firstJson.MRData.offset),
      total = Number(firstJson.MRData.total);

    while (offset + limit < total + limit) {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/results.json?limit=100&offset=${
          offset + limit
        }`
      );
      const json: ResultsResponse = await response.json();
      limit = Number(json.MRData.limit);
      offset = Number(json.MRData.offset);
      total = Number(json.MRData.total);
      if (races.at(-1)?.round === json.MRData.RaceTable.Races?.[0]?.round) {
        json.MRData.RaceTable.Races[0].Results.forEach((result) =>
          races.at(-1)?.Results.push(result)
        );
        races.push(...json.MRData.RaceTable.Races.slice(1));
      } else if (json.MRData.RaceTable.Races.length) {
        races.push(...json.MRData.RaceTable.Races);
      }
    }
    return firstJson;
  }
);

export const fetchSprintResults = createAsyncThunk(
  "results/fetchSprintResults",
  async ({ year }: FetchResultsProps) => {
    const sprintResponse = await fetch(
      `https://ergast.com/api/f1/${year}/sprint.json?limit=100`
    );
    const firstJson: ResultsResponse = await sprintResponse.json();
    const races = firstJson.MRData.RaceTable.Races;

    let limit = Number(firstJson.MRData.limit),
      offset = Number(firstJson.MRData.offset),
      total = Number(firstJson.MRData.total);

    while (offset + limit < total + limit) {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/sprint.json?limit=100&offset=${
          offset + limit
        }`
      );
      const json: ResultsResponse = await response.json();
      limit = Number(json.MRData.limit);
      offset = Number(json.MRData.offset);
      total = Number(json.MRData.total);
      if (races.at(-1)?.round === json.MRData.RaceTable.Races?.[0]?.round) {
        json.MRData.RaceTable.Races[0].SprintResults.forEach((result) =>
          races.at(-1)?.SprintResults.push(result)
        );
        races.push(...json.MRData.RaceTable.Races.slice(1));
      } else if (json.MRData.RaceTable.Races.length) {
        races.push(...json.MRData.RaceTable.Races);
      }
    }
    return firstJson;
  }
);

// TODO: Rename file and slice
const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRaceResults.pending, (state) => {
        state.raceStatus = RequestState.Loading;
      })
      .addCase(fetchRaceResults.fulfilled, (state, action) => {
        onFetchSuccess(action, state);
        state.raceStatus = RequestState.Succeeded;
      })
      .addCase(fetchRaceResults.rejected, (state, action) => {
        state.raceStatus = RequestState.Failed;
        state.error = action.error.message ?? "Error retrieving race results";
      })
      .addCase(fetchSprintResults.pending, (state) => {
        state.sprintStatus = RequestState.Loading;
      })
      .addCase(fetchSprintResults.fulfilled, (state, action) => {
        onFetchSuccess(action, state, true);
        state.sprintStatus = RequestState.Succeeded;
      })
      .addCase(fetchSprintResults.rejected, (state) => {
        state.sprintStatus = RequestState.Failed;
      });
  },
});

export default resultsSlice.reducer;

export const selectPastRaces = (state: StoreType) => state.results.pastRaces;

export const selectRaceStatus = (state: StoreType) => state.results.raceStatus;
export const selectSprintStatus = (state: StoreType) =>
  state.results.sprintStatus;
export const selectRequestYear = (state: StoreType) =>
  state.results.requestYear;
export const selectRequestError = (state: StoreType) => state.results.error;
