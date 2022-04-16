import { createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../store";

export enum AppVersion {
  WDC2021,
  WCC2021,
  WDC2022,
  WCC2022,
}

export interface ChangeVersionAction {
  type: string;
  payload: AppVersion;
}

export const configSlice = createSlice({
  name: "config",
  initialState: {
    version: AppVersion.WDC2022,
  },
  reducers: {
    changeVersion: (state, action: ChangeVersionAction) => {
      state.version = action.payload;
    },
  },
});

export const { changeVersion } = configSlice.actions;

export default configSlice.reducer;

export const selectConfigVersion = (state: StoreType) => state.config.version;
