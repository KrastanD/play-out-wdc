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

function getDriverDataSet(races: Race[]) {
  const data: ChartDriverData[] = [];
  races.forEach((race, index) => {
    race.Results.forEach((result) => {
      if (index === 0) {
        const driverObject: ChartDriverData = {
          driver: result.Driver,
          team: result.Constructor,
          results: [Number(result.points)],
        };
        data.push(driverObject);
      } else {
        const driverObject = data.find(
          (driver) => driver.driver.driverId === result.Driver.driverId
        );
        if (driverObject) {
          const lastResult =
            driverObject.results[driverObject.results.length - 1];
          driverObject.results.push(lastResult + Number(result.points));
        }
      }
    });
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
