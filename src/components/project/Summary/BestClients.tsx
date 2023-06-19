//Dependecies
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//Redux
import { item } from "../../../redux/itemProfileReducer";
//Types
import { ProductsType } from "../../../types/ProductsType";
import { UserType } from "../../../types/UserTypes";
import { ProjectType } from "../../../types/ProjectTypes";
//Components
import Spinner from "../../general-partials/Spinner";
//Assets
import clientsIcon from "../../../assets/images/icons/clients-icon.png";
import { Client } from "../../../types/ClientTypes";

function BestClients() {
    const dispatch = useDispatch();
    const [clients, setClients] = useState<any>([]);
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);

    useEffect(() => {
        const getClients = async () => {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/clients/?project=${
                    project._id
                }&best=true`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setClients(response.data);
        };
        getClients();
    }, [project]);

    return (
        <div className="bg-lightbgprimary dark:bg-darkbgsecondary rounded w-full px-3 py-4 dark:text-textdarkprimary text-textlightprimary">
            <div className="flex items-center justify-between mx-1">
                <h3 className="text-sm">Clientes destacados</h3>
                <Link
                    to={"/clientes"}
                    className="bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgprimary hover:dark:bg-darkbgunder px-2 py-1 rounded duration-100 transition-colors"
                >
                    <img
                        className="w-5 invert dark:invert-0"
                        src={clientsIcon}
                        alt=""
                    />
                </Link>
            </div>

            <div className="mt-3 flex flex-col gap-1 h-auto max-h-[44vh] tablet:max-h-[40vh] laptop:max-h-[47vh]  overflow-auto scrollbar-thin scrollbar-thumb-lightbgsecondary dark:scrollbar-thumb-darkbgunder scrollbar-track-lightbgprimary dark:scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded">
                {clients.length !== 0 ? (
                    clients.map((client: Client, i: any) => {
                        return (
                            <li
                                key={client._id}
                                className="fade-in-left flex items-center text-xs tablet:text-sm bg-lightbgsecondary hover:bg-lightbgunder dark:bg-darkbgunder hover:dark:bg-darkbgsecondary cursor-pointer rounded px-2 py-1 transition-colors duration-150 z-40"
                            >
                                <button
                                    /*                  onClick={() => dispatch(item(product))} */
                                    className="flex w-full items-center pr-1"
                                >
                                    <div className="flex text-start">
                                        <h3 className="w-[80px] mobilL:w-[150px] text-textlightprimary dark:text-textdarkprimary truncate">
                                            {client.name}
                                        </h3>
                                    </div>
                                    <div className="flex text-center">
                                        <h3 className="w-[80px] mobilL:w-[150px] text-xs text-textlightterceary dark:text-textdarkterceary truncate">
                                            {client.type}
                                        </h3>
                                    </div>
                                    <div className="flex items-center w-full justify-end">
                                        <h3
                                            style={{ color: project.color_one }}
                                            className="w-[50px] mobilXL:w-[70px] text-xs text-center truncate"
                                        >
                                            {client.orders_quantity} orden/es
                                        </h3>
                                    </div>
                                </button>
                            </li>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center my-10 gap-5 text-xs dark:text-textdarkprimary text-textlightprimary  opacity-50">
                        <img
                            className="w-20 invert dark:invert-0"
                            src={clientsIcon}
                            alt=""
                        />
                        <h3>No hay clientes registrados.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BestClients;
