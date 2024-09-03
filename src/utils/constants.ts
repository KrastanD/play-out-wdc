import { ConstructorID, ConstructorName } from "../types";

export const positions = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
];

export const darkTextColorTeams = [
  ConstructorID.Haas,
  ConstructorID.Renault,
  ConstructorID.LotusF1,
  ConstructorID.Hrt,
];

type ConstructorsType = {
  [key in ConstructorID]: {
    name: ConstructorName;
    mainColor: string;
  };
};

export const Constructors: ConstructorsType = {
  [ConstructorID.Mercedes]: {
    name: ConstructorName.Mercedes,
    mainColor: "#00d2be",
  },
  [ConstructorID.Ferrari]: {
    name: ConstructorName.Ferrari,
    mainColor: "#dc0000",
  },
  [ConstructorID.RedBull]: {
    name: ConstructorName.RedBull,
    mainColor: "#0600ef",
  },
  [ConstructorID.Mclaren]: {
    name: ConstructorName.McLaren,
    mainColor: "#ff8700",
  },
  [ConstructorID.Alpine]: {
    name: ConstructorName.AlpineF1Team,
    mainColor: "#0090ff",
  },
  [ConstructorID.AlfaRomeo]: {
    name: ConstructorName.AlfaRomeo,
    mainColor: "#900000",
  },
  [ConstructorID.Alphatauri]: {
    name: ConstructorName.AlphaTauri,
    mainColor: "#2b4562",
  },
  [ConstructorID.Haas]: {
    name: ConstructorName.HaasF1Team,
    mainColor: "#000000",
  },
  [ConstructorID.AstonMartin]: {
    name: ConstructorName.AstonMartin,
    mainColor: "#005f62",
  },
  [ConstructorID.Williams]: {
    name: ConstructorName.Williams,
    mainColor: "#005aff",
  },
  [ConstructorID.RacingPoint]: {
    name: ConstructorName.RacingPoint,
    mainColor: "#F596C8",
  },
  [ConstructorID.Renault]: {
    name: ConstructorName.Renault,
    mainColor: "#FFF500",
  },
  [ConstructorID.ToroRosso]: {
    name: ConstructorName.ToroRosso,
    mainColor: "#469BFF",
  },
  [ConstructorID.ForceIndia]: {
    name: ConstructorName.ForceIndia,
    mainColor: "#FF80C7",
  },
  [ConstructorID.Sauber]: {
    name: ConstructorName.Sauber,
    mainColor: "#006EFF",
  },
  [ConstructorID.Manor]: {
    name: ConstructorName.Manor,
    mainColor: "#ed1b24",
  },
  [ConstructorID.LotusF1]: {
    name: ConstructorName.LotusF1,
    mainColor: "#FFB800",
  },
  [ConstructorID.Hrt]: {
    name: ConstructorName.Hrt,
    mainColor: "#FBB900",
  },
  [ConstructorID.LotusRacing]: {
    name: ConstructorName.LotusRacing,
    mainColor: "#003C1C",
  },
  [ConstructorID.Virgin]: {
    name: ConstructorName.Virgin,
    mainColor: "#F4322C",
  },
  [ConstructorID.Marussia]: {
    name: ConstructorName.Marussia,
    mainColor: "#6E0000",
  },
  [ConstructorID.Caterham]: {
    name: ConstructorName.Caterham,
    mainColor: "#004F30",
  },
  [ConstructorID.Rb]: {
    name: ConstructorName.Rb,
    mainColor: "#1636C1",
  },
};
