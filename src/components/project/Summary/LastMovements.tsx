//Dependencies
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Types
import MovementsType from "../../../types/MovementsType";
import { Movement } from "../../../types/MovementTypes";
//Components
import Spinner from "../../general-partials/Spinner";
import LastMovementTableBody from "../Movement/LastMovementTableBody";
//Assets
import movementsIcon from "../../../assets/images/icons/movements-icon.png";

function LastMovements({ project }) {
    const movements = useSelector((state: MovementsType) => state.movements);
    const lastMovements = movements?.slice(0, 10);
    return (
        <div className="bg-lightbgprimary w-full dark:bg-darkbgsecondary dark:text-textdarkprimary text-textlightprimary rounded px-3 py-4">
            <div className="flex items-center justify-between mx-1">
                <h3 className="text-sm">Últimos movimientos</h3>
                <Link
                    to={"/movimientos"}
                    className="bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgunder px-2 py-1 rounded duration-100 transition-colors"
                >
                    <img
                        className="w-6 dark:invert"
                        src={movementsIcon}
                        alt=""
                    />
                </Link>
            </div>
            <div className="mt-2 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[37vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-1">
                {movements ? (
                    lastMovements?.map((movement: Movement, i: any) => {
                        return (
                            <LastMovementTableBody
                                project={project}
                                movement={movement}
                                key={i}
                            />
                        );
                    })
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default LastMovements;
