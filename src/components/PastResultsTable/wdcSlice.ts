import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../store";
import { Race, ResultsResponse } from "../../types";
import { Drivers, pointsSystem } from "../../utils/constants";

interface WDCResultSetAction {
  type: string;
  payload: {
    driverNum: Drivers;
    race: number;
    selectedPosition: number;
  };
}

export enum RequestState {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface WDCState {
  userResults: Drivers[][];
  pastRaces: Race[];
  status: RequestState;
  error: string | null;
}

let initialState: WDCState = {
  // TODO: userResults size should be based on remaining races
  userResults: Array.from(Array(21), () => new Array(12).fill(Drivers.None)),
  pastRaces: [],
  status: RequestState.Idle,
  error: null,
};

export const fetchResults = createAsyncThunk("wdc/fetchResults", async () => {
  // TODO: pull string into constants
  const response = await fetch(
    "https://ergast.com/api/f1/2021/results.json?limit=450"
  );

  const jsonResponse: Promise<ResultsResponse> = response.json();
  return jsonResponse;
});

// TODO: Rename file and slice
const wdcSlice = createSlice({
  name: "wdc",
  initialState,
  reducers: {
    wdcResultSet(state, action: WDCResultSetAction) {
      const { selectedPosition, race, driverNum } = action.payload;

      const fastestLapIndex = pointsSystem.length - 2;
      const didNotFinishIndex = pointsSystem.length - 1;

      if (selectedPosition === fastestLapIndex) {
        if (state.userResults[race][selectedPosition] === driverNum) {
          state.userResults[race][selectedPosition] = Drivers.None;
        } else {
          if (state.userResults[race][didNotFinishIndex] === driverNum) {
            return;
          }
          state.userResults[race][selectedPosition] = driverNum;
        }
        return;
      }

      const previousResult = state.userResults[race].findIndex(
        (x) => x === driverNum
      );

      if (
        state.userResults[race][state.userResults[0].length - 2] === driverNum
      ) {
        if (selectedPosition === didNotFinishIndex) {
          return;
        }
      }

      if (previousResult !== -1 && previousResult !== fastestLapIndex) {
        state.userResults[race][previousResult] = Drivers.None;
        if (previousResult === selectedPosition) {
          return;
        }
      }

      state.userResults[race][selectedPosition] = driverNum;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchResults.pending, (state, _) => {
        state.status = RequestState.Loading;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        const races: Race[] = action.payload.MRData.RaceTable.Races;
        state.pastRaces = races;
        state.status = RequestState.Succeeded;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = RequestState.Failed;
        state.error = action.error.message ?? "Error retrieving race results";
      });
  },
});

export default wdcSlice.reducer;

export const selectWDCUserResults = (state: StoreType) => state.wdc.userResults;

export const selectWDCPastRaces = (state: StoreType) => state.wdc.pastRaces;

export const selectWDCStatus = (state: StoreType) => state.wdc.status;

export const { wdcResultSet } = wdcSlice.actions;
