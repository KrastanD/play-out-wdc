import { useState } from "react";
import "./App.css";

function App() {
  const [raceResults, setRaceResults] = useState<number[][]>(
    Array.from(Array(5), () => new Array(12).fill(0))
  );

  const pointsSystem = [
    [3, 2, 1, 0],
    [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
    [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
    [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
    [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 0],
  ];

  const positions = [
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
    "Fastest Lap",
    "Out of points",
  ];

  const raceMetadata = [
    {
      name: "Brazilian Sprint Race",
    },
    {
      name: "Brazilian GP",
    },
    {
      name: "Qatar Grand Prix",
    },
    {
      name: "Saudi Arabian Grand Prix",
    },
    {
      name: "Abu Dhabi GP",
    },
  ];

  const getDriverTotal = (driverNum: number) => {
    let counter = 0;
    raceResults.forEach((race, raceIndex) => {
      race.forEach((pointWinner, pointIndex) => {
        if (pointWinner === driverNum) {
          counter += pointsSystem[raceIndex][pointIndex];
        }
      });
    });
    return counter;
  };

  const maxTotal = getDriverTotal(1) + 312.5;
  const lewisTotal = getDriverTotal(2) + 293.5;

  const onButtonClick = (driverNum: number, race: number, position: number) => {
    const isFastestLap = (num: number) => num === pointsSystem[1].length - 2;
    const DNF = pointsSystem[1].length - 1;

    let buttonClickRegistered = [...raceResults];

    if (isFastestLap(position)) {
      if (raceResults[race][position] === driverNum) {
        // if previous fastest lap
        buttonClickRegistered[race][position] = 0;
        setRaceResults(() => buttonClickRegistered);
      } else {
        if (raceResults[race][DNF] === driverNum) {
          return;
        }
        buttonClickRegistered[race][position] = driverNum;
        setRaceResults(() => buttonClickRegistered);
      }
      return;
    }

    const previousResult = raceResults[race].findIndex((x) => x === driverNum);

    //If previous result wasn't fastest lap
    if (
      previousResult !== -1 &&
      previousResult !== pointsSystem[1].length - 2
    ) {
      buttonClickRegistered[race][previousResult] = 0;
      if (previousResult === position) {
        // if clicking on previous result
        setRaceResults(() => buttonClickRegistered);
        return;
      }
    }

    if (isFastestLap(previousResult)) {
      if (position === DNF) {
        return;
      }
    }

    buttonClickRegistered[race][position] = driverNum;
    setRaceResults(() => buttonClickRegistered);
  };

  return (
    <div>
      <p
        style={{
          fontSize: 15,
          marginLeft: "5px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        Instructions Desktop: Left Click = Max, Right Click = Lewis <br />
        Instructions Mobile: Tap = Max, Long Press = Lewis
      </p>
      <div className="App" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "45px",
          }}
        >
          {positions.map((position) => (
            <p
              style={{
                lineHeight: "20px",
                paddingTop: "2.5px",
                paddingBottom: "2.5px",
                minWidth: "90px",
                maxWidth: "90px",
              }}
            >
              {position}
            </p>
          ))}
        </div>

        {pointsSystem.map((e, race) => (
          <div
            key={race}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                minWidth: "100px",
                maxWidth: "100px",
                fontSize: "14px",
                height: "25px",
                marginBottom: "20px",
              }}
            >
              {raceMetadata[race].name}
            </p>
            {pointsSystem[race].map((buttonText, position) => (
              <button
                onClick={() => {
                  // means max
                  onButtonClick(1, race, position);
                }}
                style={
                  raceResults[race][position] === 1
                    ? {
                        backgroundColor: "darkblue",
                        color: "white",
                        width: "50px",
                        height: "25px",
                        userSelect: "none",
                      }
                    : raceResults[race][position] === 2
                    ? {
                        backgroundColor: "cyan",
                        width: "50px",
                        height: "25px",
                        userSelect: "none",
                      }
                    : { width: "50px", height: "25px", userSelect: "none" }
                }
                key={position}
                onContextMenu={(e) => {
                  e.preventDefault();
                  //means lewis
                  onButtonClick(2, race, position);
                }}
              >
                {!!buttonText ? buttonText : "DNF"}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "25px" }}>
        <p>Max: {maxTotal} pts</p>
        <p>Lewis: {lewisTotal} pts</p>
        <p>Winner: {maxTotal > lewisTotal ? "Max 🇳🇱" : "Lewis 🇬🇧"}</p>
      </div>
    </div>
  );
}

export default App;
