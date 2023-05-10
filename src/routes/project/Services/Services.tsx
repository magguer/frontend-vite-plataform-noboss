import { useState } from "react";
import ServiceTableBody from "../../../components/project/Services/ServiceTableBody";
import servicesIcon from "../../../assets/images/icons/services-icon.png";

function Services() {
    const [search, setSearch] = useState("");
    const services = [];
    return (
        <div>
            {" "}
            <div className="w-full fade-in-left">
                {/* Searcher */}
                <div className="flex pb-3 justify-end tablet:justify-center mt-2 gap-1 mobilXL:gap-2 items-center">
                    <div className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary hover:bg-lightbgunder  focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                        <input
                            className="text-xs tablet:text-sm m-1 w-36 mobilL:w-52 mobilXL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 "
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Buscar servicio, categoría, sku, ..."
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
                        /*   onClick={() => dispatch(open("addClient"))} */
                        className="dark:text-textdarkprimary text-textlightprimary bg-lightbgprimary  hover:bg-lightbgunder focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:hover:bg-darkbuttonprimary dark:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary h-full px-3 tablet:px-4 py-1 text-lg rounded-lg"
                    >
                        +
                    </button>
                </div>
                {services?.length !== 0 ? (
                    <div className="flex flex-col gap-1  h-[calc(100vh-250px)] tablet:h-[calc(100vh-285px)] overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgsecondary scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded pr-2">
                        {services?.map((service) => {
                            return <ServiceTableBody service={service} />;
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center mt-10 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                        <img
                            className="w-20 laptop:w-32 invert dark:invert-0"
                            src={servicesIcon}
                            alt=""
                        />
                        <h3>No hay servicios registrados.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Services;
