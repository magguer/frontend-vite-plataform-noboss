//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//Types
import { ProjectType } from "../../../types/ProjectTypes";
import { UserType } from "../../../types/UserTypes";
import { ClientsType } from "../../../types/ClientsType";
import { Client, ClientType } from "../../../types/ClientTypes";
//Components
import ClientTableBody from "../../../components/project/Clients/ClientTableBody";
//Redux
import { open } from "../../../redux/modalsReducer";
import { addClientsList, getClientsList } from "../../../redux/clientsReducer";
//Assets
import clientsIcon from "../../../assets/images/icons/clients-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";
import Spinner from "../../../components/general-partials/Spinner";

function Clients() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const roleProject = useSelector((state: any) => state.roleProject);
  const project = useSelector((state: ProjectType) => state.project);
  const user = useSelector((state: UserType) => state.user);
  const clients = useSelector((state: ClientsType) => state.clients);

  //GetClients
  const getClients = async () => {
    setLoadingMore(true);
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/clients`,
      method: "get",
      params: {
        project: project._id,
        search: search ? search : undefined,
        offset,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (offset === 0) {
      dispatch(getClientsList(response.data));
    } else {
      dispatch(addClientsList(response.data));
    }
    if (offset !== 0 && response.data.length <= 19) {
      setHasMore(false);
    }
    setLoadingMore(false);
  };

  //FirstRender
  useEffect(() => {
    getClients();
    setFirstRender(false);
  }, [project]);

  //IfHasMore && Bounce Search
  useEffect(() => {
    if (hasMore && !search && !firstRender) {
      getClients();
    }
    let delay = setTimeout(() => {
      if (search) {
        setOffset(0);
        setHasMore(true);
        getClients();
      }
    }, 250);
    return () => {
      clearTimeout(delay);
    };
  }, [offset, search]);

  //ScrollDetector
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (isAtBottom && hasMore && !loadingMore) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  return (
    <div className="w-full fade-in-left">
      {/*    Actions  */}
      <div className="absolute bottom-2 flex justify-center w-full">
        <div
          className={`bg-lightbgunder dark:bg-darkbgprimary backdrop-blur-md bg-opacity-50 dark:bg-opacity-50 z-30 py-4 px-3 rounded-md shadow-lg transition-all duration-200`}
        >
          {/* Searcher */}
          <div className="flex justify-end tablet:justify-center gap-1 mobilXL:gap-2 items-center">
            <div className=" bg-lightbgprimary dark:text-textdarkprimary text-textlightprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
              <input
                className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                type="text"
                name="search"
                id="search"
                placeholder="Buscar nombre, tipo, id de orden..."
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
            <button
              onClick={() => dispatch(open("addClient"))}
              className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbgunder dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {clients?.length !== 0 ? (
        <>
          <ul
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-col gap-1 h-[calc(100vh-180px)] tablet:h-[calc(100vh-205px)] overflow-auto scrollbar-none"
          >
            {clients?.map((client: any) => {
              return (
                <li key={client._id}>
                  <ClientTableBody roleProject={roleProject} client={client} />
                </li>
              );
            })}
            {loadingMore && (
              <div className="grid place-content-center my-5 w-full">
                <Spinner />
              </div>
            )}
          </ul>
        </>
      ) : (
        <div className="h-[calc(100dvh-243px)] tablet:h-[calc(100dvh-269px)] flex flex-col items-center mt-16 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
          <img
            className="w-16 laptop:w-28 invert dark:invert-0"
            src={clientsIcon}
            alt=""
          />
          <h3>No hay clientes registrados.</h3>
        </div>
      )}
    </div>
  );
}

export default Clients;
