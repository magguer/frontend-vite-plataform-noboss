// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
// Types
import { ProjectType } from "../../../types/ProjectTypes";
import { UserType } from "../../../types/UserTypes";
import { Movement } from "../../../types/MovementTypes";
import MovementsType from "../../../types/MovementsType";
// Components
import MovementTableBody from "../../../components/project/Movement/MovementTableBody";
import { getMovementsList } from "../../../redux/movementsReducer";
import Spinner from "../../../components/general-partials/Spinner";
//Charts
import LineChart from "../../../charts/LineChart";
import { BarChart } from "../../../charts/BarChart";
import { Link } from "react-router-dom";
import LastMovements from "../../../components/project/Summary/LastMovements";
import LastNotifications from "../../../components/project/Summary/LastNotifications";
//Assets
import clientsIcon from "../../../assets/images/icons/clients-icon.png";
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";
import servicesIcon from "../../../assets/images/icons/services-icon.png";

function Summary() {
    const dispatch = useDispatch();
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);

    const [income, setIncome] = useState<number>(
        project.invested_money + project.sales_money
    );
    const [total, setTotal] = useState<number>(income - project.spent_money);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/movement/?project=${
                    project.slug
                }`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getMovementsList(response.data));
        };
        getProducts();
        setIncome(project.invested_money + project.sales_money);
        setTotal(income - project.spent_money);
    }, [project]);

    return (
        <div className="fade-in-left h-[calc(100vh-195px)] tablet:h-[calc(100vh-230px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded px-1 tablet:px-4 py-2 tablet:py-4">
            <div className="w-full grid laptop:flex gap-4">
                <div className="w-full mt-3 tablet:mt-0">
                    <div className="w-full flex justify-center tablet:justify-end">
                        <div className="flex gap-3 text-[10px] tablet:text-xs">
                            <Link
                                to={"/clientes"}
                                className="py-2 flex items-center gap-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded dark:text-textdarkprimary text-textlightprimary"
                            >
                                <img
                                    className="w-3 object-contain invert dark:invert-0"
                                    src={clientsIcon}
                                    alt=""
                                />
                                <h3>{project.clients.length}</h3>
                            </Link>
                            {project.products_on && (
                                <Link
                                    to={"/inventario"}
                                    className="flex items-center gap-2 py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary dark:text-textdarkprimary text-textlightprimary rounded"
                                >
                                    <img
                                        className="w-3 object-contain invert dark:invert-0"
                                        src={noboxIcon}
                                        alt=""
                                    />
                                    <h3>{project.products.length}</h3>
                                </Link>
                            )}
                            {project.services_on && (
                                <Link
                                    to={"/servicios"}
                                    className="flex items-center gap-2 py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary dark:text-textdarkprimary text-textlightprimary rounded"
                                >
                                    <img
                                        className="w-5 object-contain invert dark:invert-0"
                                        src={servicesIcon}
                                        alt=""
                                    />
                                    <h3>{project.services.length}</h3>
                                </Link>
                            )}
                            <div
                                className={`py-2 px-3 flex items-center gap-2 bg-lightbgprimary dark:bg-darkbgprimary rounded dark:text-textdarkprimary text-textlightprimary`}
                            >
                                <h3>Ganancia:</h3>
                                <span
                                    style={{
                                        color: `${
                                            total < 0
                                                ? "#a20000"
                                                : `${project.color_one}`
                                        }`,
                                    }}
                                >
                                    $ {total}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 w-full flex flex-col gap-4">
                        <LastNotifications />
                        <div className="rounded w-full flex justify-center bg-lightbgprimary dark:bg-darkbgsecondary p-2 mobilXL:p-5">
                            <LineChart />
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-col gap-4 w-full">
                    <div className="rounded w-full flex justify-center bg-lightbgprimary dark:bg-darkbgsecondary p-2 mobilXL:p-5">
                        <BarChart />
                    </div>
                    <LastMovements project={project} />
                </div>
            </div>
        </div>
    );
}

export default Summary;
