import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import configReducer, { AppVersion } from "./config/configSlice";
import { Teams } from "./utils/constants";
import wdcReducer, { WDCState } from "./components/PastResultsTable/wdcSlice";
import wccReducer from "./components/PastTeamResultsTable/wccSlice";

const store = configureStore({
  reducer: {
    config: configReducer,
    wdc: wdcReducer,
    wcc: wccReducer,
  },
  devTools: true,
});

export interface StoreType {
  config: { version: AppVersion };
  wdc: WDCState;
  wcc: Teams[][];
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
