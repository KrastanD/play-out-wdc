import { Drivers, raceMetadata } from "../../../utils/constants";

export const setPreviousResultsWDC = (
  raceResultsWDC: number[][],
  setRaceResultsWDC: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  let buttonClickRegistered = [...raceResultsWDC];

  raceMetadata.forEach((race, index) => {
    if (race.Max) {
      race.Max.forEach((result) => {
        buttonClickRegistered[index][result] = Drivers.Max;
      });
    }
    if (race.Lewis) {
      race.Lewis.forEach((result) => {
        buttonClickRegistered[index][result] = Drivers.Lewis;
      });
    }
  });
  setRaceResultsWDC(() => buttonClickRegistered);
};
