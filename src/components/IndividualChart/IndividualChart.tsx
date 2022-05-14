import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Constructor, Driver, Race } from "../../types";
import { getTeamColor } from "../../utils/helperFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDriverData {
  driver: Driver;
  team: Constructor;
  results: number[];
}

interface IResultsMap {
  [key: string]: {
    [key: string]: { driver: Driver; team: Constructor; points: number };
  };
}

function getDriverDataSet(races: Race[]) {
  const data: ChartDriverData[] = [];
  const resultMap: IResultsMap = {};

  races.forEach((race) => {
    const results = race.Results ?? race.SprintResults;
    results.forEach((result) => {
      if (resultMap[result.Driver.driverId]) {
        resultMap[result.Driver.driverId][race.raceName] = {
          driver: result.Driver,
          team: result.Constructor,
          points: Number(result.points),
        };
      } else {
        resultMap[result.Driver.driverId] = {
          [race.raceName]: {
            driver: result.Driver,
            team: result.Constructor,
            points: Number(result.points),
          },
        };
      }
    });
  });
  races.forEach((race, raceIndex) => {
    if (raceIndex === 0) {
      Object.keys(resultMap).forEach((driver) => {
        const driverObj = resultMap[driver];
        data.push({
          driver: driverObj[Object.keys(driverObj)[0]].driver,
          team: driverObj[Object.keys(driverObj)[0]].team,
          results: [driverObj[race.raceName]?.points ?? 0],
        });
      });
    } else {
      data.forEach((driver) => {
        const driverObj = resultMap[driver.driver.driverId][race.raceName];
        const lastRaceResults = driver.results[raceIndex - 1] ?? 0;
        driver.results.push(lastRaceResults + (driverObj?.points ?? 0));
      });
    }
  });
  return data;
}

function IndividualChart({ races }: { races: Race[] }) {
  const driverData = getDriverDataSet(races);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: "Driver's Championship Results",
      },
    },
  };
  const labels = races.map((race) => race.raceName);
  const data = {
    labels,
    datasets: driverData.map((driver) => ({
      label: driver.driver.code,
      data: driver.results,
      borderColor: getTeamColor(driver.team.constructorId),
    })),
  };
  return <Line options={options} data={data} />;
}

export default IndividualChart;
