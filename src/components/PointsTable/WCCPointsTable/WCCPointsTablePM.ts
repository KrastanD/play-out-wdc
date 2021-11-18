import { raceMetadata, Teams } from "../../../utils/constants";

export const setPreviousResultsWCC = (
  raceResultsWCC: number[][],
  setRaceResultsWCC: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  let buttonClickRegistered = [...raceResultsWCC];

  raceMetadata.forEach((race, index) => {
    if (race.RedBull) {
      race.RedBull.forEach((result: number) => {
        buttonClickRegistered[index][result] = Teams.RedBull;
      });
    }
    if (race.Mercedes) {
      race.Mercedes.forEach((result: number) => {
        buttonClickRegistered[index][result] = Teams.Mercedes;
      });
    }
  });
  setRaceResultsWCC(() => buttonClickRegistered);
};
