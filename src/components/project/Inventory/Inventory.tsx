//Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../animations/animations.css";
//Redux
import { add } from "../../../redux/productsReducer";
//Types
import ProjectTypes from "../../../types/ProjectTypes";
import ProductsTypes from "../../../types/ProductsTypes";
//Components
import InventoryTableBody from "./InventoryTableBody";
import Slider from "react-slick";

function Inventory() {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [sub_categoryFilter, setSubCategoryFilter] = useState(null);

    const project = useSelector((state: ProjectTypes) => state.project);
    const products = useSelector((state: ProductsTypes) => state.products);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/products/?project=${
                    project.slug
                }&search=${search}`,
                method: "get",
            });
            dispatch(add(response.data));
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
        <div className="fade-in-left">
            {/* Searcher */}
            <div className="flex justify-end mobilL:justify-center mt-2 gap-1 mobilXL:gap-2 items-center">
                <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                    <input
                        className="text-sm m-1 w-36 mobilL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                        type="text"
                        name=""
                        id=""
                        placeholder="Buscar producto, categoria, subcategoria..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>
                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                            <img
                                className="w-5"
                                src="https://firebasestorage.googleapis.com/v0/b/noboss-app.appspot.com/o/nobossAppSimple%2Frecursos%2Ficonos%2Ficono%20explorador%20de%20proyectos%20blanco.png?alt=media&token=a9ae2846-f5af-4aa7-9c60-681f478c967a"
                                alt=""
                            />
                        </div>
                    </button>
                </div>
                <button className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-4 py-1 text-lg font-semibold rounded-lg">
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
            {/* Products List */}
            <ul className="flex flex-col gap-1 mt-3  max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary">
                {products?.map((product: ProductsTypes) => {
                    return (
                        <InventoryTableBody
                            key={product._id}
                            product={product}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Inventory;
