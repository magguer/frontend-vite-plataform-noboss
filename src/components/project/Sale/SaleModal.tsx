// Dependencies
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import UserTypes from "../../../types/UserTypes";
import ProjectTypes from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import { addProduct } from "../../../redux/productsReducer";

export default function SaleModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserTypes) => state.user);
    const project = useSelector((state: ProjectTypes) => state.project);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [model, setModel] = useState();
    const [sku, setSku] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState(project.categories[0]?.slug);
    const [sub_category, setSub_category] = useState(
        project.sub_categories[0]?.slug
    );
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [cost, setCost] = useState();

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
        dispatch(addProduct(response.data));
        dispatch(close(null));
    };

    return (
        <>
            <ModalLayout exit={() => dispatch(close(null))}>
                {/*    Form Add Product */}
                <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10">
                    <form
                        onSubmit={handleSubmit}
                        className="grid tablet:flex tablet:gap-3 justify-center w-full"
                    >
                        {/*          ADD INCOME  */}
                        <div>
                            <div>
                                <div className="px-2">
                                    {/*         BASIC INFO PRODUCT FOR PRODUCTS */}
                                    {page === 1 && (
                                        <div className="grid gap-5 w-full mobilXL:w-[380px] fade-in-right">
                                            {/*   Header Page 1 */}
                                            <div className="flex items-center gap-5">
                                                <img
                                                    className="w-14 rounded-full"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/projects/logos/${
                                                        project.logo_url
                                                    }`}
                                                    alt=""
                                                />
                                                <div className="flex flex-col text-start">
                                                    <h3 className="text-lg  tablet:text-xl font-semibold text-textsecondary">
                                                        Registro de ingreso
                                                    </h3>
                                                    <h3 className="text-sm tablet:text-base">
                                                        información del
                                                        movimiento:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 1 */}
                                            <div className="bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="w-full flex flex-col justify-between gap-5">
                                                    <div className="flex gap-2 w-full items-end">
                                                        <div className="grid gap-1 w-full">
                                                            <label
                                                                className="ml-1 text-start text-sm mb-1"
                                                                htmlFor="category"
                                                            >
                                                                Categoría
                                                            </label>
                                                            <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                                <select
                                                                    className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                                    name="category"
                                                                    id="category"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setCategory(
                                                                            e
                                                                                .tagret
                                                                                .value
                                                                        )
                                                                    }
                                                                >
                                                                    {project.categories.map(
                                                                        (
                                                                            category: any
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        category.slug
                                                                                    }
                                                                                    key={
                                                                                        category.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        category.name
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button className="bg-lightbgprimary dark:bg-darkbgprimary w-[80px] mb-0.5 py-1 h-full rounded-md text-lg font-semibold">
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1  text-start text-sm mb-1"
                                                            htmlFor="sub_category"
                                                        >
                                                            Sub Categoría
                                                        </label>
                                                        <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                            <select
                                                                className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                                name="sub_category"
                                                                id="sub_category"
                                                                onChange={(e) =>
                                                                    setSub_category(
                                                                        e.tagret
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                {project.sub_categories.map(
                                                                    (
                                                                        sub_category: any
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    sub_category.slug
                                                                                }
                                                                                key={
                                                                                    sub_category.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    sub_category.name
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*   Buttons Page 1 */}
                                            <div className="flex gap-3 mt-7">
                                                <button
                                                    onClick={() =>
                                                        dispatch(close(null))
                                                    }
                                                    type="button"
                                                    className="w-full text-center  bg-lightbgsecondary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary hover:bg-lightbuttonprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    Salir
                                                </button>
                                                <button
                                                    onClick={() => setPage(2)}
                                                    className="w-full flex items-center justify-center gap-5 bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
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
                                        <div className="w-full grid justify-between gap-5 mobilXL:w-[380px] fade-in-right">
                                            {/*   Header Page 3 */}
                                            <div className="flex items-center gap-5">
                                                <img
                                                    className="w-14 rounded-full"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SUPABASE_BUCKET_URL
                                                    }/projects/logos/${
                                                        project.logo_url
                                                    }`}
                                                    alt=""
                                                />
                                                <div className="justify-center text-start grid">
                                                    <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                        Ya queda poco!
                                                    </h3>
                                                    <h3 className="tablet:ext-center text-sm tablet:text-base ">
                                                        Por útlimo, los número:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 3 */}
                                            <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="flex gap-3">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="price"
                                                        >
                                                            Precio ($)
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            placeholder="825"
                                                            name="price"
                                                            id="price"
                                                            value={price}
                                                            onChange={(e) =>
                                                                setPrice(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="cost"
                                                        >
                                                            Costo ($)
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            name="cost"
                                                            placeholder="400"
                                                            id="cost"
                                                            value={cost}
                                                            onChange={(e) =>
                                                                setCost(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm  mb-1"
                                                            htmlFor="name"
                                                        >
                                                            Stock (u)
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            name="stock"
                                                            placeholder="250"
                                                            id="stock"
                                                            value={stock}
                                                            onChange={(e) =>
                                                                setStock(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start text-sm mb-1"
                                                            htmlFor="name"
                                                        >
                                                            SKU (Opcional)
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="string"
                                                            placeholder="BA1"
                                                            name="sku"
                                                            id="sku"
                                                            value={sku}
                                                            onChange={(e) =>
                                                                setSku(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/*   Buttons Page 3 */}
                                            <div className="flex gap-3 mt-9">
                                                <button
                                                    type="button"
                                                    onClick={() => setPage(2)}
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
                            </div>
                        </div>
                    </form>
                </div>
            </ModalLayout>
        </>
    );
}
