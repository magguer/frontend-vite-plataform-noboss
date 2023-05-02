// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import { getList } from "../../../redux/productsReducer";
import { ProductsType } from "../../../types/ProductsType";
// Assets
import marketimage from "../../../assets/images/no_market_image.svg";
import {
    addCartProduct,
    removeCartEveryProducts,
} from "../../../redux/cartReducer";
import { Product } from "../../../types/ProductTypes";
import ProductCartTableBody from "./ProductCartTableBody";

export default function SaleModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const products = useSelector((state: ProductsType) => state.products);
    const cart = useSelector((state: any) => state.cart);
    const [search, setSearch] = useState<string>("");
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/?project=${
                    project.slug
                }&search=${search}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getList(response.data));
        };
        getProducts();
    }, [project, search]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);

        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/products`,
            data: {},
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        setSendData(false);
        dispatch(close(null));
    };

    const handleAddProduct = (product: Product) => {
        if (
            cart.some(
                (productCart: any) => productCart.product.slug === product.slug
            )
        ) {
            const productCart = cart.filter(
                (productCart: any) => productCart.product.slug === product.slug
            );
            dispatch(addCartProduct(productCart[0]));
        } else {
            dispatch(
                addCartProduct<any>({
                    product: product,
                    product_id: product.id,
                    quantity: 1,
                    fixed_price: product.price,
                })
            );
        }
    };

    return (
        <>
            <ModalLayout
                exit={() => {
                    dispatch(close(null));
                    dispatch(removeCartEveryProducts());
                }}
                s
            >
                <div className="">
                    {/*    Form Add Sale */}
                    <div className="bg-lightbgprimary h-full dark:bg-darkbgprimary rounded py-4 px-10">
                        <form
                            onSubmit={handleSubmit}
                            className="grid tablet:flex laptop:gap-3 justify-center w-full"
                        >
                            <div>
                                {/* Page 1 Add SALE */}
                                {page === 1 && (
                                    <div className="grid gap-3 w-full fade-in-right">
                                        {/*   Header Page 1 */}
                                        <div className="flex justify-center items-center gap-5">
                                            <img
                                                className="w-10 rounded-full"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/projects/logos/${
                                                    project.logo_url
                                                }`}
                                                alt=""
                                            />
                                            <div className="flex flex-col text-start">
                                                <h3 className="text-md text-textsecondary">
                                                    Registro de Venta
                                                </h3>
                                                <h3 className="text-sm tablet:text-md">
                                                    Información de productos:
                                                </h3>
                                            </div>
                                        </div>
                                        {/*  Body Page 1 */}
                                        <div className="flex gap-2 bg-lightbgsecondary dark:bg-darkbgsecondary rounded">
                                            {/*   Products   */}
                                            <div className="pl-4 py-2">
                                                {/* Searcher */}
                                                <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
                                                    <div className="text-white bg-lightbgprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                                                        <input
                                                            className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            name="search"
                                                            id="search"
                                                            placeholder="Buscar producto, categoria, subcategoria..."
                                                            value={search}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <div>
                                                            <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                                                                <img
                                                                    className="w-3 tablet:w-5"
                                                                    src="https://firebasestorage.googleapis.com/v0/b/noboss-app.appspot.com/o/nobossAppSimple%2Frecursos%2Ficonos%2Ficono%20explorador%20de%20proyectos%20blanco.png?alt=media&token=a9ae2846-f5af-4aa7-9c60-681f478c967a"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*   Form Page 1 */}
                                                <div className="flex flex-wrap justify-center items-center max-w-[500px] py-3 gap-2 max-h-[200px] laptop:max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                                    {products?.map(
                                                        (
                                                            product: any,
                                                            i: any
                                                        ) => {
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleAddProduct(
                                                                            product
                                                                        )
                                                                    }
                                                                    key={i}
                                                                >
                                                                    {product
                                                                        .images_url[0] ? (
                                                                        <img
                                                                            className="w-8 tablet:w-20 rounded object-contain"
                                                                            src={`${
                                                                                import.meta
                                                                                    .env
                                                                                    .VITE_SUPABASE_BUCKET_URL
                                                                            }/projects/products/${
                                                                                product
                                                                                    .images_url[0]
                                                                            }`}
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <Spinner />
                                                                    )}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>

                                            {/*   Cart */}
                                            <div className="  pr-10">
                                                {cart.length === 0 ? (
                                                    <div className="grid place-content-center h-full w-[26rem] py-10">
                                                        <img
                                                            className="w-60"
                                                            src={marketimage}
                                                            alt=""
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-1 w-[26rem] my-4">
                                                        <div className="flex justify-center items-center gap-3">
                                                            <h3 className="text-sm">
                                                                Productos
                                                                seleccionados
                                                            </h3>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeCartEveryProducts()
                                                                    )
                                                                }
                                                                className="bg-darkbgprimary px-2 py-1 rounded text-xs"
                                                            >
                                                                Vaciar
                                                            </button>
                                                        </div>
                                                        <div className="mt-2 flex flex-col gap-1 min-h-[200px] max-h-[270px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                                            {cart.map(
                                                                (
                                                                    productCart: any,
                                                                    i: any
                                                                ) => {
                                                                    return (
                                                                        <ProductCartTableBody
                                                                            key={
                                                                                i
                                                                            }
                                                                            productCart={
                                                                                productCart
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/*   Buttons Page 1 */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    dispatch(close(null));
                                                    dispatch(
                                                        removeCartEveryProducts()
                                                    );
                                                }}
                                                type="button"
                                                className="w-full flex justify-center items-center gap-5 text-center  bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                            >
                                                <img
                                                    className="w-3 object-contain rotate-90"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/noboss/icons/arrow-down-icon.png`}
                                                    alt="home-icon"
                                                />
                                                Salir
                                            </button>
                                            <button
                                                type="button"
                                                disabled={
                                                    cart.length === 0
                                                        ? true
                                                        : false
                                                }
                                                onClick={() => setPage(2)}
                                                className={`w-full flex items-center justify-center gap-5 bg-secondarycolor bg-opacity-30 ${
                                                    cart.length > 0
                                                        ? "hover:bg-opacity-100"
                                                        : "opacity-20"
                                                } rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                                            >
                                                Siguiente
                                                <img
                                                    className="w-3 object-contain -rotate-90"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/noboss/icons/arrow-down-icon.png`}
                                                    alt="home-icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/*          BUSSINES INFO FOR PRODUCTS */}
                                {page === 2 && (
                                    <div className="w-full grid place-content-center gap-5 mobilXL:w-[380px] fade-in-right">
                                        {/*   Header Page 1 */}
                                        <div className="flex justify-center items-center gap-5">
                                            <img
                                                className="w-10 rounded-full"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SUPABASE_BUCKET_URL
                                                }/projects/logos/${
                                                    project.logo_url
                                                }`}
                                                alt=""
                                            />
                                            <div className="flex flex-col text-start">
                                                <h3 className="text-md text-textsecondary">
                                                    Registro de Venta
                                                </h3>
                                                <h3 className="text-sm tablet:text-md">
                                                    Forma de pago y cliente:
                                                </h3>
                                            </div>
                                        </div>
                                        {/*   Form Page 2 */}
                                        <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                            Resumen
                                        </div>
                                        {/*   Buttons Page 2 */}
                                        <div className="flex gap-3 min-w-[300px]">
                                            <button
                                                type="button"
                                                onClick={() => setPage(1)}
                                                className="w-full bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary flex gap-5 items-center justify-center rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                            >
                                                <img
                                                    className="w-3 object-contain rotate-90"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/noboss/icons/arrow-down-icon.png`}
                                                    alt="home-icon"
                                                />
                                                Volver
                                            </button>
                                            <button className="w-full flex items-center justify-center text-center bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150">
                                                {sendData && (
                                                    <div>
                                                        <Spinner />
                                                    </div>
                                                )}
                                                Finalizar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
}
