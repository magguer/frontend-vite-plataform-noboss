import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../../../animations/animations.css";
import { ProjectType } from "../../../types/ProjectTypes";
import ClientTableBody from "../../../components/project/Clients/ClientTableBody";
import axios from "axios";
import { UserType } from "../../../types/UserTypes";
import { open } from "../../../redux/modalsReducer";
import { ClientsType } from "../../../types/ClientsType";
import { getClientsList } from "../../../redux/clientsReducer";

function Clients() {
    const dispatch = useDispatch();
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);
    const clients = useSelector((state: ClientsType) => state.clients);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getClients = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/client/?project=${
                    project.slug
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
    /* 
    if (project.user_clients && project.project_clients) {
        useEffect(() => {
            for (let userClient of project.user_clients) {
                setClients([...clients, userClient]);
            }
            for (let projectClient of project.project_clients) {
                setClients([...clients, projectClient]);
            }
        }, []);
    } */

    return (
        <div className="w-full fade-in-left">
            {/* Searcher */}
            <div className="flex pb-3 justify-end tablet:justify-center mt-2 gap-1 mobilXL:gap-2 items-center">
                <div className="text-white bg-lightbuttonhoverprimary hover:bg-lightbuttonsecondary  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                    <input
                        className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Buscar nombre, teléfono, ordenId..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                    onClick={() => dispatch(open("addClient"))}
                    className="text-textterceary bg-lightbuttonhoverprimary  hover:bg-lightbuttonsecondary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                >
                    +
                </button>
            </div>
            <div className="flex flex-col gap-1 h-auto max-h-[46vh] tablet:max-h-[40vh] laptop:max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                {clients?.map((client) => {
                    return <ClientTableBody client={client} />;
                })}
            </div>
        </div>
    );
}

export default Clients;
