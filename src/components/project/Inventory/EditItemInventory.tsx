//Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
import { UserType } from "../../../types/UserTypes";
//Assets
import arrowIcon from "../../../assets/images/icons/arrow-down-icon.png";
import deleteIcon from "../../../assets/images/icons/delete-icon.png";
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";
import tickIcon from "../../../assets/images/icons/tick-icon.png";
import Spinner from "../../general-partials/Spinner";

function EditItemInventory({ product, setShowEditItem }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const [images, setImages] = useState<string[]>([]);
    const [model, setModel] = useState<string>(product.model);
    const [sku, setSku] = useState<string>(product.sku);
    const [description, setDescription] = useState<string>(product.description);
    const [category, setCategory] = useState<string>(product.category.slug);
    const [oldCategory, setOldCategory] = useState<string>(
        product.sub_category.slug
    );
    const [sub_category, setSub_category] = useState<string>(
        product.sub_category.slug
    );
    const [oldSub_category, setOldSub_category] = useState<string>(
        product.category.slug
    );
    const [price, setPrice] = useState<number>(product.price);
    const [stock, setStock] = useState<number>(product.stock);
    const [cost, setCost] = useState<number>(product.cost);

    useEffect(() => {
        const getProduct = async () => {
            setModel(product.model);
            setSku(product.sku);
            setDescription(product.description);
            setCategory(product.category.slug);
            setOldCategory(product.category.slug);
            setSub_category(product.sub_category.slug);
            setOldSub_category(product.sub_category.slug);
            setPrice(product.price);
            setStock(product.stock);
            setCost(product.cost);
        };
        getProduct();
    }, [product]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("model", model as any);
        formData.append("sku", sku as any);
        formData.append("description", description as any);
        formData.append("category", category as any);
        formData.append("oldCategory", oldCategory as any);
        formData.append("sub_category", sub_category as any);
        formData.append("oldSub_category", oldSub_category as any);
        formData.append("price", price as any);
        formData.append("stock", stock as any);
        formData.append("cost", cost as any);
        formData.append("product", product?._id);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_API_URL}/products/${product?._id}`,
            data: formData,
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        setShowEditItem(false);
        setLoading(false);
    };

    const handleDelete = (e: any) => {
        e.preventDefault();
        console.log("delete");
    };

    return (
        <>
            <div className="laptop:ml-2">
                {product ? (
                    <div className="fade-in-right flex tablet:px-3 bg-lightbgprimary dark:bg-darkbgprimary rounded-md">
                        <form
                            onSubmit={handleSubmit}
                            className="grid tablet:flex tablet:gap-3 justify-center w-full py-3 text-textlightprimary dark:text-textdarkprimary rounded"
                        >
                            {/*  EDIT INFO PRODUCTS */}
                            <div className="w-full h-full">
                                <div className="flex items-center px-3 tablet:px-0 mb-3 text-sm gap-2">
                                    <div className="ml-2 flex gap-3 items-center w-full">
                                        <img
                                            className="w-6 object-contain invert dark:invert-0"
                                            src={noboxIcon}
                                            alt="nobox-icon"
                                        />
                                        <h4
                                            className={`max-w-[150px] tablet:max-w-[300px] text-xs tablet:text-sm truncate`}
                                        >
                                            {product.model}
                                        </h4>
                                    </div>
                                    <div className="flex justify-end w-full tablet:mr-0">
                                        <button className="text-center bg-secondarycolor bg-opacity-20 hover:bg-opacity-100 rounded-lg px-4 py-1 transition-all duration-150">
                                            {loading ? (
                                                <Spinner />
                                            ) : (
                                                <img
                                                    className="w-3 tablet:w-4 object-contain invert-0 dark:invert"
                                                    src={tickIcon}
                                                    alt=""
                                                />
                                            )}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setShowEditItem(false)}
                                        type="button"
                                        className="relative opacity-40 hover:opacity-100 text-center rounded-lg px-2 py-2 transition-all duration-150"
                                    >
                                        <img
                                            className="w-8 object-cover -rotate-90 invert dark:invert-0"
                                            src={arrowIcon}
                                            alt="arrow-icon"
                                        />
                                    </button>
                                </div>
                                <div className=" rounded px-2 py-3 h-[calc(100vh-250px)] tablet:h-[calc(100vh-285px)] laptop:h-[calc(100vh-290px)] overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded  scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary">
                                    {/*   Model & Sku Selector */}
                                    <div className="w-full flex justify-between gap-2  text-xs">
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1"
                                                htmlFor="model"
                                            >
                                                Modelo
                                            </label>
                                            <input
                                                className="w-full p-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="model"
                                                id="model"
                                                value={model}
                                                onChange={(e) =>
                                                    setModel(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1"
                                                htmlFor="sku"
                                            >
                                                Sku
                                            </label>
                                            <input
                                                className="w-full p-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="sku"
                                                id="sku"
                                                value={sku}
                                                onChange={(e) =>
                                                    setSku(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/*   Category & SubCategory Selector */}
                                    <div className="w-full flex flex-col gap-2   text-xs">
                                        <div className="w-full flex justify-between pt-2 gap-2">
                                            {/*   Select Categories */}
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1"
                                                    htmlFor="category"
                                                >
                                                    Categoría
                                                </label>
                                                <select
                                                    className=" w-full p-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                    name="category"
                                                    id="category"
                                                    onChange={(e) =>
                                                        setCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={
                                                            product.category
                                                                .slug
                                                        }
                                                    >
                                                        {product.category.name}
                                                    </option>
                                                    {project.categories.map(
                                                        (category: any) => {
                                                            if (
                                                                product.category
                                                                    .name !==
                                                                category.name
                                                            ) {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        value={
                                                                            category.slug
                                                                        }
                                                                    >
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </option>
                                                                );
                                                            } else null;
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                            {/*   Select Sub_categories */}
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1"
                                                    htmlFor="sub_category"
                                                >
                                                    Sub-Categoría
                                                </label>
                                                <select
                                                    className="w-full p-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    name="sub_category"
                                                    id="sub_category"
                                                    onChange={(e) =>
                                                        setSub_category(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={
                                                            product.sub_category
                                                                .slug
                                                        }
                                                    >
                                                        {
                                                            product.sub_category
                                                                .name
                                                        }
                                                    </option>
                                                    {project.sub_categories.map(
                                                        (sub_category: any) => {
                                                            if (
                                                                product
                                                                    .sub_category
                                                                    .name !==
                                                                sub_category.name
                                                            ) {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            sub_category.id
                                                                        }
                                                                        value={
                                                                            sub_category.slug
                                                                        }
                                                                    >
                                                                        {
                                                                            sub_category.name
                                                                        }
                                                                    </option>
                                                                );
                                                            } else null;
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <Link
                                            to={""}
                                            className="py-2 dark:bg-darkbgunder hover:dark:bg-darksubbgprimary bg-lightbgunder hover:bg-lightbgsecondary text-center rounded-md transition-colors duration-200"
                                        >
                                            Administrar Categorías
                                        </Link>
                                    </div>
                                    {/*   Image Selector */}
                                    <div className="flex justify-center pt-2 gap-1">
                                        <div className="flex gap-2 px-2 py-2 max-h-[34vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded ">
                                            {product?.images_url.map(
                                                (image: any, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="grid relative gap-2 justify-center"
                                                        >
                                                            <img
                                                                key={i}
                                                                className="bg-bgPrimaryColor z-40 w-14 h-14 object-contain cursor-pointer border rounded p-1 fade-in-fast"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/projects/products/${image}`}
                                                            />

                                                            <button className="top-[-3px] left-[-3px] absolute z-50">
                                                                <div className="p-1 rounded bg-lightbgprimary  hover:dark:bg-darkbgsecondary dark:bg-darkbgsecondary z-50  hover:bg-lightbgsecondary transition-all duration-200 hover:text-textPrimary">
                                                                    <img
                                                                        className="w-3 dark:invert"
                                                                        src={
                                                                            deleteIcon
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </button>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center cursor-pointer">
                                            <input
                                                onChange={(e: any) => {
                                                    setImages(e.target.files);
                                                }}
                                                multiple
                                                className="absolute opacity-0 w-[40px]"
                                                type="file"
                                                name="images"
                                                id="images"
                                            />
                                            <button className="bg-lightbgsecondary dark:bg-darkbgsecondary px-3 h-8 rounded text-lg font-semibold">
                                                {images.length !== 0
                                                    ? images.length
                                                    : "+"}
                                            </button>
                                        </div>
                                    </div>
                                    {/*   Description Input */}
                                    <div className="grid gap-1 w-full text-xs">
                                        <label
                                            className="ml-1"
                                            htmlFor="description"
                                        >
                                            Descripción
                                        </label>
                                        <textarea
                                            className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
                                            name="description"
                                            id="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    {/*   Price, Coast, Stock Input */}
                                    <div className="w-full flex justify-between pt-2 gap-2  text-xs">
                                        {/*  Price */}
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1"
                                                htmlFor="price"
                                            >
                                                Precio ($)
                                            </label>
                                            <input
                                                className="w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="number"
                                                name="price"
                                                id="price"
                                                value={price}
                                                onChange={(e: any) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                        {/*  Cost */}
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 "
                                                htmlFor="cost"
                                            >
                                                Costo ($)
                                            </label>
                                            <input
                                                className=" w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="number"
                                                name="cost"
                                                id="cost"
                                                value={cost}
                                                onChange={(e: any) =>
                                                    setCost(e.target.value)
                                                }
                                            />
                                        </div>
                                        {/*  Stock */}
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 "
                                                htmlFor="name"
                                            >
                                                Stock (u)
                                            </label>
                                            <input
                                                className=" w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-lightbgsecondary dark:bg-darkbgsecondary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="number"
                                                name="stock"
                                                id="stock"
                                                value={stock}
                                                onChange={(e: any) =>
                                                    setStock(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/*  BUTTONS */}
                                    <div className="flex gap-3 mt-4 justify-end">
                                        <button
                                            onClick={handleDelete}
                                            type="button"
                                            className=" flex items-center justify-center gap-5 bg-lightbgsecondary hover:bg-lightbgunder   dark:bg-darkbgsecondary text-xs hover:dark:bg-darkbgunder   rounded-lg px-5 py-3 transition-all duration-150"
                                        >
                                            Suspender
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            type="button"
                                            className=" flex items-center justify-center gap-5 bg-lightbgsecondary hover:bg-red-700  dark:bg-darkbgsecondary  hover:dark:bg-red-900 rounded-lg px-5 py-3 transition-all duration-150"
                                        >
                                            <img
                                                className="w-4 object-contain invert-0 dark:invert"
                                                src={deleteIcon}
                                                alt="home-icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default EditItemInventory;
