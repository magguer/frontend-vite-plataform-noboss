import { format } from "date-fns";
import spentIcon from "../../../assets/images/icons/spent-icon.png";
import saleIcon from "../../../assets/images/icons/sale-icon.png";

function MovementTableBody({ movement, project }: any) {
    return (
        <div
            className={`fade-in-right flex w-full items-center justify-center bg-lightbgsecondary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-3 py-1 transition-colors duration-150`}
        >
            <div className="flex w-full justify-around items-center">
                <div className="flex items-center gap-3 text-start w-full">
                    <img
                        className="w-6 h-6 object-cover p-1  "
                        src={`${
                            (movement.type === "spent" && spentIcon) ||
                            (movement.type === "sale" && saleIcon)
                        }`}
                        alt=""
                    />
                    <h3
                        style={{
                            color: `${
                                (movement.type === "spent" && "#a20000") ||
                                (movement.type === "sale" && project.color_one)
                            } `,
                        }}
                        className="max-w-[100px] tablet:w-[150px] text-sm"
                    >
                        {movement.type === "spent" && "-"} $ {movement.amount}
                    </h3>
                </div>
                <div className="flex">
                    <h3 className="w-[80px] truncate text-center text-xs font-medium">
                        {movement.reason}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-center">
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
