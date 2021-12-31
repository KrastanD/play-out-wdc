import { createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../../store";
import { pointsSystem, Teams } from "../../../utils/constants";
import { setPreviousResultsWCC } from "./WCCPointsTablePM";

interface WCCResultSetAction {
  type: string;
  payload: {
    teamNum: Teams;
    race: number;
    selectedPosition: number;
  };
}

let initialState: Teams[][] = Array.from(Array(5), () =>
  new Array(12).fill(Teams.None)
);

setPreviousResultsWCC(initialState, (updatedState: () => Teams[][]) => {
  const newState = updatedState();
  initialState = newState;
});

const wccSlice = createSlice({
  name: "wcc",
  initialState,
  reducers: {
    wccResultSet(state, action: WCCResultSetAction) {
      const { teamNum, race, selectedPosition } = action.payload;
      const fastestLapIndex = pointsSystem[1].length - 2;
      const didNotFinishIndex = pointsSystem[1].length - 1;

      let previousResults: Teams[] = [];
      state[race].forEach((result, index) => {
        if (result === teamNum) {
          previousResults.push(index);
        }
      });

      if (selectedPosition === fastestLapIndex) {
        if (state[race][selectedPosition] === teamNum) {
          state[race][selectedPosition] = Teams.None;
        } else {
          if (
            previousResults.length === 1 &&
            previousResults[0] === didNotFinishIndex
          ) {
            return;
          }
          state[race][selectedPosition] = teamNum;
        }
        return;
      }

      if (
        previousResults.length === 1 &&
        state[race][fastestLapIndex] === teamNum &&
        selectedPosition === didNotFinishIndex
      ) {
        return;
      }

      if (previousResults.includes(selectedPosition)) {
        state[race][selectedPosition] = Teams.None;
        return;
      }

      previousResults = previousResults.filter(
        (position) => position !== fastestLapIndex
      );

      if (previousResults.length === 1 || previousResults.length === 0) {
        state[race][selectedPosition] = teamNum;
        return;
      }
      if (previousResults.length === 2) {
        // TODO: should do replacement in a more consistent way
        state[race][previousResults[0]] = Teams.None;
        state[race][selectedPosition] = teamNum;
        return;
      }
    },
  },
});

export default wccSlice.reducer;

export const selectWCCResults = (state: StoreType) => state.wcc;

export const { wccResultSet } = wccSlice.actions;
