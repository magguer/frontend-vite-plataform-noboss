//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
//Components
import MovementTableBody from "../../../components/project/Movement/MovementTableBody";
//Redux
import { getMovementsList } from "../../../redux/movementsReducer";
//Types
import MovementsType from "../../../types/MovementsType";
import { ProjectType } from "../../../types/ProjectTypes";
//Assets
import movementsIcon from "../../../assets/images/icons/movements-icon.png";
import { UserType } from "../../../types/UserTypes";

function Movements() {
    const dispatch = useDispatch();
    const movements = useSelector((state: MovementsType) => state.movements);
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const [search, setSearch] = useState("");
    const [showEditMovement, setShowEditMovement] = useState<boolean>(false);

    useEffect(() => {
        const getMovements = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/movement/?project=${
                    project.slug
                }`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getMovementsList(response.data));
        };
        getMovements();
    }, [project]);

    return (
        <>
            <div className="fade-in-left">
                <div className="w-full flex">
                    <div
                        className={`${
                            showEditMovement ? "w-full laptop:w-6/12" : "w-full"
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
                                        placeholder="Buscar por miembro, cliente, tipo..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <button>
                                        <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                                            <img
                                                className="w-3 tablet:w-5 invert dark:invert-0"
                                                src="https://firebasestorage.googleapis.com/v0/b/noboss-app.appspot.com/o/nobossAppSimple%2Frecursos%2Ficonos%2Ficono%20explorador%20de%20proyectos%20blanco.png?alt=media&token=a9ae2846-f5af-4aa7-9c60-681f478c967a"
                                                alt=""
                                            />
                                        </div>
                                    </button>
                                </div>
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
                        {movements?.length !== 0 ? (
                            <div className="flex w-full">
                                <ul className="flex w-full flex-col gap-1 h-[calc(100vh-250px)] tablet:h-[calc(100vh-285px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                                    {movements?.map((movement: any) => {
                                        return (
                                            <div key={movement._id}>
                                                <MovementTableBody
                                                    movement={movement}
                                                    project={project}
                                                    /*   setShowEditMovement={
                                                        setShowEditMovement
                                                    }
                                                    showEditMovement={
                                                        showEditMovement
                                                    } */
                                                />
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center mt-10 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                                <img
                                    className="w-20 laptop:w-32 dark:invert"
                                    src={movementsIcon}
                                    alt=""
                                />
                                <h3>No hay movimientos registrados.</h3>
                            </div>
                        )}
                    </div>
                    {showEditMovement ? (
                        <div
                            className={`absolute laptop:relative z-50 ${
                                showEditMovement
                                    ? "left-[0px] opacity-100 w-full laptop:w-6/12"
                                    : "left-[300px] opacity-0 "
                            } transition-all duration-200`}
                        >
                            {/*  <EditItemInventory
                                product={product}
                                setShowEditMovement={setShowEditMovement}
                            /> */}
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Movements;
