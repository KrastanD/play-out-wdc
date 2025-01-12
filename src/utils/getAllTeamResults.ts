import { Race, TeamResultType } from "../types";

export const getAllTeamResults = (allRaces: Race[]) => {
  const allTeamResults: TeamResultType[][] = [];
  allRaces.forEach((race) => {
    allTeamResults.push(getTeamResults(race));
  });
  return allTeamResults;
};

const getTeamResults = (race: Race) => {
  const teamResults: TeamResultType[] = [];
  const results = race.Results ?? race.SprintResults;
  results.forEach((result) => {
    const teamResultsIndex = teamResults.findIndex(
      (teamResult) => teamResult.constructor === result.Constructor.name
    );
    if (teamResultsIndex > -1) {
      teamResults[teamResultsIndex].points += Number(result.points);
    } else {
      teamResults.push({
        race: race.raceName,
        constructor: result.Constructor.name,
        points: Number(result.points),
      });
    }
  });
  teamResults.sort((constructorA, constructorB) => {
    if (constructorA.points > constructorB.points) {
      return -1;
    }
    if (constructorB.points > constructorA.points) {
      return 1;
    }
    return 0;
  });
  return teamResults;
};
