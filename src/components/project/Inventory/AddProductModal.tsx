// Dependencies
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
// Components
import Spinner from "../../general-partials/Spinner";
import ModalLayout from "../../../layouts/ModalLayout";
//Redux
import { close } from "../../../redux/modalsReducer";
import { addProduct } from "../../../redux/productsReducer";
//Assets
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";
import cameraIcon from "../../../assets/images/icons/camera-icon.png";

export default function AddClientModal() {
    const dispatch = useDispatch();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState<string[]>([]);
    const [model, setModel] = useState<string>();
    const [sku, setSku] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [category, setCategory] = useState<string>(
        project.categories[0]?.slug
    );
    const [sub_category, setSub_category] = useState<string>(
        project.sub_categories[0]?.slug
    );
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [cost, setCost] = useState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendData(true);
        const formData = new FormData();
        formData.append("model", model as any);
        formData.append("sku", sku as any);
        formData.append("description", description as any);
        formData.append("category", category as any);
        formData.append("sub_category", sub_category as any);
        formData.append("price", price as any);
        formData.append("stock", stock as any);
        formData.append("cost", cost as any);
        formData.append("project", project.slug as any);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/products`,
            data: formData,
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
                <div className="bg-lightbgprimary dark:bg-darkbgprimary rounded p-5 tablet:p-10 text-textlightprimary dark:text-textdarkprimary">
                    <form
                        onSubmit={handleSubmit}
                        className="grid tablet:flex tablet:gap-3 justify-center w-full"
                    >
                        {/*          ADD INFO PRODUCTS */}
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
                                                    <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                        Agreguemos tu producto!
                                                    </h3>
                                                    <h3 className="text-sm tablet:text-base">
                                                        Primero,
                                                        identifiquémoslo:
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
                                                                Categoría *
                                                            </label>
                                                            <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                                <select
                                                                    className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                                    name="category"
                                                                    id="category"
                                                                    onChange={(
                                                                        e: any
                                                                    ) =>
                                                                        setCategory(
                                                                            e
                                                                                .target
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
                                                            Sub Categoría *
                                                        </label>
                                                        <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                            <select
                                                                className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                                name="sub_category"
                                                                id="sub_category"
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    setSub_category(
                                                                        e.target
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
                                            <div className="flex gap-3 mt-2 tablet:mt-7">
                                                <button
                                                    onClick={() =>
                                                        dispatch(close(null))
                                                    }
                                                    type="button"
                                                    className="w-full text-center bg-lightbgsecondary dark:bg-darkbgsecondary opacity-50 hover:opacity-100  rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    Salir
                                                </button>
                                                <button
                                                    onClick={() => setPage(2)}
                                                    style={{
                                                        backgroundColor: `${project.color_one}`,
                                                    }}
                                                    className="w-full flex items-center justify-center gap-5 opacity-50 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    Siguiente
                                                    <img
                                                        className="w-3 object-contain -rotate-90  invert dark:invert-0"
                                                        src={arrowIcon}
                                                        alt="home-icon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/*          IMAGES & DESCRIPTION FOR PRODUCTS */}
                                    {page === 2 && (
                                        <div className="grid items-center gap-5 w-full mobilXL:w-[380px] fade-in-right">
                                            {/*   Header Page 2 */}
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
                                                        Segundo paso...
                                                    </h3>
                                                    <h3 className="tablet:text-center text-sm tablet:text-base ">
                                                        Ahora, démosle una
                                                        identidad:
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*   Form Page 2 */}
                                            <div className="grid gap-5 bg-lightbgsecondary dark:bg-darkbgsecondary p-6 rounded">
                                                <div className="w-full flex justify-between gap-2">
                                                    <div className="grid gap-1 w-full">
                                                        <label
                                                            className="ml-1 text-start mb-1 text-text text-sm"
                                                            htmlFor="model"
                                                        >
                                                            Modelo *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="text"
                                                            placeholder="Ej: Billetera Automática De Aluminio Rfid Antirobo Casual Oferta"
                                                            required
                                                            name="model"
                                                            id="model"
                                                            value={model}
                                                            onChange={(e) =>
                                                                setModel(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="relative grid gap-1">
                                                        <label
                                                            className="ml-1 w-full text-start text-sm mb-1"
                                                            htmlFor="images"
                                                        >
                                                            Imagen *
                                                        </label>
                                                        <input
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                setImages(
                                                                    e.target
                                                                        .files
                                                                );
                                                            }}
                                                            multiple
                                                            className="absolute inset-0 top-8 opacity-0 w-[80px] h-[40px] z-40"
                                                            type="file"
                                                            name="images"
                                                            id="images"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="bg-lightbgprimary dark:bg-darkbgprimary w-[80px] py-2 h-full flex justify-center rounded-md text-lg font-semibold"
                                                        >
                                                            {images.length !==
                                                            0 ? (
                                                                images.length
                                                            ) : (
                                                                <img
                                                                    className="w-5 object-contain dark:invert"
                                                                    src={
                                                                        cameraIcon
                                                                    }
                                                                    alt="camera-icon"
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid gap-1 w-full">
                                                    <label
                                                        className="ml-1 text-start text-sm  mb-1"
                                                        htmlFor="description"
                                                    >
                                                        Descripción (Opcional)
                                                    </label>
                                                    <textarea
                                                        className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
                                                        name="description"
                                                        placeholder="Ej: Esta billetera cuenta con un mecanismo de deslizamiento de tarjetas hacia arriba.."
                                                        id="description"
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/*   Buttons Page 2 */}
                                            <div className="flex gap-3 mt-1 tablet:mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setPage(1)}
                                                    className="w-full bg-lightbgsecondary dark:bg-darkbgsecondary opacity-50 hover:opacity-100 flex gap-5 items-center justify-center rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    <img
                                                        className="w-3 object-contain rotate-90 invert dark:invert-0"
                                                        src={arrowIcon}
                                                        alt="home-icon"
                                                    />
                                                    Volver
                                                </button>
                                                <button
                                                    onClick={() => setPage(3)}
                                                    type="button"
                                                    style={{
                                                        backgroundColor: `${project.color_one}`,
                                                    }}
                                                    className="w-full flex justify-center items-center gap-5   opacity-50 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    Siguiente
                                                    <img
                                                        className="w-3 object-contain -rotate-90 invert dark:invert-0"
                                                        src={arrowIcon}
                                                        alt="home-icon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/*          BUSSINES INFO FOR PRODUCTS */}
                                    {page === 3 && (
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
                                                            Precio ($) *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            placeholder="Ej: 825"
                                                            name="price"
                                                            id="price"
                                                            value={price}
                                                            onChange={(
                                                                e: any
                                                            ) =>
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
                                                            Costo ($) *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            name="cost"
                                                            placeholder="Ej: 400"
                                                            id="cost"
                                                            value={cost}
                                                            onChange={(
                                                                e: any
                                                            ) =>
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
                                                            Stock (u) *
                                                        </label>
                                                        <input
                                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgprimary dark:bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                            type="number"
                                                            name="stock"
                                                            placeholder="Ej: 250"
                                                            id="stock"
                                                            value={stock}
                                                            onChange={(
                                                                e: any
                                                            ) =>
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
                                                            placeholder="Ej: BA1"
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
                                            <div className="flex gap-3 mt-4 tablet:mt-9">
                                                <button
                                                    type="button"
                                                    onClick={() => setPage(2)}
                                                    className="w-full bg-lightbgsecondary dark:bg-darkbgsecondary opacity-50 hover:opacity-100 flex gap-5 items-center justify-center rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
                                                    <img
                                                        className="w-3 object-contain rotate-90 invert dark:invert-0"
                                                        src={arrowIcon}
                                                        alt="home-icon"
                                                    />
                                                    Volver
                                                </button>
                                                <button
                                                    style={{
                                                        backgroundColor: `${project.color_one}`,
                                                    }}
                                                    className="w-full flex items-center justify-center text-center opacity-50 hover:opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                                >
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
