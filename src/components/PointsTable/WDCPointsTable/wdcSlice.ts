import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../../store";
import { Race, ResultsResponse } from "../../../types";
import { Drivers, pointsSystem } from "../../../utils/constants";

interface WDCResultSetAction {
  type: string;
  payload: {
    driverNum: Drivers;
    race: number;
    selectedPosition: number;
  };
}

export interface WDCState {
  results: Drivers[][];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

let initialState: WDCState = {
  results: Array.from(Array(21), () => new Array(12).fill(Drivers.None)),
  status: "idle",
  error: null,
};

export const fetchResults = createAsyncThunk("wdc/fetchResults", async () => {
  const response = await fetch(
    "http://ergast.com/api/f1/2021/results.json?limit=450"
  );

  const jsonResponse: Promise<ResultsResponse> = response.json();
  return jsonResponse;
});

const wdcSlice = createSlice({
  name: "wdc",
  initialState,
  reducers: {
    wdcResultSet(state, action: WDCResultSetAction) {
      const { selectedPosition, race, driverNum } = action.payload;

      const fastestLapIndex = pointsSystem.length - 2;
      const didNotFinishIndex = pointsSystem.length - 1;

      if (selectedPosition === fastestLapIndex) {
        if (state.results[race][selectedPosition] === driverNum) {
          state.results[race][selectedPosition] = Drivers.None;
        } else {
          if (state.results[race][didNotFinishIndex] === driverNum) {
            return;
          }
          state.results[race][selectedPosition] = driverNum;
        }
        return;
      }

      const previousResult = state.results[race].findIndex(
        (x) => x === driverNum
      );

      if (state.results[race][state.results[0].length - 2] === driverNum) {
        if (selectedPosition === didNotFinishIndex) {
          return;
        }
      }

      if (previousResult !== -1 && previousResult !== fastestLapIndex) {
        state.results[race][previousResult] = Drivers.None;
        if (previousResult === selectedPosition) {
          return;
        }
      }

      state.results[race][selectedPosition] = driverNum;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchResults.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        const races: Race[] = action.payload.MRData.RaceTable.Races;
        const raceResults: Drivers[][] = Array.from(Array(22), () =>
          new Array(12).fill(Drivers.None)
        );
        races.forEach((race, raceIndex) => {
          race.Results.forEach((raceResult, raceResultIndex) => {
            if (raceResultIndex < 9) {
              if (raceResult.Driver.givenName === "Max") {
                raceResults[raceIndex][raceResultIndex] = Drivers.Max;
                if (raceResult.FastestLap?.rank === "1") {
                  raceResults[raceIndex][10] = Drivers.Max;
                }
              }
              if (raceResult.Driver.givenName === "Lewis") {
                raceResults[raceIndex][raceResultIndex] = Drivers.Lewis;
                if (raceResult.FastestLap?.rank === "1") {
                  raceResults[raceIndex][10] = Drivers.Lewis;
                }
              }
            }
          });
        });
        state.results = raceResults;
        state.status = "succeeded";
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error retrieving race results";
      });
  },
});

export default wdcSlice.reducer;

export const selectWDCResults = (state: StoreType) => state.wdc.results;

export const selectWDCStatus = (state: StoreType) => state.wdc.status;

export const { wdcResultSet } = wdcSlice.actions;
