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
import MovementTypes from "../types/MovementTypes";

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

const beneficios = [0, 53, 34, 12, 41, 124, 43];
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
    labels,
    datasets: [
        {
            label: "Ventas",
            data: beneficios,
            borderColor: "#02997d",
            backgroundColor: "transparent",
        },
    ],
};

export default function LineChart() {
    return <Line options={options} data={data} />;
}
