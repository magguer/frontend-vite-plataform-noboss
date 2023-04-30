function ClientTableBody({ client }: any) {
    return (
        <div className="flex w-full items-center bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150">
            <div className="flex gap-10 w-full items-center">
                <div className="flex items-center gap-5 text-start w-full">
                    <img
                        className="w-8 h-8 object-cover p-1 bg-lightbgsecondary dark:bg-darkbgsecondary rounded-full"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/user-icon.png`}
                        alt=""
                    />
                    <h3 className="w-[150px] text-sm font-medium">
                        {client.name}
                    </h3>
                </div>
                <div className="hidden tablet:flex justify-end w-full">
                    <h3 className="w-[150px] text-textterceary text-xs font-medium">
                        {client.type}
                    </h3>
                </div>
                <div className="hidden laptop:flex justify-center w-full">
                    <h3 className="w-[150px] text-textterceary text-center text-xs font-medium">
                        {client.email}
                    </h3>
                </div>
                <div className="hidden mobilXL:flex justify-end tablet:w-full">
                    <h3 className="w-[150px] text-textterceary text-center text-xs font-medium">
                        Orders: {client.orders.length}
                    </h3>
                </div>

                {/* Edit Button */}
                <div className="text-end w-full items-center">
                    <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
                        <img
                            className="w-4 h-4 object-contain"
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

export default ClientTableBody;
