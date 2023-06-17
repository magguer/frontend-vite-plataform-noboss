import { format } from "date-fns";
import spentIcon from "../../../assets/images/icons/spent-icon.png";
import saleIcon from "../../../assets/images/icons/sale-icon.png";
import editIcon from "../../../assets/images/icons/edit-icon.png";
import { Movement } from "../../../types/MovementTypes";
import { Project } from "../../../types/ProjectTypes";

function MovementTableBody({
    movement,
    project,
}: {
    movement: Movement;
    project: Project;
}) {
    return (
        <div
            className={`fade-in-left text-textlightprimary dark:text-textdarkprimary flex w-full items-center justify-center bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbgunder cursor-pointer rounded px-3 py-1 transition-colors duration-150`}
        >
            <div className="flex w-full  text-textlightterceary dark:text-textdarkterceary  justify-around items-center">
                <div className="flex items-center gap-3 text-start w-full">
                    <img
                        className="w-6 h-6 object-contain p-1 invert dark:invert-0 "
                        src={`${
                            (movement.type === "spent" && spentIcon) ||
                            (movement.type === "sale" && saleIcon)
                        }`}
                        alt=""
                    />
                    <h3
                        style={{
                            color: `${movement.type === "spent" && "#a20000"} `,
                        }}
                        className="max-w-[100px] text-textlightprimary dark:text-textdarkprimary tablet:w-[150px] text-sm"
                    >
                        {movement.type === "spent" && "-"} $ {movement.amount}
                    </h3>
                </div>
                <div className="flex w-full justify-center">
                    <h3 className="w-[80px] truncate text-xs font-medium">
                        {movement.reason}
                    </h3>
                </div>
                <div className="hidden w-full tablet:flex justify-center">
                    <h3 className="w-[100px]  text-center text-xs font-medium">
                        {movement.user.username}
                    </h3>
                </div>
                <div className="hidden w-full tablet:flex justify-center">
                    <h3 className="w-[100px]  text-center text-xs font-medium">
                        {movement.type}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-center w-full ">
                    <h3 className="w-[100px] text-xs font-medium text-end">
                        {format(new Date(movement.createdAt), "dd/MM (H:mm)")}
                    </h3>
                </div>
            </div>
            <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonhoverprimary dark:hover:bg-darkbgprimary  dark:focus:ring-darkbuttonringprimary relative p-3 z-50 rounded-lg ">
                <img
                    className="w-3 tablet:w-4 h-3 object-contain invert dark:invert-0"
                    src={editIcon}
                    alt=""
                />
            </button>
        </div>
    );
}

export default MovementTableBody;
