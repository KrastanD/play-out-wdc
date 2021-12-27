import { configureStore } from "@reduxjs/toolkit";
import configReducer, { AppVersion } from "./config/configSlice";

export default configureStore({
  reducer: {
    config: configReducer,
  },
});

export interface StoreType {
  config: { version: AppVersion };
}
