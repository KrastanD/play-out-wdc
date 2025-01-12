import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchRaceResults } from "./utils/fetchRaceResults";
import { fetchSprintResults } from "./utils/fetchSprintResults";

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchRaceResults: build.query({
      queryFn: async ({ year }: { year: number }) => {
        const races = await fetchRaceResults(year);
        return { data: races };
      },
    }),
    fetchSprintResults: build.query({
      queryFn: async ({ year }: { year: number }) => {
        const races = await fetchSprintResults(year);
        return { data: races };
      },
    }),
  }),
});

export const { useFetchRaceResultsQuery, useFetchSprintResultsQuery } = api;
