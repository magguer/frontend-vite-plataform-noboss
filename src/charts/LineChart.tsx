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
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { MovementType } from "../types/MovementTypes";

/* 
const movements = useSelector((state: MovementTypes) => state.movements); */

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {},
};

const ventas = [0, 53, 34, 12, 41, 124, 43, 0, 53, 34, 12, 41];
const gastos = [0, 23, 30, 20, 67, 23, 20, 0, 23, 30, 20, 67];
const labels = [
    "En",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Ventas",
            data: ventas,
            borderColor: "#02997d",
            backgroundColor: "transparent",
        },
        {
            label: "Gastos",
            data: gastos,
            borderColor: "rgb(127 29 29)",
            backgroundColor: "transparent",
        },
    ],
};

export default function LineChart() {
    return (
        <section className="flex flex-col gap-2 w-full p-2">
            <h3 className="text-sm">Ventas/Gastos Mensuales</h3>
            <Line options={options} data={data} />
        </section>
    );
}
