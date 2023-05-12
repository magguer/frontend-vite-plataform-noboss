import { UserType } from "../../../types/UserTypes";
import editIcon from "../../../assets/images/icons/edit-icon.png";

function TeamTableBody({ user }: UserType) {
    const { member }: any = user;

    return (
        <>
            <li
                key={member._id}
                className="fade-in-left flex w-full items-center bg-lightbgprimary hover:bg-lightbgunder  dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 dark:text-textdarkprimary text-textlightprimary"
            >
                <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
                    <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/users/avatars/${member.image_url}`}
                        alt=""
                    />
                    <div className="text-star">
                        <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[100px] text-sm truncate">
                            {member.username}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center w-full justify-around">
                    <div>
                        <h3 className="w-[100px] tablet:w-[100px] text-xs text-center text-textterceary truncate">
                            {user.role.name}
                        </h3>
                    </div>
                    <div className="hidden mobilXL:block ">
                        <h3 className="w-[130px] laptop:w-[200px] text-xs text-center text-textterceary truncate">
                            {member.email}
                        </h3>
                    </div>
                </div>
                <div className="text-end w-[100px]">
                    <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
                        <img
                            className="w-3 object-contain invert dark:invert-0"
                            src={editIcon}
                            alt=""
                        />
                    </button>
                </div>
            </li>
        </>
    );
}

export default TeamTableBody;
