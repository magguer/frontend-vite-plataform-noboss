function TeamTableBody({ user }) {
    return (
        <>
            <li
                key={user.member._id}
                className="flex w-full items-center bg-darkbgprimary hover:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150"
            >
                <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
                    <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/users/avatars/${user.member.image_url}`}
                        alt=""
                    />
                    <div className="text-star">
                        <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[100px] text-sm truncate">
                            {user.member.username}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center w-full justify-around">
                    <div>
                        <h3 className="w-[100px] tablet:w-[100px] text-sm text-center text-textterceary truncate">
                            {user.role.name}
                        </h3>
                    </div>
                    <div className="hidden mobilXL:block ">
                        <h3 className="w-[130px] laptop:w-[200px] text-sm text-center text-textterceary truncate">
                            {user.member.email}
                        </h3>
                    </div>
                </div>
                <div className="text-end w-[100px]">
                    <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
                        <img
                            className="w-3 object-contain"
                            src={`${
                                import.meta.env.VITE_SUPABASE_BUCKET_URL
                            }/noboss/icons/edit-icon.png`}
                            alt=""
                        />
                    </button>
                </div>
            </li>
        </>
    );
}

export default TeamTableBody;
