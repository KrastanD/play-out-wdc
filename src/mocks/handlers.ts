import { http, HttpResponse } from "msw";
import results2023 from "./results/results2023";
import sprints2023 from "./results/sprints2023";

export const handlers = [
  http.get("https://ergast.com/api/f1/:year/results.json", ({ params }) => {
    const { year } = params;
    if (Number(year) === 2023) {
      return HttpResponse.json(results2023);
    }
  }),
  http.get("https://ergast.com/api/f1/:year/sprints.json", ({ params }) => {
    const { year } = params;
    if (Number(year) === 2023) {
      return HttpResponse.json(sprints2023);
    }
  }),
];
