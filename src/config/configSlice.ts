import { createSlice } from "@reduxjs/toolkit";

export enum AppVersion {
  WDC,
  WCC,
}

export const configSlice = createSlice({
  name: "config",
  initialState: {
    version: AppVersion.WDC,
  },
  reducers: {
    switchVersion: (state) => {
      if (state.version === AppVersion.WDC) {
        state.version = AppVersion.WCC;
      } else {
        state.version = AppVersion.WDC;
      }
    },
  },
});

export const { switchVersion } = configSlice.actions;

export default configSlice.reducer;
