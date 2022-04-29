import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import resultsReducer, { ResultsSlice } from "./slices/resultsSlice";
import configReducer, { AppVersion } from "./slices/configSlice";

const store = configureStore({
  reducer: {
    config: configReducer,
    results: resultsReducer,
  },
  devTools: true,
});

export interface StoreType {
  config: { version: AppVersion };
  results: ResultsSlice;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
