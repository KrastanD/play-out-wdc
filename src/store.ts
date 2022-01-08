import { configureStore } from "@reduxjs/toolkit";
import configReducer, { AppVersion } from "./config/configSlice";
import { Teams } from "./utils/constants";
import wdcReducer, {
  WDCState,
} from "./components/PointsTable/WDCPointsTable/wdcSlice";
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
  wdc: WDCState;
  wcc: Teams[][];
}
