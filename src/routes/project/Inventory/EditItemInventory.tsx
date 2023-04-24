import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProjectTypes from "../../../types/ProjectTypes";
import UserTypes from "../../../types/UserTypes";
import { edit } from "../../../redux/productsReducer";

function EditItemInventory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const project = useSelector((state: ProjectTypes) => state.project);
    const user = useSelector((state: UserTypes) => state.user);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState(null);
    const [model, setModel] = useState();
    const [sku, setSku] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [oldCategory, setOldCategory] = useState();
    const [sub_category, setSub_category] = useState();
    const [oldSub_category, setOldSub_category] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [cost, setCost] = useState();

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/${params.slug}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProduct(response.data);
            setModel(response.data.model);
            setSku(response.data.sku);
            setDescription(response.data.description);
            setCategory(response.data.category);
            setOldCategory(response.data.category.slug);
            setSub_category(response.data.sub_category);
            setOldSub_category(response.data.sub_category.slug);
            setPrice(response.data.price);
            setStock(response.data.stock);
            setCost(response.data.cost);
        };
        getProduct();
    }, [params.slug]);

    const [showImage, setShowImage] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("model", model as any);
        formData.append("sku", sku as any);
        formData.append("description", description as any);
        formData.append("category", category as any);
        formData.append("oldCategory", oldCategory as any);
        formData.append("sub_category", sub_category?.slug as any);
        formData.append("oldSub_category", oldSub_category as any);
        formData.append("price", price as any);
        formData.append("stock", stock as any);
        formData.append("cost", cost as any);
        formData.append("product", product?._id);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const response = await axios({
            method: "patch",
            url: `${import.meta.env.VITE_API_URL}/products/${product?._id}`,
            data: formData,
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("delete");
    };

    return (
        <>
            <style>select:options</style>
            <div className="relative">
                {product ? (
                    <div className="fade-in-right">
                        <form
                            onSubmit={handleSubmit}
                            className="grid tablet:flex tablet:gap-10 justify-center w-full"
                        >
                            {/*          IMAGES SELECTOR AND ADDED FOR PRODUCTS */}
                            <div className="grid justify-center items-center py-5">
                                <div className="hidden tablet:flex gap-4">
                                    <img
                                        className="hidden h-[300px] tablet:flex object-contain rounded-sm"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/projects/products/${
                                            showImage || product?.images_url[0]
                                        }`}
                                        alt=""
                                    />
                                    <div className="grid gap-3 place-content-center">
                                        {product?.images_url.map((image, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="grid relative gap-2 justify-center"
                                                >
                                                    <div className="">
                                                        <img
                                                            key={i}
                                                            onClick={() =>
                                                                setShowImage(
                                                                    image
                                                                )
                                                            }
                                                            className="bg-bgPrimaryColor z-50 w-14 mix-blend-multiply h-14 object-contain cursor-pointer border rounded p-1 fade-in-fast"
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_SUPABASE_BUCKET_URL
                                                            }/projects/products/${image}`}
                                                        />
                                                    </div>
                                                    <button className="top-[-3px] left-[-3px] absolute">
                                                        <div className="p-1 rounded bg-textterceary z-10  hover:bg-textprimary transition-all duration-200 hover:text-textPrimary">
                                                            <img
                                                                className="w-3"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_SUPABASE_BUCKET_URL
                                                                }/noboss/icons/delete-icon.png`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <div className="flex gap-2 items-center justify-center">
                                            <input
                                                onChange={(e) => {
                                                    setImages(e.target.files);
                                                }}
                                                multiple
                                                className="absolute cursor-pointer ml-1 opacity-0 w-[40px]"
                                                type="file"
                                                name="images"
                                                id="images"
                                            />
                                            <button className=" bg-darkbgprimary px-3 h-8 rounded text-lg font-semibold">
                                                +
                                            </button>
                                            <h3 className="">
                                                {images.length !== 0 &&
                                                    images.length}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*          EDIT INFO PRODUCTS */}
                            <div className="flex max-h-[70vh]">
                                <div>
                                    <div className="px-2 mt-2 mb-4 pb-3">
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
                                                    className="ml-1 text-sm"
                                                    htmlFor="sku"
                                                >
                                                    Sku
                                                </label>
                                                <input
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
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
                                        <div className="w-full flex justify-between pt-2 gap-2">
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="category"
                                                >
                                                    Categoria
                                                </label>

                                                <select
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                                                    name="category"
                                                    id="category"
                                                    onChange={(e) =>
                                                        setCategory(
                                                            e.tagret.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={category._id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                    {project.categories.map(
                                                        (category) => {
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
                                            <div className="grid gap-1 w-full">
                                                <label
                                                    className="ml-1 text-sm"
                                                    htmlFor="sub_category"
                                                >
                                                    Sub-Categoria
                                                </label>
                                                <select
                                                    className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                    name="sub_category"
                                                    id="sub_category"
                                                    onChange={(e) =>
                                                        setSub_category(
                                                            e.tagret.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={sub_category._id}
                                                    >
                                                        {sub_category.name}
                                                    </option>
                                                    {project.sub_categories.map(
                                                        (sub_category) => {
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
                                        <div className="grid gap-1 w-full pt-2">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="description"
                                            >
                                                Descripción
                                            </label>
                                            <textarea
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="description"
                                                id="description"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="w-full flex justify-between pt-2 gap-2">
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
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </div>
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
                                                    onChange={(e) =>
                                                        setStock(e.target.value)
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
                                                    type="text"
                                                    name="cost"
                                                    id="cost"
                                                    value={cost}
                                                    onChange={(e) =>
                                                        setCost(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDelete}
                                            className="w-full text-center hover:bg-red-950 bg-darkbgprimary rounded-lg py-3 transition-all duration-150"
                                        >
                                            Borrar
                                        </button>
                                        <button className="w-full text-center hover:bg-secondarycolor hover:bg-opacity-20 bg-darkbgprimary rounded-lg py-3 transition-all duration-150">
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-3 left-2 bg-darkbgprimary p-2 rounded-full"
                >
                    <img
                        className="w-3 h-3 object-contain rotate-90 opacity-70"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/arrow-down-icon.png`}
                        alt=""
                    />
                </button>
            </div>
        </>
    );
}

export default EditItemInventory;
