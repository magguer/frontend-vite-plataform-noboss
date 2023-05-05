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
import { useSelector } from "react-redux";
import { ProjectType } from "../types/ProjectTypes";

export function BarChart() {
    const project = useSelector((state: ProjectType) => state.project);
    console.log(project);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {},
    };

    const labels = ["1 sem", "2 sem", "3 sem", "4 sem"];
    const semana1 = [30, 10, 10, 23];
    const semana2 = [20, 5, 3, 5];

    const data = {
        labels,
        datasets: [
            {
                label: "Mes Anterior",
                data: semana1,
                backgroundColor: `${project.color_one}`,
            },
            {
                label: "Mes Actual",
                data: semana2,
                backgroundColor: `${project.color_two}`,
            },
        ],
    };

    return (
        <section className="flex flex-col gap-2 w-full p-2">
            <h3 className="text-sm">Comparativa de ventas</h3>
            <Bar options={options} data={data} />
        </section>
    );
}
