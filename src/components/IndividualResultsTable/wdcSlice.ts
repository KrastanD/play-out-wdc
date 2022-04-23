import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../store";
import { Race, ResultsResponse } from "../../types";

export enum RequestState {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface WDCState {
  pastRaces: Race[];
  raceStatus: RequestState;
  sprintStatus: RequestState;
  requestYear: number;
  error: string | null;
}

export type FetchResultsProps = {
  year: number;
};

const initialState: WDCState = {
  // TODO: userResults size should be based on remaining races
  pastRaces: [],
  raceStatus: RequestState.Idle,
  sprintStatus: RequestState.Idle,
  requestYear: 2022,
  error: null,
};

export const fetchRaceResults = createAsyncThunk(
  "wdc/fetchResults",
  async ({ year }: FetchResultsProps) => {
    // TODO: pull string into constants
    const response = await fetch(
      `https://ergast.com/api/f1/${year}/results.json?limit=450`
    );
    const raceJson: Promise<ResultsResponse> = response.json();
    return raceJson;
  }
);

export const fetchSprintResults = createAsyncThunk(
  "wdc/fetchSprintResults",
  async ({ year }: FetchResultsProps) => {
    // TODO: pull string into constants
    const sprintResponse = await fetch(
      `https://ergast.com/api/f1/${year}/sprint.json?limit=450`
    );
    const sprintJson: Promise<ResultsResponse> = sprintResponse.json();
    return sprintJson;
  }
);

// TODO: Rename file and slice
const wdcSlice = createSlice({
  name: "wdc",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRaceResults.pending, (state) => {
        state.raceStatus = RequestState.Loading;
      })
      .addCase(fetchRaceResults.fulfilled, (state, action) => {
        const races: Race[] = action.payload.MRData.RaceTable.Races;
        const responseYear = Number(action.payload.MRData.RaceTable.season);
        if (state.requestYear !== responseYear) {
          state.pastRaces = [];
        }
        races.forEach((race) => {
          if (
            state.pastRaces.findIndex(
              (pastRace) => pastRace.raceName === race.raceName
            ) === -1
          ) {
            state.pastRaces.push(race);
          }
        });
        state.pastRaces.sort((a, b) => {
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
        });
        state.requestYear = responseYear;
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
        const sprints: Race[] = action.payload.MRData.RaceTable.Races;
        const responseYear = Number(action.payload.MRData.RaceTable.season);
        if (state.requestYear !== responseYear) {
          state.pastRaces = [];
        }
        if (sprints.length > 0) {
          sprints.forEach((sprint) => {
            if (
              state.pastRaces.findIndex(
                (pastRace) => pastRace.raceName === `${sprint.raceName} Sprint`
              ) === -1
            ) {
              sprint.raceName = `${sprint.raceName} Sprint`;
              state.pastRaces.push(sprint);
            }
          });
          state.requestYear = responseYear;
        }
        state.pastRaces.sort((a, b) => {
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
        });
        state.sprintStatus = RequestState.Succeeded;
      })
      .addCase(fetchSprintResults.rejected, (state) => {
        state.sprintStatus = RequestState.Failed;
      });
  },
});

export default wdcSlice.reducer;

export const selectWDCPastRaces = (state: StoreType) => state.wdc.pastRaces;

export const selectWDCRaceStatus = (state: StoreType) => state.wdc.raceStatus;
export const selectWDCSprintStatus = (state: StoreType) =>
  state.wdc.sprintStatus;
export const selectWDCRequestYear = (state: StoreType) => state.wdc.requestYear;
