import { useState } from "react";
import "./App.css";
import ContextMenuHandler from "./contextMenuHandler";

function App() {
  const [raceResults, setRaceResults] = useState<number[][]>(
    Array.from(Array(5), () => new Array(12).fill(0))
  );

  const contextMenuHandler = new ContextMenuHandler();

  const COLOR_MERCEDES = "#00D2BE";
  const COLOR_REDBULL = "#0600EF";

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

  const arrayColumn = (arr: number[][], n: number) => arr.map((x) => x[n]);

  return (
    <div>
      <nav className="navbar navbar-light bg-danger">
        <h3 className="mx-4 my-1 text-light">Play Out WDC</h3>
      </nav>
      <div className="container">
        <div className="row justify-content-sm-center">
          <div className="col col-sm-6 rounded my-2 bg-danger bg-gradient bg-opacity-10">
            <h5 className="d-sm-none text-center">
              Instructions
              <br />
              Tap -{">"} Max
              <br />
              Long Press -{">"} Lewis
            </h5>
            <h5 className="d-none d-sm-block text-center">
              Instructions
              <br />
              Left Click -{">"} Max
              <br />
              Right Click -{">"} Lewis
            </h5>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h4 className="col text-center">Max: {maxTotal} pts</h4>
          <h4 className="col text-center">Lewis: {lewisTotal} pts</h4>
        </div>
        <div className="row">
          <h3 className="col text-center">
            Winner: {maxTotal > lewisTotal ? "Max 🇳🇱" : "Lewis 🇬🇧"}
          </h3>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%" }}>
                Position
              </th>
              {raceMetadata.map((meta) => (
                <th scope="col" style={{ width: "15%" }}>
                  {meta.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positions.map((positionValue, position) => {
              return (
                <tr>
                  <td>{positionValue}</td>
                  {arrayColumn(pointsSystem, position).map((points, race) => {
                    console.log(race, position, points);
                    if (points === undefined) {
                      return <td></td>;
                    }
                    return (
                      <td>
                        <button
                          onClick={() => {
                            // means max
                            onButtonClick(1, race, position);
                          }}
                          className="btn btn-outline-secondary user-select-none"
                          style={
                            raceResults[race][position] === 1
                              ? {
                                  backgroundColor: COLOR_REDBULL,
                                  color: "white",
                                  width: "60px",
                                }
                              : raceResults[race][position] === 2
                              ? {
                                  backgroundColor: COLOR_MERCEDES,
                                  color: "white",
                                  width: "60px",
                                }
                              : {
                                  width: "60px",
                                }
                          }
                          key={position}
                          onContextMenu={(e) => {
                            contextMenuHandler.onContextMenu(e, () =>
                              onButtonClick(2, race, position)
                            );
                          }}
                          onTouchStart={(e) => {
                            contextMenuHandler.onTouchStart(e, () =>
                              onButtonClick(2, race, position)
                            );
                          }}
                          onTouchCancel={contextMenuHandler.onTouchCancel}
                          onTouchEnd={contextMenuHandler.onTouchEnd}
                          onTouchMove={contextMenuHandler.onTouchMove}
                        >
                          {points}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
