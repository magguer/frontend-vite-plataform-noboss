//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//Components
import MovementTableBody from "../../../components/project/Movement/MovementTableBody";
//Redux
import { getMovementsList } from "../../../redux/movementsReducer";
//Types
import MovementsType from "../../../types/MovementsType";
import { ProjectType } from "../../../types/ProjectTypes";
import { UserType } from "../../../types/UserTypes";
//Assets
import movementsIcon from "../../../assets/images/icons/movements-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";
import Spinner from "../../../components/general-partials/Spinner";

function Movements() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const movements = useSelector((state: MovementsType) => state.movements);
  const project = useSelector((state: ProjectType) => state.project);
  const user = useSelector((state: UserType) => state.user);
  const [showEditMovement, setShowEditMovement] = useState<boolean>(false);

  const getMovements = async () => {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/movement/?project=${project._id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(getMovementsList(response.data));
  };

  useEffect(() => {
    getMovements();
    setFirstRender(false);
  }, [project]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && hasMore && !loadingMore) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  return (
    <>
      <div className="fade-in-left">
        <div className="w-full flex">
          <div
            className={`${
              showEditMovement ? "w-full laptop:w-6/12" : "w-full"
            } transition-all duration-300`}
          >
            {/* Actions */}
            <div className="absolute bottom-2 flex justify-center w-full">
              <div
                className={`bg-lightbgunder dark:bg-darkbgprimary backdrop-blur-md bg-opacity-50 dark:bg-opacity-50 z-30 py-4 px-3 rounded-md shadow-lg  transition-all duration-200`}
              >
                {/* Searcher */}
                <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
                  <div className=" bg-lightbgprimary dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                    <input
                      className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Buscar tipo, miembro del equipo, id de orden..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>
                      <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-1.5 m-1 cursor-pointer transition-color duration-200">
                        <img
                          className="w-3 tablet:w-4 opacity-60 group-hover:opacity-100 dark:invert transition-all duration-150"
                          src={searchIcon}
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Movimientos List */}
            {movements?.length !== 0 ? (
              <>
                <div className="flex w-full">
                  <ul
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex w-full flex-col gap-1 h-[calc(100vh-180px)] tablet:h-[calc(100vh-205px)] overflow-auto scrollbar-none"
                  >
                    {movements?.map((movement) => {
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
                    {loadingMore && (
                      <div className="grid place-content-center my-5 w-full">
                        <Spinner />
                      </div>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <div className="h-[calc(100dvh-243px)] tablet:h-[calc(100dvh-269px)] flex flex-col items-center mt-16 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
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
