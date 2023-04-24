//Dependecies
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
//Types
import ProjectTypes from "../types/ProjectTypes";
import UserTypes from "../types/UserTypes";

function DashboardLayout() {
    const location = useLocation();
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
                <div className="w-full fade-in-left">
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
                    <div className="px-2 mobilXL:px-5 mt-3">
                        <div className="flex items-baseline justify-between w-full">
                            <div className="flex items-center gap-1">
                                <h2 className="text-secondarycolor text-sm font-semibold">
                                    {roleUser?.name}
                                </h2>
                                <h2 className="hidden tablet:block text-textterceary text-sm font-medium">
                                    ○{" "}
                                    {location.pathname
                                        .slice(1)
                                        .charAt(0)
                                        .toUpperCase() +
                                        location.pathname.slice(2)}
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                {/*  Link Gasto */}
                                <Link
                                    to={"/gasto"}
                                    className={`${
                                        location.pathname === "/gasto"
                                            ? "bg-red-950"
                                            : "bg-darkbuttonprimary"
                                    } hover:bg-red-950 transition-color duration-200 px-3 tablet:px-8 py-1 rounded`}
                                >
                                    <img
                                        className="w-5"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/gasto-icon.png`}
                                        alt=""
                                    />
                                </Link>
                                {/*  Link Venta */}
                                <Link
                                    to={"/venta"}
                                    className={`${
                                        location.pathname === "/venta"
                                            ? "bg-secondarycolor"
                                            : "bg-darkbuttonprimary"
                                    } hover:bg-secondarycolor transition-color duration-200 px-3 tablet:px-8 py-1 rounded`}
                                >
                                    <img
                                        className="w-5"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/venta-icon.png`}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                        {/*  All Functions */}
                        <div className="flex w-full mt-2">
                            <div className="hidden tablet:flex flex-col">
                                {/* Resumen */}
                                <Link
                                    to={"/resumen"}
                                    className={`${
                                        location.pathname === "/resumen" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-6 laptop:w-8"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/dashboard-icon.png`}
                                        alt=""
                                    />
                                </Link>
                                {/* Inventario */}
                                <Link
                                    to={"/inventario"}
                                    className={`${
                                        location.pathname === "/inventario" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-6 laptop:w-8"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/nobox-icon.png`}
                                        alt=""
                                    />
                                </Link>
                                {/* Clientes */}
                                <Link
                                    to={"/clientes"}
                                    className={`${
                                        location.pathname === "/clientes" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-5 laptop:w-7"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/clients-icon.png`}
                                        alt=""
                                    />
                                </Link>
                                {/* Agenda */}
                                <Link
                                    to={"/agenda"}
                                    className={`${
                                        location.pathname === "/agenda" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-5 laptop:w-6"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/diary-icon.png`}
                                        alt=""
                                    />
                                </Link>
                                {/* Team */}
                                <Link
                                    to={"/equipo"}
                                    className={`${
                                        location.pathname === "equipo" &&
                                        "bg-darkbgunder"
                                    } hover:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-9 laptop:w-11"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/team-icon.png`}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="w-full bg-darkbgunder rounded-e-sm p-2 max-h-[58vh] laptop:max-h-[80vh]">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Sin Proyecto Seleccionado
                <div className="w-full p-4 h-full ">
                    <div className="w-full h-full grid justify-center text-center">
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

export default DashboardLayout;
