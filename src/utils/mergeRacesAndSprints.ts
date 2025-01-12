import { Race } from "../types";

export function mergeRacesAndSprints(races: Race[], sprints: Race[]) {
  const updatedSprints = updateSprintNames(sprints);
  const allRaces = [...races, ...updatedSprints];
  allRaces.sort((a, b) => sortRaces(a, b));
  return allRaces;
}

function updateSprintNames(sprints: Race[]) {
  return sprints.map((sprint) => ({
    ...sprint,
    raceName: sprint.raceName + " Sprint",
  }));
}

function sortRaces(a: Race, b: Race) {
  const aNum = Number(a.round);
  const bNum = Number(b.round);
  if (aNum < bNum) {
    return -1;
  }
  if (aNum > bNum) {
    return 1;
  }
  if (a.raceName.length > b.raceName.length) {
    return -1;
  }
  if (a.raceName.length < b.raceName.length) {
    return 1;
  }
  return 0;
}
