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
import { getClientsList } from "../../../redux/clientsReducer";
//Assets
import clientsIcon from "../../../assets/images/icons/clients-icon.png";
import searchIcon from "../../../assets/images/icons/search-icon.png";

function Clients() {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const clients = useSelector((state: ClientsType) => state.clients);
    const [search, setSearch] = useState("");
    const [bottom, setBottom] = useState<boolean>(false);

    useEffect(() => {
        const getClients = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/clients/?project=${
                    project._id
                }`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch(getClientsList(response.data));
        };
        getClients();
    }, [project]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isAtTop = !isAtBottom;

        if (isAtBottom) {
            setBottom(true);
            // Realiza alguna acción cuando el componente llegue al fondo.
        }

        if (isAtTop) {
            setBottom(false);
            // Realiza alguna acción cuando el componente se suba del fondo por 1 píxel.
        }
    };

    return (
        <div className="w-full fade-in-left">
            {/*    Actions  */}
            <div className="absolute bottom-3 flex justify-center w-full">
                <div
                    className={`${
                        bottom ? "hidden" : "z-30"
                    } bg-lightbgunder dark:bg-darkbgprimary z-30 py-4 px-3 rounded-md shadow-lg transition-all duration-200`}
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
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex flex-col gap-1 h-[calc(100vh-200px)] tablet:h-[calc(100vh-230px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2"
                    >
                        {clients?.map((client: any) => {
                            return (
                                <div key={client._id}>
                                    <ClientTableBody client={client} />
                                </div>
                            );
                        })}
                    </div>
                    <p
                        style={{
                            color: project.color_one,
                            opacity: "80%",
                        }}
                        className="absolute w-full text-[10px] font-light mt-[13px] tablet:mt-[11px] text-end"
                    >
                        {clients?.length} cliente/s
                    </p>
                </>
            ) : (
                <div className="h-[calc(100vh-250px)] tablet:h-[calc(100vh-295px)] flex flex-col items-center mt-16 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
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
