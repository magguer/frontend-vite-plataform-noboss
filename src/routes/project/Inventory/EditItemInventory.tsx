import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItemInventory() {
    const navigate = useNavigate();
    const params = useParams();
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState(null);

    const [model, setModel] = useState();
    const [slug, setSlug] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [cost, setCost] = useState();

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/${params.slug}`,
                method: "get",
            });
            setProduct(response.data);
            setModel(response.data.name);
            setSlug(response.data.slug);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setStock(response.data.stock);
            setCost(response.data.cost);
        };
        getProduct();
    }, [params.slug]);

    const [showImage, setShowImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        console.log("delete");
    };

    return (
        <div className="relative">
            {product ? (
                <div className="fade-in-right">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 tablet:grid-cols-2 w-full"
                    >
                        {/*          IMAGES SELECTOR AND ADDED FOR PRODUCTS */}
                        <div className="grid justify-center items-center py-5">
                            <div className="hidden tablet:block">
                                <img
                                    className="hidden h-[260px] tablet:flex object-contain mb-7 rounded-sm"
                                    src={`${
                                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                                    }/projects/products/${
                                        showImage || product?.images_url[0]
                                    }`}
                                    alt=""
                                />
                                <div className="flex justify-center gap-2 items-center">
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
                                                            setShowImage(image)
                                                        }
                                                        className="bg-bgPrimaryColor z-50 w-14 mix-blend-multiply h-14 object-contain cursor-pointer border rounded p-1 fade-in-fast"
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_SUPABASE_BUCKET_URL
                                                        }/projects/products/${
                                                            product
                                                                ?.images_url[0]
                                                        }`}
                                                    />
                                                </div>
                                                <button className="top-[-3px] left-[-3px] absolute">
                                                    <div className="p-1 rounded bg-textterceary z-10  hover:bg-textprimary transition-all duration-200 hover:text-textPrimary">
                                                        <img
                                                            className="w-3"
                                                            src={`${
                                                                import.meta.env
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
                        <div className="tablet:pr-8 laptop:pr-16 w-full">
                            <div>
                                <div className="flex items-center gap-3 justify-center">
                                    <h3 className="text-center  text-md">
                                        {product?.name}
                                    </h3>
                                    <img
                                        className="h-[14px] object-contain"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/edit-icon.png`}
                                        alt=""
                                    />
                                </div>
                                <div className="px-2 my-4 pb-3 laptop:h-[45vh] overflow-auto scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                                    <div className="w-full flex justify-between gap-2">
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-text text-sm"
                                                htmlFor="name"
                                            >
                                                Modelo
                                            </label>
                                            <input
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={model}
                                                onChange={(e) =>
                                                    setModel(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="name"
                                            >
                                                Slug
                                            </label>
                                            <input
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={slug}
                                                onChange={(e) =>
                                                    setSlug(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between pt-3 gap-2">
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="name"
                                            >
                                                Categoria
                                            </label>
                                            <select
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                name="name"
                                                id="name"
                                            >
                                                <option>{product.name}</option>
                                            </select>
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="name"
                                            >
                                                Sub-Categoria
                                            </label>
                                            <select
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                name="name"
                                                id="name"
                                            >
                                                <option>{product.name}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid gap-1 w-full pt-1">
                                        <label
                                            className="ml-1 text-sm"
                                            htmlFor="name"
                                        >
                                            Descripción
                                        </label>
                                        <textarea
                                            className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full flex justify-between pt-1 gap-2">
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="name"
                                            >
                                                Precio ($)
                                            </label>
                                            <input
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="name"
                                                id="name"
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
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={stock}
                                                onChange={(e) =>
                                                    setStock(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-1 w-full">
                                            <label
                                                className="ml-1 text-sm"
                                                htmlFor="name"
                                            >
                                                Costo ($)
                                            </label>
                                            <input
                                                className="text-sm w-full py-2 px-2 border-transparent rounded-lg focus:ring-gray-600 bg-darkbgprimary focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={cost}
                                                onChange={(e) =>
                                                    setCost(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>{" "}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDelete}
                                        className="w-full text-center hover:bg-red-950 bg-darkbgprimary rounded-lg py-3 transition-all duration-150"
                                    >
                                        Borrar
                                    </button>
                                    <button className="w-full text-center hover:bg-secondarycolor hover:bg-opacity-20 bg-darkbgprimary rounded-lg py-3 transition-all duration-150">
                                        Editar
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
                    className="w-2 h-2 object-contain rotate-90 opacity-70"
                    src={`${
                        import.meta.env.VITE_SUPABASE_BUCKET_URL
                    }/noboss/icons/arrow-down-icon.png`}
                    alt=""
                />
            </button>
        </div>
    );
}

export default EditItemInventory;
