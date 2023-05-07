import Spinner from "../../general-partials/Spinner";

function LastNotifications() {
    return (
        <div className="bg-lightbgsecondary dark:bg-darkbgsecondary rounded w-full px-3 py-4">
            <h3 className="text-sm ml-1">Notificaciones</h3>
            <div className="mt-2 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                {/*   {movements ? (
                    lastMovements.map((movement: Movement, i: any) => {
                        return (
                            <MovementTableBody movement={movement} key={i} />
                        );
                    })
                ) : (
                    <Spinner />
                )} */}
            </div>
        </div>
    );
}

export default LastNotifications;
