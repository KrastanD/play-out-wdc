import { createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../../store";
import { Drivers, pointsSystem } from "../../../utils/constants";
import { setPreviousResultsWDC } from "./WDCPointsTablePM";

interface ResultSetAction {
  type: string;
  payload: {
    driverNum: Drivers;
    race: number;
    selectedPosition: number;
  };
}

let initialState: Drivers[][] = Array.from(Array(5), () =>
  new Array(12).fill(Drivers.None)
);

setPreviousResultsWDC(initialState, (updatedState: () => Drivers[][]) => {
  const newState = updatedState();
  initialState = newState;
});

const wdcSlice = createSlice({
  name: "wdc",
  initialState,
  reducers: {
    wdcResultSet(state, action: ResultSetAction) {
      const { selectedPosition, race, driverNum } = action.payload;

      const fastestLapIndex = pointsSystem[1].length - 2;
      const didNotFinishIndex = pointsSystem[1].length - 1;

      if (selectedPosition === fastestLapIndex) {
        if (state[race][selectedPosition] === driverNum) {
          state[race][selectedPosition] = Drivers.None;
        } else {
          if (state[race][didNotFinishIndex] === driverNum) {
            return;
          }
          state[race][selectedPosition] = driverNum;
        }
        return;
      }

      const previousResult = state[race].findIndex((x) => x === driverNum);

      if (state[race][state[0].length - 2] === driverNum) {
        if (selectedPosition === didNotFinishIndex) {
          return;
        }
      }

      if (previousResult !== -1 && previousResult !== fastestLapIndex) {
        state[race][previousResult] = Drivers.None;
        if (previousResult === selectedPosition) {
          return;
        }
      }

      state[race][selectedPosition] = driverNum;
    },
  },
});

export default wdcSlice.reducer;

export const selectWDCResults = (state: StoreType) => state.wdc;

export const { wdcResultSet } = wdcSlice.actions;
