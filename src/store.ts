import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import configReducer, { AppVersion } from "./config/configSlice";
import { Teams } from "./utils/constants";
import wdcReducer, {
  WDCState,
} from "./components/IndividualResultsTable/wdcSlice";

const store = configureStore({
  reducer: {
    config: configReducer,
    wdc: wdcReducer,
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
