//Dependecies
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//Redux
import { item } from "../../../redux/itemProfileReducer";
//Types
import { ProductsType } from "../../../types/ProductsType";
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
//Components
import Spinner from "../../general-partials/Spinner";
//Assets
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";

function BestProducts() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<object[]>();
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const bestProducts = products?.slice(0, 5);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/?project=${
                    project.slug
                }`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProducts(response.data);
        };
        getProducts();
    }, [project]);

    return (
        <div className="bg-lightbgprimary dark:bg-darkbgsecondary rounded w-full px-3 py-4 dark:text-textdarkprimary text-textlightprimary">
            <div className="flex items-center justify-between mx-1">
                <h3 className="text-sm">Productos más vendidos</h3>
                <Link
                    to={"/inventario"}
                    className="bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgunder px-2 py-1 rounded duration-100 transition-colors"
                >
                    <img
                        className="w-5 invert dark:invert-0"
                        src={noboxIcon}
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
                                                className="w-8 h-8 object-contain rounded"
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

export default BestProducts;
