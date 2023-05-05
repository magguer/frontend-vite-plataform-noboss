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
        <div className="fade-in-left max-h-[58vh] tablet:max-h-[50vh] laptop:max-h-[60vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded px-2 tablet:px-4 py-2 tablet:py-4">
            <div className="w-full flex">
                <div className="hidden laptop:flex items-center flex-col gap-4 w-full">
                    <div className="w-[250px] h-[150px] mobilXL:w-[300px]  tablet:w-[400px] tablet:h-[235px] rounded flex justify-center bg-lightbgsecondary dark:bg-darkbgsecondary p-2">
                        <BarChart />
                    </div>
                    <div className="w-[250px] mobilXL:w-[300px] mobilXL:h-[150px] tablet:w-[400px] tablet:h-[235px] rounded flex justify-center bg-lightbgsecondary dark:bg-darkbgsecondary p-2">
                        <LineChart />
                    </div>
                </div>
                <div className="w-full mt-3 tablet:mt-0">
                    <div className="w-full flex justify-center tablet:justify-end">
                        <div className="flex gap-3 text-[10px] tablet:text-xs">
                            <Link
                                to={"/clientes"}
                                className="hidden tablet:flex py-2 items-center gap-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded"
                            >
                                <img
                                    className="w-6 laptop:w-3 object-contain"
                                    src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                    }/noboss/icons/clients-icon.png`}
                                    alt=""
                                />
                                <h3>{project.clients.length}</h3>
                            </Link>
                            {project.products_on && (
                                <Link
                                    to={"/inventario"}
                                    className="hidden tablet:flex items-center gap-2 py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded"
                                >
                                    <img
                                        className="w-6 laptop:w-3 object-contain"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/nobox-icon.png`}
                                        alt=""
                                    />
                                    <h3>{project.products.length}</h3>
                                </Link>
                            )}
                            <div
                                className={`py-2 px-3 flex items-center gap-2 bg-lightbgprimary dark:bg-darkbgprimary rounded `}
                            >
                                <h3>Ganancia:</h3>
                                <span
                                    className={`${
                                        total < 0
                                            ? "text-red-900"
                                            : "text-textsecondary"
                                    }`}
                                >
                                    $ {total}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-4">
                        {/*  <LastNotifications /> */}
                        <LastMovements />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;
