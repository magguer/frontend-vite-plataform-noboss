// Dependencies
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Types
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
import Spinner from "../../../components/general-partials/Spinner";
import { close } from "../../../redux/modalsReducer";

function AddItemInventory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const [sendData, setSendData] = useState(false);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [model, setModel] = useState();
    const [sku, setSku] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState(project.categories[0].slug);
    const [sub_category, setSub_category] = useState(
        project.sub_categories[0].slug
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
        dispatch(close(null));
    };

    return (
        <div className="fade-in-right pb-5 py-3">
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
                                <div className="grid gap-5 w-[380px] fade-in-right">
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-6 laptop:w-12 object-contain"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/nobox-icon.png`}
                                            alt=""
                                        />
                                        <div className="justify-center grid">
                                            <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                Paso 1
                                            </h3>
                                            <h3 className="tablet:ext-center text-sm tablet:text-lg ">
                                                Primero, identifiquemos tu
                                                producto
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col justify-between gap-2">
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="category"
                                            >
                                                Categoría
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                    <select
                                                        className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                        name="category"
                                                        id="category"
                                                        onChange={(e: any) =>
                                                            setCategory(
                                                                e.tagret.value
                                                            )
                                                        }
                                                    >
                                                        {project.categories.map(
                                                            (category: any) => {
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
                                                <button className="bg-darkbgprimary w-[80px] py-1 rounded-md text-lg font-semibold">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="sub_category"
                                            >
                                                Sub Categoría
                                            </label>
                                            <div className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500">
                                                <select
                                                    className="text-sm w-full border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    name="sub_category"
                                                    id="sub_category"
                                                    onChange={(e: any) =>
                                                        setSub_category(
                                                            e.tagret.value
                                                        )
                                                    }
                                                >
                                                    {project.sub_categories.map(
                                                        (sub_category: any) => {
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
                                    <div className="flex gap-3 mt-7">
                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="w-full text-center hover:bg-darkbuttonhoverprimary bg-darkbgprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                        >
                                            Volver
                                        </button>
                                        <button
                                            onClick={() => setPage(2)}
                                            className="w-full text-center bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/*          IMAGES & DESCRIPTION FOR PRODUCTS */}
                            {page === 2 && (
                                <div className="grid items-center gap-5 w-[380px] fade-in-right">
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-6 laptop:w-12 object-contain"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/nobox-icon.png`}
                                            alt=""
                                        />
                                        <div className="justify-center grid">
                                            <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                Paso 2
                                            </h3>
                                            <h3 className="tablet:ext-center text-sm tablet:text-lg ">
                                                Ahora, demosle una identidad
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="w-full flex justify-between gap-2">
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-text text-sm"
                                                    htmlFor="model"
                                                >
                                                    Modelo
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="text"
                                                    required
                                                    name="model"
                                                    id="model"
                                                    value={model}
                                                    onChange={(e: any) =>
                                                        setModel(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="relative grid gap-1">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="images"
                                                >
                                                    Imagenes
                                                </label>
                                                <input
                                                    onChange={(e: any) => {
                                                        setImages(
                                                            e.target.files
                                                        );
                                                    }}
                                                    multiple
                                                    className="absolute inset-0 top-8 opacity-0 w-[80px] h-[40px]"
                                                    type="file"
                                                    name="images"
                                                    id="images"
                                                />
                                                <button className="bg-darkbgprimary w-[80px] py-2 rounded-md text-lg font-semibold">
                                                    {images.length !== 0
                                                        ? images.length
                                                        : "+"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="description"
                                            >
                                                Descripción
                                            </label>
                                            <textarea
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
                                                name="description"
                                                id="description"
                                                value={description}
                                                onChange={(e: any) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setPage(1)}
                                            className="w-full text-center hover:bg-darkbuttonhoverprimary bg-darkbgprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                        >
                                            Volver
                                        </button>
                                        <button
                                            onClick={() => setPage(3)}
                                            type="button"
                                            className="w-full text-center bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/*          BUSSINES INFO FOR PRODUCTS */}
                            {page === 3 && (
                                <div className="w-full grid justify-between gap-5 max-w-[380px] fade-in-right">
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-6 laptop:w-12 object-contain"
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/nobox-icon.png`}
                                            alt=""
                                        />
                                        <div className="justify-center grid">
                                            <h3 className="text-lg tablet:text-xl font-semibold text-textsecondary">
                                                Paso 3
                                            </h3>
                                            <h3 className="tablet:ext-center text-sm tablet:text-lg ">
                                                Ya casi estamos!
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-3">
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="price"
                                                >
                                                    Precio ($)
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    value={price}
                                                    onChange={(e: any) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="cost"
                                                >
                                                    Costo ($)
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="number"
                                                    name="cost"
                                                    id="cost"
                                                    value={cost}
                                                    onChange={(e: any) =>
                                                        setCost(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="name"
                                                >
                                                    Stock (u)
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="number"
                                                    name="stock"
                                                    id="stock"
                                                    value={stock}
                                                    onChange={(e: any) =>
                                                        setStock(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="name"
                                                >
                                                    SKU (Opcional)
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    type="string"
                                                    name="sku"
                                                    id="sku"
                                                    value={sku}
                                                    onChange={(e: any) =>
                                                        setSku(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-9">
                                        <button
                                            type="button"
                                            onClick={() => setPage(2)}
                                            className="w-full text-center hover:bg-darkbuttonhoverprimary bg-darkbgprimary rounded-lg py-2 tablet:py-3 transition-all duration-150"
                                        >
                                            Volver
                                        </button>
                                        <button className="w-full flex items-center justify-center text-center bg-secondarycolor bg-opacity-30 hover:bg-opacity-100 rounded-lg py-2 tablet:py-3 transition-all duration-150">
                                            {sendData && (
                                                <div>
                                                    <Spinner />
                                                </div>
                                            )}
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddItemInventory;
