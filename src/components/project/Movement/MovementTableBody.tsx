import { format } from "date-fns";
function MovementTableBody({ movement }: any) {
    return (
        <div
            className={`fade-in-right flex w-full items-center justify-center bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-3 py-1 transition-colors duration-150`}
        >
            <div className="flex w-full justify-around items-center">
                <div className="flex items-center gap-3 tablet:gap-5 text-start w-full">
                    <img
                        className="w-6 h-6 object-cover p-1  "
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/gasto-icon.png`}
                        alt=""
                    />
                    <h3
                        className={`${
                            movement.type === "spent" && "text-red-900"
                        } max-w-[100px] tablet:w-[150px] text-sm  `}
                    >
                        {movement.type === "spent" && "-"} $ {movement.amount}
                    </h3>
                </div>
                <div className="w-full flex">
                    <h3 className="w-[80px] tablet:w-[150px] truncate text-center text-xs font-medium">
                        {movement.reason}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-center w-full">
                    <h3 className="w-[100px] text-center text-xs font-medium">
                        {movement.user.username}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-end w-full ">
                    <h3 className="w-[100px] text-xs font-medium text-end">
                        {format(new Date(movement.createdAt), "dd/MM (H:mm)")}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default MovementTableBody;
