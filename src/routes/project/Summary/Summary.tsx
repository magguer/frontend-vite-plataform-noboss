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

function Summary() {
    const dispatch = useDispatch();
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const movements = useSelector((state: MovementsType) => state.movements);
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

    const lastMovements = movements?.slice(0, 10);

    return (
        <div className="fade-in-left max-h-[58vh] tablet:max-h-[50vh] laptop:max-h-[60vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-1 tablet:pr-3">
            <div className="w-full grid laptop:flex">
                <div className="grid place-content-center gap-4 py-3 laptop:mt-0 w-full">
                    <div className="w-[250px] h-[150px] mobilXL:w-[300px] mobilXL:h-[150px] flex justify-center tablet:w-[400px] tablet:h-[180px] rounded m-auto bg-lightbgsecondary dark:bg-darkbgsecondary p-2">
                        <BarChart />
                    </div>
                    <div className="w-[250px] mobilXL:w-[300px] mobilXL:h-[150px] flex justify-center tablet:w-[400px] tablet:h-[180px] rounded m-auto bg-lightbgsecondary dark:bg-darkbgsecondary p-2">
                        <LineChart />
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex justify-center tablet:justify-end ">
                        <div className="flex gap-3 text-xs tablet:text-sm">
                            <div className="py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded">
                                <h3>Clientes: {project.clients.length}</h3>
                            </div>
                            <div className="py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded">
                                <h3>Ingresos: $ {income}</h3>
                            </div>
                            <div className="hidden tablet:flex py-2 px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded">
                                <h3>Gastos: $ {project.spent_money}</h3>
                            </div>
                            <div
                                className={`py-2 px-3 flex items-center gap-2 bg-lightbgprimary dark:bg-darkbgprimary rounded `}
                            >
                                <h3>Total:</h3>
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
                    <div className="mt-2 px-3 py-4 bg-lightbgsecondary dark:bg-darkbgsecondary rounded">
                        <h3 className="text-sm ml-1">Últimos 10 movimientos</h3>
                        <div className="mt-2 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                            {movements ? (
                                lastMovements.map((movement: Movement) => {
                                    return (
                                        <MovementTableBody
                                            movement={movement}
                                            key={movement.id}
                                        />
                                    );
                                })
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;
