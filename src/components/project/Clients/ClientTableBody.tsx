import { Link } from "react-router-dom";

function ClientTableBody({ client }: any) {
    return (
        <div className="fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40">
            <button className="flex w-full items-center pr-1">
                <div className="flex items-center gap-5 text-start w-full">
                    <img
                        className="w-8 h-8 object-cover p-1 bg-lightbgsecondary dark:bg-darkbgsecondary rounded-full"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/user-icon.png`}
                        alt=""
                    />
                    <h3 className="w-[150px] truncate text-xs tablet:text-sm font-medium">
                        {client.name}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-center w-full">
                    <h3 className="w-[150px] text-textterceary text-xs font-medium">
                        {client.type}
                    </h3>
                </div>
                <div className="hidden laptop:flex justify-center w-full">
                    <h3 className="w-[150px] text-textterceary text-center text-xs font-medium">
                        {client.email}
                    </h3>
                </div>
                <div className="hidden mobilXL:flex justify-center tablet:w-full">
                    <h3 className="w-[150px] text-textterceary text-center text-xs font-medium">
                        Orders: {client.orders?.length}
                    </h3>
                </div>
            </button>
            {/* Edit Button */}
            <Link
                to={`/`}
                className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary relative px-3 py-2 z-50 rounded-lg "
            >
                <img
                    className="w-3 tablet:w-4 object-contain"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/noboss/icons/edit-icon.png`}
                    alt=""
                />
            </Link>
        </div>
    );
}

export default ClientTableBody;
