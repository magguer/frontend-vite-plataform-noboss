//Dependecies
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//Types
import ProjectTypes from "../../types/ProjectTypes";
import UserTypes from "../../types/UserTypes";
//Components
import Inventory from "../../components/project/Inventory";
import Clients from "../../components/project/Clients";
import Diary from "../../components/project/Diary";
import Summary from "../../components/project/Summary";
import Team from "../../components/project/Team";
import Sale from "../../components/project/Sale";
import Spent from "../../components/project/Spent";

function Dashboard() {
    const [showPanel, setShowPanel] = useState("Resumen");
    const [roleUser, setRoleUser] = useState(null);
    const project = useSelector((state: ProjectTypes) => state.project);
    const user = useSelector((state: UserTypes) => state.user);

    useEffect(() => {
        if (project) {
            const member = project.members.find(
                (member) => member.member.username === user.username
            );
            setRoleUser(member.role);
        }
    }, [project]);

    return (
        <>
            {project ? (
                <div className="w-full">
                    {/* Dashboard Header */}
                    <div className="relative w-full text-center">
                        {/* Dashboard Banners */}
                        <div className="absolute p-2 right-0">
                            <img
                                className="w-10 object-contain rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                        </div>
                        <div className="w-full">
                            {project.banners_url[0] !== "" ? (
                                <div className="flex justify-center">
                                    <img
                                        className="w-full h-[60px] object-cover rounded-t"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/projects/banners/${
                                            project.banners_url
                                        }`}
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <img
                                        className="w-full h-[60px] object-cover rounded-t"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/projects/banners/default-banner.png`}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-5 mt-2">
                        <div className="flex items-baseline justify-between w-full">
                            <div className="flex items-center gap-2">
                                <h2 className="text-secondarycolor font-semibold">
                                    {roleUser?.name}
                                </h2>
                                <h2 className="text-textterceary font-medium">
                                    ◉ {showPanel}
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowPanel("Gasto")}
                                    className={`${
                                        showPanel === "Gasto"
                                            ? "bg-red-950"
                                            : "bg-darkbuttonprimary"
                                    } hover:bg-red-950 transition-color duration-200 px-8 py-1 rounded`}
                                >
                                    <img
                                        className="w-5 rotate-90"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/gasto-icon.png`}
                                        alt=""
                                    />
                                </button>
                                <button
                                    onClick={() => setShowPanel("Venta")}
                                    className={`${
                                        showPanel === "Venta"
                                            ? "bg-secondarycolor"
                                            : "bg-darkbuttonprimary"
                                    } hover:bg-secondarycolor transition-color duration-200 px-8 py-1 rounded`}
                                >
                                    <img
                                        className="w-5"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/venta-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                        {/*  All Functions */}
                        <div className="flex w-full mt-2">
                            {/*   <div className="w-2/12">
                                <button className="h-full w-full grid justify-center items-center bg-darkbgsecondary hover:bg-darkbgunder duration-200 transition-colors font-semibold text-lg rounded">
                                    <h3>Gasto</h3>
                                    <img
                                        className="w-12"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/gasto-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>  */}
                            <div className="flex flex-col">
                                {/* Resumen */}
                                <button
                                    onClick={() => setShowPanel("Resumen")}
                                    className={`${
                                        showPanel === "Resumen" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    {/* <h3>Resumen</h3> */}
                                    <img
                                        className="w-8"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/dashboard-icon.png`}
                                        alt=""
                                    />
                                </button>
                                {/* Inventario */}
                                <button
                                    onClick={() =>
                                        setShowPanel("Productos/Servicios")
                                    }
                                    className={`${
                                        showPanel === "Productos/Servicios" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    {/*  <h3>Inventario</h3> */}
                                    <img
                                        className="w-8"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/nobox-icon.png`}
                                        alt=""
                                    />
                                </button>
                                {/* Clientes */}
                                <button
                                    onClick={() => setShowPanel("Clientes")}
                                    className={`${
                                        showPanel === "Clientes" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    {/* <h3 className="text-base">Clientes</h3> */}
                                    <img
                                        className="w-7"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/clients-icon.png`}
                                        alt=""
                                    />
                                </button>
                                {/* Agenda */}
                                <button
                                    onClick={() => setShowPanel("Agenda")}
                                    className={`${
                                        showPanel === "Agenda" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    {/*  <h3>Agenda</h3> */}
                                    <img
                                        className="w-6"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/diary-icon.png`}
                                        alt=""
                                    />
                                </button>

                                {/* Team */}
                                <button
                                    onClick={() => setShowPanel("Equipo")}
                                    className={`${
                                        showPanel === "Equipo" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    {/* <h3>Resumen</h3> */}
                                    <img
                                        className="w-11"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/team-icon.png`}
                                        alt=""
                                    />
                                </button>
                            </div>
                            <div className="w-full bg-darkbgunder rounded-e-sm min-h-[350px] p-2">
                                {showPanel === "Resumen" && <Summary />}
                                {showPanel === "Productos/Servicios" && (
                                    <Inventory />
                                )}
                                {showPanel === "Clientes" && <Clients />}
                                {showPanel === "Agenda" && <Diary />}
                                {showPanel === "Equipo" && <Team />}
                                {showPanel === "Venta" && <Sale />}
                                {showPanel === "Gasto" && <Spent />}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Sin Proyecto Seleccionado
                <div className="w-full p-4">
                    <div className="relative w-full grid justify-center text-center">
                        <div>
                            <h3 className="font-semibold">Dashboard</h3>
                            <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                                Selecciona, crea o accede a un proyecto.
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
