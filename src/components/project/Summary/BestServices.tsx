//Dependecies
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Redux
import { item } from "../../../redux/itemProfileReducer";
//Types
import { ProductsType } from "../../../types/ProductsType";
//Components
import Spinner from "../../general-partials/Spinner";
//Assets
import servicesIcon from "../../../assets/images/icons/services-icon.png";

function BestServices() {
    const dispatch = useDispatch();
    const products = useSelector((state: ProductsType) => state.products);
    const bestProducts = products?.slice(0, 5);
    return (
        <div className="bg-lightbgprimary dark:bg-darkbgsecondary rounded w-full px-3 py-4 dark:text-textdarkprimary text-textlightprimary">
            <div className="flex items-center justify-between mx-1">
                <h3 className="text-sm">Servicios más solicitados</h3>
                <Link
                    to={"/servicios"}
                    className="bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgunder px-2 py-1 rounded duration-100 transition-colors"
                >
                    <img
                        className="w-5 invert dark:invert-0"
                        src={servicesIcon}
                        alt=""
                    />
                </Link>
            </div>

            <div className="mt-3 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                {products ? (
                    bestProducts.map((product: any, i: any) => {
                        return (
                            <li className="fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40">
                                <button
                                    onClick={() => dispatch(item(product))}
                                    className="flex w-full items-center pr-1"
                                >
                                    <div className="flex w-[100px] tablet:w-[250px] items-center gap-3 tablet:gap-5">
                                        {product.images_url[0] ? (
                                            <img
                                                className="w-8 rounded"
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

export default BestServices;
