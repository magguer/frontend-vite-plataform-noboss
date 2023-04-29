import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProjectTypes from "../../../types/ProjectTypes";
import UserTypes from "../../../types/UserTypes";

function EditItemServices() {
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
            setCategory(response.data.category.slug);
            setOldCategory(response.data.category.slug);
            setSub_category(response.data.sub_category.slug);
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
        formData.append("sub_category", sub_category as any);
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
        navigate(-1);
    };

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("delete");
    };

    return (
        <>
            <div className="relative">
                {product ? (
                    <div className="fade-in-right">
                        <form
                            onSubmit={handleSubmit}
                            className="grid tablet:flex tablet:gap-3 justify-center w-full laptop:py-4"
                        >
                            {/*          IMAGES SELECTOR AND ADDED FOR PRODUCTS */}
                            <div className="w-full laptop:w-auto grid justify-center items-center py-2 tablet:py-2">
                                <div className="hidden tablet:flex tablet:gap-3">
                                    <img
                                        className="hidden w-[250px] h-[250px] tablet:flex object-contain rounded-sm"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/projects/products/${
                                            showImage || product?.images_url[0]
                                        }`}
                                        alt=""
                                    />
                                    <div className="flex flex-col gap-1">
                                        <div className="grid gap-2 px-2 py-2 max-h-[34vh] overflow-auto scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded ">
                                            {product?.images_url.map(
                                                (image, i) => {
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
                                                                        import.meta
                                                                            .env
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
                                                }
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center cursor-pointer">
                                            <input
                                                onChange={(e) => {
                                                    setImages(e.target.files);
                                                }}
                                                multiple
                                                className="absolute opacity-0 w-[40px]"
                                                type="file"
                                                name="images"
                                                id="images"
                                            />
                                            <button className=" bg-darkbgprimary px-3 h-8 rounded text-lg font-semibold">
                                                {images.length !== 0
                                                    ? images.length
                                                    : "+"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*          EDIT INFO PRODUCTS */}
                            <div className="w-full  laptop:w-auto flex max-h-[70vh] ">
                                <div>
                                    <div className="px-2 mb-4 pb-3 max-h-[49vh] tablet:max-h-[42vh] laptop:max-h-[45vh] overflow-auto scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded ">
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
                                            {/*   Select Categories */}
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
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        selected
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
                                        {/*   Input Description */}
                                        <div className="grid gap-1 w-full pt-2">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="description"
                                            >
                                                Descripción
                                            </label>
                                            <textarea
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded"
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
                                                    type="number"
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
                                            onClick={() => navigate(-1)}
                                            type="button"
                                            className="w-full text-center hover:bg-darkbuttonhoverprimary bg-darkbgprimary rounded-lg py-1 tablet:py-3 transition-all duration-150"
                                        >
                                            Volver
                                        </button>
                                        <button className="w-full text-center hover:bg-secondarycolor hover:bg-opacity-20 bg-darkbgprimary rounded-lg py-1 tablet:py-3 transition-all duration-150">
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
            </div>
        </>
    );
}

export default EditItemServices;
