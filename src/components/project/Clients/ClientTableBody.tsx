function ClientTableBody({ client }: any) {
    return (
        <div className="flex w-full items-center bg-darkbgprimary hover:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150">
            <div className="flex gap-10 w-full items-center">
                <div className="ml-5 text-start w-full">
                    <h3 className="w-[150px] text-sm font-medium">
                        {client.name}
                    </h3>
                </div>
                <div className="text-start w-full">
                    <h3 className="w-[150px] text-sm font-medium">
                        {client.email}
                    </h3>
                </div>
                {/* Edit Button */}
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

export default ClientTableBody;
