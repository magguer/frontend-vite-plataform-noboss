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
import MovementsType from "../types/MovementsType";
import { ProjectType } from "../types/ProjectTypes";

export default function LineChart() {
    const movements = useSelector((state: MovementsType) => state.movements);
    const project = useSelector((state: ProjectType) => state.project);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
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

    const data = {
        labels,
        datasets: [
            {
                label: "Ventas",
                data: ventas,
                borderColor: `${project.color_one}`,
                backgroundColor: "transparent",
            },
            {
                label: "Gastos",
                data: gastos,
                borderColor: `${project.color_two}`,
                backgroundColor: "transparent",
            },
        ],
    };

    return (
        <section className="flex flex-col gap-2 w-full p-2">
            <h3 className="text-sm">Ventas/Gastos Mensuales</h3>
            <Line options={options} data={data} />
        </section>
    );
}
