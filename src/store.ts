import { configureStore } from "@reduxjs/toolkit";
import configReducer, { AppVersion } from "./config/configSlice";
import { Drivers, Teams } from "./utils/constants";
import wdcReducer from "./components/PointsTable/WDCPointsTable/wdcSlice";
import wccReducer from "./components/PointsTable/WCCPointsTable/wccSlice";

export default configureStore({
  reducer: {
    config: configReducer,
    wdc: wdcReducer,
    wcc: wccReducer,
  },
  devTools: true,
});

export interface StoreType {
  config: { version: AppVersion };
  wdc: Drivers[][];
  wcc: Teams[][];
}
