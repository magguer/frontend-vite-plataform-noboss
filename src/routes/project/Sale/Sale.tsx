// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
import { Product } from "../../../types/ProductTypes";
import { ClientsType } from "../../../types/ClientsType";
// Components
import Spinner from "../../../components/general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
import ProductCartTableBody from "../../../components/project/Sale/ProductCartTableBody";
//Redux
import { close, open } from "../../../redux/modalsReducer";
import { getProductsList } from "../../../redux/productsReducer";
import { ProductsType } from "../../../types/ProductsType";
// Assets
import marketimage from "../../../assets/images/no_market_image.svg";
import {
    addCartProduct,
    removeCartEveryProducts,
} from "../../../redux/cartReducer";
import { getClientsList } from "../../../redux/clientsReducer";
import { Client } from "../../../types/ClientTypes";
import { useNavigate } from "react-router-dom";

function Sale() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const products = useSelector((state: ProductsType) => state.products);
    const clients = useSelector((state: ClientsType) => state.clients);
    const cart = useSelector((state: any) => state.cart);
    const [client, setClient] = useState<Client>();
    const [payMethod, setPayMethod] = useState<string>();
    const [searchProduct, setSearchProduct] = useState<string>("");
    const [searchClient, setSearchClient] = useState<string>("");
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/?project=${
                    project.slug
                }&search=${searchProduct}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getProductsList(response.data));
        };
        getProducts();
    }, [project, searchProduct]);

    useEffect(() => {
        const getClients = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/clients/?project=${
                    project.slug
                }&search=${searchClient}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getClientsList(response.data));
        };
        getClients();
    }, [project, searchClient]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/movement`,
            data: {
                amount: subTotalPrice(cart),
                type: "sale",
                reason: "Venta",
                project: project.id,
                client: client?.id,
            },
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setSendData(false);
        dispatch(removeCartEveryProducts());
        navigate("/resumen");
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

    function subTotalPrice(cart: any) {
        const prices = cart.map(
            (productCart: any) =>
                productCart.product.price * productCart.quantity
        );
        let totalPrice = 0;
        for (let price of prices) {
            totalPrice += price;
        }
        return totalPrice;
    }

    return (
        <div>
            {/*    Form Add Sale */}
            <div className="h-full rounded">
                <form
                    onSubmit={handleSubmit}
                    className="grid tablet:flex laptop:gap-3 justify-center w-full"
                >
                    <div className="px-2 tablet:px-5 max-h-[58vh] tablet:max-h-[52vh] laptop:max-h-[63vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                        <div className="grid gap-3 w-full fade-in-right">
                            {/*  Body Page 1 */}
                            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-0 tablet:gap-4 rounded">
                                {/*   Products   */}
                                {page === 1 && (
                                    <div>
                                        {/* Searcher */}
                                        <div className="flex justify-center gap-1 mobilXL:gap-2 items-center">
                                            <div className="text-white bg-lightbgprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                                                <input
                                                    className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="text"
                                                    name="search"
                                                    id="search"
                                                    placeholder="Buscar producto, categoria, subcategoria..."
                                                    value={searchProduct}
                                                    onChange={(e) =>
                                                        setSearchProduct(
                                                            e.target.value
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
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(open("addItem"))
                                                }
                                                className="text-textterceary bg-lightbuttonhoverprimary  hover:bg-lightbuttonsecondary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {/*   Form Page 1 */}
                                        <div className="flex flex-wrap justify-center m-auto items-center max-w-[300px] mobilXL:max-w-[500px] mt-1 gap-2 max-h-[135px] laptop:max-h-[305px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                            {products?.map(
                                                (product: any, i: any) => {
                                                    return (
                                                        <button
                                                            type="button"
                                                            className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-2"
                                                            onClick={() =>
                                                                handleAddProduct(
                                                                    product
                                                                )
                                                            }
                                                            key={i}
                                                        >
                                                            {product
                                                                .images_url[0] ? (
                                                                <>
                                                                    <img
                                                                        className="w-8 tablet:w-16 rounded-sm object-contain"
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
                                                                    <h3 className="text-xs mt-1">
                                                                        ${" "}
                                                                        {
                                                                            product.price
                                                                        }
                                                                    </h3>
                                                                </>
                                                            ) : (
                                                                <Spinner />
                                                            )}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/*   Clients   */}
                                {page === 2 && (
                                    <div>
                                        <div className="flex w-full justify-center gap-1 mobilXL:gap-2 items-center">
                                            <div className="text-white bg-lightbgprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                                                <input
                                                    className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="text"
                                                    name="search"
                                                    id="search"
                                                    placeholder="Buscar cliente, nombre, teléfono..."
                                                    value={searchClient}
                                                    onChange={(e) =>
                                                        setSearchClient(
                                                            e.target.value
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
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(open("addClient"))
                                                }
                                                className="text-textterceary bg-lightbuttonhoverprimary  hover:bg-lightbuttonsecondary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {/*   Form Page 1 */}
                                        <div className="flex flex-wrap justify-center m-auto items-center max-w-[300px] mobilXL:max-w-[500px] mt-1 gap-2 max-h-[135px] laptop:max-h-[305px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                            {clients?.map(
                                                (client: any, i: any) => {
                                                    return (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setClient(
                                                                    client
                                                                )
                                                            }
                                                            className="fade-in-left w-full flex items-center text-xs tablet:text-sm bg-lightbgprimary hover:bg-lightbgsecondary dark:bg-darkbgprimary hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="flex w-full items-center pr-1"
                                                            >
                                                                <div className="flex items-center gap-5 text-start w-full">
                                                                    <img
                                                                        className="w-8 h-8 object-cover p-1 bg-lightbgsecondary dark:bg-darkbgsecondary rounded-full"
                                                                        src={`${
                                                                            import.meta
                                                                                .env
                                                                                .VITE_SUPABASE_BUCKET_URL
                                                                        }/noboss/icons/user-icon.png`}
                                                                        alt=""
                                                                    />
                                                                    <h3 className="w-[150px] truncate text-xs tablet:text-sm font-medium">
                                                                        {
                                                                            client.name
                                                                        }
                                                                    </h3>
                                                                </div>

                                                                <div className="hidden laptop:flex justify-center w-full">
                                                                    <h3 className="w-[150px] text-textterceary text-center text-xs font-medium">
                                                                        {
                                                                            client.email
                                                                        }
                                                                    </h3>
                                                                </div>
                                                            </button>
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/*   Payment   */}
                                {page === 3 && (
                                    <div>
                                        <h3 className="text-center mt-2 mb-4">
                                            Metodo de Pago
                                        </h3>
                                        {/*   Form Page 1 */}
                                        <div className="flex flex-wrap justify-center m-auto items-center max-w-[300px] mobilXL:max-w-[500px] mt-1 gap-2 max-h-[135px] laptop:max-h-[305px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                            <div className="w-full flex flex-col gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPayMethod("Efectvo")
                                                    }
                                                    className="bg-lightbgsecondary dark:bg-darkbgprimary w-full py-7"
                                                >
                                                    Efectivo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPayMethod(
                                                            "Tarjeta Débito/Crédito"
                                                        )
                                                    }
                                                    className="bg-lightbgsecondary dark:bg-darkbgprimary w-full py-7"
                                                >
                                                    Tarjeta Débito/Crédito
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPayMethod(
                                                            "Transferencia"
                                                        )
                                                    }
                                                    className="bg-lightbgsecondary dark:bg-darkbgprimary w-full py-7"
                                                >
                                                    Transferencia
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/*   Cart */}
                                <div className="relative">
                                    {cart.length === 0 ? (
                                        <div className="grid place-content-center h-full m-auto w-[250px] tablet:w-[455px] py-10">
                                            <img
                                                className="w-40 tablet:w-60"
                                                src={marketimage}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative flex flex-col m-auto gap-1 w-full ">
                                            <div className="pt-2 pb-1 tablet:flex text-center justify-center items-center gap-3">
                                                <h3 className="text-sm">
                                                    Registro de Venta
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            removeCartEveryProducts()
                                                        )
                                                    }
                                                    className="bg-lightbgprimary dark:bg-darkbgprimary px-2 py-1 rounded text-xs"
                                                >
                                                    Vaciar
                                                </button>
                                            </div>
                                            <div className=" flex flex-col gap-1 tablet:min-h-[245px] max-h-[170px] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded px-2 tablet:pr-2 pb-10">
                                                {cart.map(
                                                    (
                                                        productCart: any,
                                                        i: any
                                                    ) => {
                                                        return (
                                                            <ProductCartTableBody
                                                                key={i}
                                                                productCart={
                                                                    productCart
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                                {/*   Summary */}
                                                <div className="absolute left-0 bottom-16 w-full">
                                                    <div className="flex justify-around w-full">
                                                        <div
                                                            className={`relative ${
                                                                client
                                                                    ? "right-3"
                                                                    : "right-[-70px] pr-20"
                                                            } bg-darkbgprimary rounded px-4 py-2 transition-all duration-100 flex gap-2 items-center  text-xs`}
                                                        >
                                                            <img
                                                                className="w-5"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/clients-icon.png`}
                                                                alt=""
                                                            />
                                                            {client && (
                                                                <h3 className="w-[100px] truncate">
                                                                    {
                                                                        client?.name
                                                                    }
                                                                </h3>
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`relative ${
                                                                payMethod
                                                                    ? "left-3"
                                                                    : " left-[-70px] pl-20"
                                                            } bg-darkbgprimary rounded transition-all duration-100 flex gap-2 items-center px-4 py-2 text-xs`}
                                                        >
                                                            {payMethod && (
                                                                <h3 className="w-[100px] truncate text-end">
                                                                    {payMethod}
                                                                </h3>
                                                            )}
                                                            <img
                                                                className="w-5"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/pay-icon.png`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="absolute bottom-[-4px] cursor-default bg-secondarycolor rounded shadow-lg px-5 py-3">
                                                            <h3>
                                                                $
                                                                {subTotalPrice(
                                                                    cart
                                                                ).toFixed(2)}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*   Buttons Page 1 */}
                                            <div className="flex gap-3 justify-center mt-2 text-xs tablet:text-base">
                                                {page === 1 && (
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            cart.length === 0
                                                                ? true
                                                                : false
                                                        }
                                                        onClick={() =>
                                                            setPage(2)
                                                        }
                                                        className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-secondarycolor bg-opacity-30 ${
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
                                                )}
                                                {page === 2 && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPage(1)
                                                            }
                                                            className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-darkbgprimary bg-opacity-70 ${
                                                                cart.length > 0
                                                                    ? "hover:bg-opacity-100"
                                                                    : "opacity-20"
                                                            } rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                                                        >
                                                            <img
                                                                className="w-3 object-contain rotate-90"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/arrow-down-icon.png`}
                                                                alt="home-icon"
                                                            />
                                                            Volver
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPage(3)
                                                            }
                                                            className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-secondarycolor bg-opacity-30 ${
                                                                cart.length > 0
                                                                    ? "hover:bg-opacity-100"
                                                                    : "opacity-20"
                                                            } rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                                                        >
                                                            Siguiente
                                                            <img
                                                                className="w-3 object-contain -rotate-90"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/arrow-down-icon.png`}
                                                                alt="home-icon"
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                                {page === 3 && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPage(2)
                                                            }
                                                            className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-darkbgprimary bg-opacity-70 ${
                                                                cart.length > 0
                                                                    ? "hover:bg-opacity-100"
                                                                    : "opacity-20"
                                                            } rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                                                        >
                                                            <img
                                                                className="w-3 object-contain rotate-90"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/arrow-down-icon.png`}
                                                                alt="home-icon"
                                                            />
                                                            Volver
                                                        </button>

                                                        <button
                                                            className={`w-full flex items-center justify-center gap-2 tablet:gap-5 bg-secondarycolor bg-opacity-30 ${
                                                                cart.length > 0
                                                                    ? "hover:bg-opacity-100"
                                                                    : "opacity-20"
                                                            } rounded-lg py-2 tablet:py-3 transition-all duration-150`}
                                                        >
                                                            Confirmar
                                                            <img
                                                                className="w-3 object-contain -rotate-90"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/arrow-down-icon.png`}
                                                                alt="home-icon"
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Sale;
