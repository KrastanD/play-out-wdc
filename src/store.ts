import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import resultsReducer, { ResultsSlice } from "./slices/resultsSlice";

const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
  devTools: true,
});

export interface StoreType {
  results: ResultsSlice;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
