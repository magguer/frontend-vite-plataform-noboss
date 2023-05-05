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

const labels = ["1 sem", "2 sem", "3 sem", "4 sem"];
const semana1 = [0, 0, 0, 0];
const semana2 = [0, 0, 0, 0];

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
    return (
        <section className="flex flex-col gap-2 w-full p-2">
            <h3 className="text-sm">Comparativa de ventas</h3>
            <Bar options={options} data={data} />
        </section>
    );
}
