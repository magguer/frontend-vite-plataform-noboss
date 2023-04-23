function InventoryTableBody({ product }) {
    return (
        <li
            key={product.id}
            className="flex w-full items-center bg-darkbgprimary hover:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150"
        >
            <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
                <img
                    className="w-10 rounded"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/projects/products/${product.images_url}`}
                    alt=""
                />
                <div className="text-star">
                    <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[250px] text-sm truncate">
                        {product.name}
                    </h3>
                </div>
            </div>
            <div className="flex items-center w-full justify-end tablet:justify-around">
                <div>
                    <h3 className="w-[50px] mobilXL:w-[50px] text-sm text-center text-textterceary truncate">
                        $ {product.price}
                    </h3>
                </div>
                <div className="hidden mobilXL:block ">
                    <h3 className="w-[50px] mobilXL:w-[50px] text-sm text-center text-textterceary truncate">
                        $ {product.cost}
                    </h3>
                </div>
                <div>
                    <h3 className="w-[30px] mobilXL:w-[50px] text-sm text-center text-textterceary truncate">
                        {product.stock} u
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
    );
}

export default InventoryTableBody;
