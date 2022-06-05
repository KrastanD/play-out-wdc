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

import "./Chart.styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
  }[];
}

type ChartProps = {
  data: ChartData;
  title: string;
};

function Chart({ data, title }: ChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return (
    <div className="Chart">
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;
