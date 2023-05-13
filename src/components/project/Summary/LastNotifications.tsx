import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../general-partials/Spinner";
import { ProductsType } from "../../../types/ProductsType";
import { Product } from "../../../types/ProductTypes";
import InventoryTableBody from "../Inventory/InventoryTableBody";
import { item } from "../../../redux/itemProfileReducer";

function LastNotifications() {
    const dispatch = useDispatch();
    const products = useSelector((state: ProductsType) => state.products);
    const bestProducts = products?.slice(0, 5);
    return (
        <div className="bg-lightbgprimary dark:bg-darkbgsecondary rounded w-full px-3 py-4 dark:text-textdarkprimary text-textlightprimary">
            <h3 className="text-sm ml-1">Los 5 productos más vendidos</h3>
            <div className="mt-3 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                {products ? (
                    bestProducts.map((product: any, i: any) => {
                        return (
                            <li className="fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40">
                                <button
                                    onClick={() => dispatch(item(product))}
                                    className="flex w-full items-center pr-1"
                                >
                                    <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
                                        {product.images_url[0] ? (
                                            <img
                                                className="w-8 tablet:w-10 rounded"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/projects/products/${
                                                    product.images_url[0]
                                                }`}
                                                alt=""
                                            />
                                        ) : (
                                            <Spinner />
                                        )}
                                        <div className="text-start">
                                            <h3 className="w-[80px] mobilL:w-[150px] mobilXL:w-[250px] text-textlightprimary dark:text-textdarkprimary truncate">
                                                {product.model}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center w-full justify-end tablet:justify-around">
                                        <div>
                                            <h3 className="w-[50px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                                $ {product.price}
                                            </h3>
                                        </div>

                                        <div>
                                            <h3 className="w-[30px] mobilXL:w-[50px] text-xs text-center text-textlightterceary dark:text-textdarkterceary truncate">
                                                {product.stock} u
                                            </h3>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        );
                    })
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default LastNotifications;
