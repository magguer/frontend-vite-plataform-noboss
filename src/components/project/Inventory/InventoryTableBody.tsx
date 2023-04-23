function InventoryTableBody({ product }) {
    return (
        <div
            key={product.id}
            className="flex w-full items-center bg-darkbgprimary hover:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150"
        >
            <div className="mr-10">
                <img
                    className="w-10 rounded"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/projects/products/${product.images_url}`}
                    alt=""
                />
            </div>
            <div className="flex items-center w-full">
                <div className="text-star">
                    <h3 className="w-[250px] text-sm truncate">
                        {product.name}
                    </h3>
                </div>
                <div className="text-center">
                    <h3 className="w-[150px] text-sm text-center text-textterceary">
                        $ {product.price}
                    </h3>
                </div>
                <div className="hidden tablet:block text-center">
                    <h3 className="w-[150px] text-sm text-center text-textterceary">
                        $ {product.cost}
                    </h3>
                </div>
                <div className="text-center">
                    <h3 className="w-[150px] text-sm text-center text-textterceary">
                        {product.stock} u
                    </h3>
                </div>

                <div className="text-end w-full items-center ">
                    <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary px-3 py-2 rounded-lg">
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

export default InventoryTableBody;
