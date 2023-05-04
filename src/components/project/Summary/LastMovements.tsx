import { useSelector } from "react-redux";
import MovementsType from "../../../types/MovementsType";
import Spinner from "../../general-partials/Spinner";
import MovementTableBody from "../movement/MovementTableBody";
import { Movement } from "../../../types/MovementTypes";

function LastMovements() {
    const movements = useSelector((state: MovementsType) => state.movements);
    const lastMovements = movements?.slice(0, 10);
    return (
        <div className="bg-lightbgsecondary dark:bg-darkbgsecondary rounded px-3 py-4">
            <h3 className="text-sm ml-1">Últimos 10 movimientos</h3>
            <div className="mt-2 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                {movements ? (
                    lastMovements.map((movement: Movement, i: any) => {
                        return (
                            <MovementTableBody movement={movement} key={i} />
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
