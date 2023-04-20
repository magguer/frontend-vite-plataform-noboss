function TeamTableBody({ user }) {
    return (
        <div
            key={user.member._id}
            className="flex w-full items-center bg-darkbgprimary hover:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150"
        >
            <div className="mr-10">
                <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/users/avatars/${user.member.image_url}`}
                    alt=""
                />
            </div>
            <div className="flex gap-10 w-full">
                <div className="text-start w-full">
                    <h3 className="w-[150px] font-medium">
                        {user.member.username}
                    </h3>
                </div>
                <div className="text-center w-full">
                    <h3 className="w-[150px] text-center text-textterceary">
                        {user.role.name}
                    </h3>
                </div>
                <div className="text-center w-full">
                    <h3 className="w-[250px] text-center text-textterceary">
                        {user.member.email}
                    </h3>
                </div>

                <div className="text-end w-full items-center ">
                    <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
                        <img
                            className="w-4"
                            src={`${
                                import.meta.env.VITE_SUPABASE_BUCKET_URL
                            }/noboss/icons/edit-icon.png`}
                            alt=""
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TeamTableBody;
