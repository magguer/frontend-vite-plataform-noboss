import {
    addCartProduct,
    removeCartAllThisProducts,
    removeCartProduct,
} from "../../../redux/cartReducer";
import { useDispatch } from "react-redux";

function ProductCartTableBody({ productCart }: any) {
    const dispatch = useDispatch();

    return (
        <div className="fade-in-left w-full flex items-center justify-between gap-3 bg-lightbgprimary dark:bg-darkbgprimary border-b border-[#a8a8a810] px-2 tablet:px-3 py-3">
            <div className="flex gap-3 items-center">
                <img
                    className="w-8 tablet:w-10 h-8 tablet:h-10 rounded-sm object-contain"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/projects/products/${productCart.product.images_url[0]}`}
                    alt=""
                />
                <h3 className="font-light text-start text-xs w-[80px] tablet:w-[170px] truncate">
                    {productCart.product.model}
                </h3>
            </div>
            <div className="flex items-center gap-1 tablet:gap-2 ">
                <button
                    type="button"
                    onClick={() => dispatch(removeCartProduct(productCart))}
                    className="rounded-full py-0.5 px-2 bg-lightbgsecondary
                    dark:bg-darkbgsecondary"
                >
                    -
                </button>
                <h3
                    /*  onChange={() => ds} */
                    className="bg-lightbgsecondary dark:bg-darkbgprimary text-center rounded font-light text-xs tablet:text-sm w-[30px]"
                >
                    {productCart.quantity}
                </h3>

                <button
                    type="button"
                    onClick={() => dispatch(addCartProduct(productCart))}
                    className="rounded-full py-0.5 px-2 bg-lightbgsecondary
                     dark:bg-darkbgsecondary"
                >
                    +
                </button>
                <button
                    type="button"
                    className="hidden tablet:block text-xs px-2 py-1 bg-lightbgprimary
                    dark:bg-darkbgsecondary rounded"
                    onClick={() =>
                        dispatch(removeCartAllThisProducts(productCart))
                    }
                >
                    Quitar
                </button>
            </div>
        </div>
    );
}

export default ProductCartTableBody;
