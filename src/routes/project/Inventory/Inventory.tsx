//Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Redux
import { getProductsList } from "../../../redux/productsReducer";
import { open } from "../../../redux/modalsReducer";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
import { ProductsType } from "../../../types/ProductsType";
import { Product } from "../../../types/ProductTypes";
import { UserType } from "../../../types/UserTypes";
//Components
import InventoryTableBody from "../../../components/project/Inventory/InventoryTableBody";
import Slider from "react-slick";
import EditItemInventory from "../../../components/project/Inventory/EditItemInventory";
//Assets
import noboxIcon from "../../../assets/images/icons/nobox-icon.png";

function Inventory() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [showEditItem, setShowEditItem] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();

    /*  const [categoryFilter, setCategoryFilter] = useState(null);
    const [sub_categoryFilter, setSubCategoryFilter] = useState(null); */
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const products = useSelector((state: ProductsType) => state.products);
    // const products = useSelector((state: ProductTypes) => state.product);

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
            dispatch(getProductsList(response.data));
        };
        getProducts();
    }, [project, search]);

    /*     const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }; */

    return (
        <>
            <div className="fade-in-left">
                <div className="w-full flex">
                    <div
                        className={`${
                            showEditItem ? "w-full laptop:w-6/12" : "w-full"
                        } transition-all duration-300`}
                    >
                        <div className="w-full pb-3">
                            {/* Searcher */}
                            <div className="flex justify-end tablet:justify-center mt-2 gap-1 mobilXL:gap-2 items-center">
                                <div className=" bg-lightbgprimary hover:bg-lightbgunder dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                                    <input
                                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Buscar producto, categoria, sku..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <button>
                                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                                            <img
                                                className="w-3 tablet:w-5"
                                                src="https://firebasestorage.googleapis.com/v0/b/noboss-app.appspot.com/o/nobossAppSimple%2Frecursos%2Ficonos%2Ficono%20explorador%20de%20proyectos%20blanco.png?alt=media&token=a9ae2846-f5af-4aa7-9c60-681f478c967a"
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                </div>
                                <button
                                    onClick={() => dispatch(open("addItem"))}
                                    className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                                >
                                    +
                                </button>
                            </div>
                            {/*  Filters */}
                            <div>
                                {/*  Categories Filter */}
                                {/*  {!categoryFilter && (
                <div className="px-14 my-2">
                    <Slider {...settings}>
                        {project?.categories.map((category) => {
                            return (
                                <div
                                    onClick={() =>
                                        setCategoryFilter(category.slug)
                                    }
                                    key={category._id}
                                    className="text-white px-2"
                                >
                                    <div
                                        className={`flex items-center justify-center gap-2 p-1 bg-darkbgsecondary hover:z-0 cursor-pointer rounded-lg transition-all duration-200`}
                                    >
                                        <h3 className="text-xs truncate">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            )} */}
                                {/*  Sub_categories Filter */}
                                {/*  {categoryFilter && (
                <div className="px-14 my-2">
                    <Slider {...settings}>
                        {project?.sub_categories.map((sub_category) => {
                            return (
                                <div
                                    onClick={() =>
                                        setSubCategoryFilter(sub_category.slug)
                                    }
                                    key={sub_category._id}
                                    className="text-white px-2"
                                >
                                    <div
                                        className={`flex items-center justify-center gap-2 p-1 bg-darkbgsecondary hover:z-0 cursor-pointer rounded-lg transition-all duration-200`}
                                    >
                                        <h3 className="text-xs truncate">
                                            {sub_category.name}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            )} */}
                            </div>
                        </div>
                        {/* Products List */}
                        {products?.length !== 0 ? (
                            <div className="flex w-full">
                                <ul className="flex w-full flex-col gap-1 h-[calc(100vh-250px)] tablet:h-[calc(100vh-285px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                                    {products?.map((product: any) => {
                                        return (
                                            <>
                                                <InventoryTableBody
                                                    key={product.id}
                                                    product={product}
                                                    project={project}
                                                    setShowEditItem={
                                                        setShowEditItem
                                                    }
                                                    showEditItem={showEditItem}
                                                    setProduct={setProduct}
                                                />
                                            </>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center mt-10 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                                <img
                                    className="w-20 laptop:w-32 invert dark:invert-0"
                                    src={noboxIcon}
                                    alt=""
                                />
                                <h3>No hay productos registrados.</h3>
                            </div>
                        )}
                    </div>
                    {showEditItem ? (
                        <div
                            className={`absolute laptop:relative z-50 ${
                                showEditItem
                                    ? "left-[0px] opacity-100 w-full laptop:w-6/12"
                                    : "left-[300px] opacity-0 "
                            } transition-all duration-200`}
                        >
                            <EditItemInventory
                                product={product}
                                setShowEditItem={setShowEditItem}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Inventory;
