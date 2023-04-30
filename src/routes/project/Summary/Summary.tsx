// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
// Types
import ProjectTypes from "../../../types/ProjectTypes";
import UserTypes from "../../../types/UserTypes";
// Components
import MovementTableBody from "../../../components/project/Movement/MovementTableBody";
import { getMovementsList } from "../../../redux/movementsReducer";
import MovementTypes from "../../../types/MovementTypes";
import Spinner from "../../../components/general-partials/Spinner";

function Summary() {
    const dispatch = useDispatch();
    const project = useSelector((state: ProjectTypes) => state.project);
    const user = useSelector((state: UserTypes) => state.user);
    const movements = useSelector((state: MovementTypes) => state.movements);
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
        <>
            <div className="w-full fade-in-left px-3">
                <div className="w-full flex justify-end">
                    <div className="flex gap-3 text-xs tablet:text-sm">
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

                <div className="mt-2">
                    <h3 className="text-sm">Últimos 10 movimientos</h3>
                    <div className="mt-2 grid gap-1">
                        {movements ? (
                            movements.map((movement: MovementTypes) => {
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
        </>
    );
}

export default Summary;
