import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {},
};

const labels = ["1-7", "8-15", "16-23", "24-32"];
const semana1 = [600, 1500, 200, 350];
const semana2 = [300, 1000, 200, 100];

export const data = {
    labels,
    datasets: [
        {
            label: "Mes Anterior",
            data: semana1,
            backgroundColor: "#bababa",
        },
        {
            label: "Mes Actual",
            data: semana2,
            backgroundColor: "#02997d",
        },
    ],
};

export function BarChart() {
    return <Bar options={options} data={data} />;
}
