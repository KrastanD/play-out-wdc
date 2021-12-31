import { configureStore } from "@reduxjs/toolkit";
import configReducer, { AppVersion } from "./config/configSlice";
import { Drivers } from "./utils/constants";
import wdcReducer from "./components/PointsTable/WDCPointsTable/wdcSlice";

export default configureStore({
  reducer: {
    config: configReducer,
    wdc: wdcReducer,
  },
  devTools: true,
});

export interface StoreType {
  config: { version: AppVersion };
  wdc: Drivers[][];
}
