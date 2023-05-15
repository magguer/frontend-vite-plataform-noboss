//Dependecies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
//Types
import { ProjectType } from "../types/ProjectTypes";
import { UserType } from "../types/UserTypes";
import { open } from "../redux/modalsReducer";
//Assets
import dashboardIcon from "../assets/images/icons/dashboard-icon.png";
import teamIcon from "../assets/images/icons/team-icon.png";
import clientsIcon from "../assets/images/icons/clients-icon.png";
import noboxIcon from "../assets/images/icons/nobox-icon.png";
import diaryIcon from "../assets/images/icons/diary-icon.png";
import movementsIcon from "../assets/images/icons/movements-icon.png";
import servicesIcon from "../assets/images/icons/services-icon.png";
import saleIcon from "../assets/images/icons/sale-icon.png";
import spentIcon from "../assets/images/icons/spent-icon.png";
import notificationsIcon from "../assets/images/icons/notifications-icon.png";
import NotificationsBody from "../components/general-partials/NotificationsBody";

function DashboardLayout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [showNotificatiosnBody, setShowNotificationsBody] =
        useState<boolean>(false);
    const [roleUser, setRoleUser] = useState<any>({});
    const project = useSelector((state: ProjectType) => state.project);
    const user = useSelector((state: UserType) => state.user);

    useEffect(() => {
        if (project) {
            const member: any = project.members.find(
                (member: any) => member.member.username === user.username
            );
            setRoleUser(member.role);
        }
    }, [project]);

    const handleShowNotificationsBody = () => {
        setShowNotificationsBody(!showNotificatiosnBody);
    };

    return (
        <div className="fade-in-left">
            {showNotificatiosnBody && (
                <div className="absolute z-50 right-10 top-[105px]">
                    <NotificationsBody project={project} />
                </div>
            )}
            {project ? (
                // With Project
                <div className="w-full">
                    {/* Dashboard Header */}
                    <div className="relative w-full text-center">
                        {/* Dashboard Banners */}
                        <Link
                            style={{ backgroundColor: project.color_one }}
                            to={"/proyecto"}
                            className="absolute right-3 tablet:right-4 top-1 tablet:top-[4px] rounded-full p-0.5"
                        >
                            <img
                                className="w-8 tablet:w-12 object-contain rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                        </Link>
                        <div className="w-full">
                            {project.banners_url[0] ? (
                                <div className="flex justify-center">
                                    <img
                                        className="w-full h-[45px] tablet:h-[60px] object-cover rounded-t"
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
                                        className="w-full h-[45px] tablet:h-[60px] object-cover rounded-t"
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
                    <div className="px-2 mobilXL:px-5 mt-2">
                        <div className="hidden tablet:flex items-baseline justify-between w-full">
                            {/* Role / Path */}
                            <div className="flex items-center gap-1">
                                <h2
                                    style={{ color: `${project.color_one}` }}
                                    className="text-sm font-semibold"
                                >
                                    {roleUser?.name}
                                </h2>
                                <h2 className="hidden dark:text-textdarkprimary text-textlightprimary tablet:block text-sm font-medium">
                                    ○{" "}
                                    {location.pathname
                                        .slice(1)
                                        .charAt(0)
                                        .toUpperCase() +
                                        location.pathname.slice(2)}
                                </h2>
                            </div>
                            {/* Gasto / Venta / Notificaciones */}
                            <div className="flex gap-4">
                                {/*   Gasto */}
                                <button
                                    onClick={() => dispatch(open("spentModal"))}
                                    className={`bg-lightbuttonprimary dark:bg-darkbuttonringprimary 
                                    hover:dark:bg-red-950 transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md`}
                                >
                                    <img
                                        className="w-5 invert dark:invert-0"
                                        src={spentIcon}
                                        alt=""
                                    />
                                </button>

                                {/*   Venta */}
                                <Link
                                    to={"/venta"}
                                    className={`bg-lightbuttonprimary dark:bg-darkbuttonringprimary 
                                    hover:dark:bg-secondarycolor transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md`}
                                >
                                    <img
                                        className="w-5 invert dark:invert-0"
                                        src={saleIcon}
                                        alt=""
                                    />
                                </Link>

                                {/*  Notificaciones */}
                                <button
                                    onClick={handleShowNotificationsBody}
                                    style={{ background: project.color_one }}
                                    className={` ${
                                        location.pathname === "/venta"
                                            ? "bg-opacity-100"
                                            : "bg-opacity-50"
                                    }  hover:bg-opacity-100 transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md `}
                                >
                                    <img
                                        className="w-5 mt-0.5 dark:invert"
                                        src={notificationsIcon}
                                        alt=""
                                    />
                                </button>
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
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-6 laptop:w-8 invert dark:invert-0"
                                        src={dashboardIcon}
                                        alt=""
                                    />
                                </Link>
                                {/* Inventario */}
                                {project.products_on && (
                                    <Link
                                        to={"/inventario"}
                                        className={`${
                                            location.pathname ===
                                                "/inventario" &&
                                            "bg-lightbuttonprimary dark:bg-darkbgunder"
                                        } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                    >
                                        <img
                                            className="w-6 laptop:w-8 invert dark:invert-0"
                                            src={noboxIcon}
                                            alt=""
                                        />
                                    </Link>
                                )}
                                {/* Servicios */}
                                {project.services_on && (
                                    <Link
                                        to={"/servicios"}
                                        className={`${
                                            location.pathname ===
                                                "/servicios" &&
                                            "bg-lightbuttonprimary dark:bg-darkbgunder"
                                        } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-3 px-4 rounded-s-sm`}
                                    >
                                        <img
                                            className="w-6 laptop:w-10 invert dark:invert-0"
                                            src={servicesIcon}
                                            alt=""
                                        />
                                    </Link>
                                )}
                                {/* Clientes */}
                                <Link
                                    to={"/clientes"}
                                    className={`${
                                        location.pathname === "/clientes" &&
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-5 laptop:w-7 invert dark:invert-0"
                                        src={clientsIcon}
                                        alt=""
                                    />
                                </Link>
                                {/* Agenda */}
                                {project.services_on && (
                                    <Link
                                        to={"/agenda"}
                                        className={`${
                                            location.pathname === "/agenda" &&
                                            "bg-lightbuttonprimary dark:bg-darkbgunder"
                                        } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                    >
                                        <img
                                            className="w-5 laptop:w-6 invert dark:invert-0"
                                            src={diaryIcon}
                                            alt=""
                                        />
                                    </Link>
                                )}
                                {/* Movimientos */}
                                <Link
                                    to={"/movimientos"}
                                    className={`${
                                        location.pathname === "/movimientos" &&
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-9 laptop:w-10 dark:invert"
                                        src={movementsIcon}
                                        alt=""
                                    />
                                </Link>
                                {/* Team */}
                                <Link
                                    to={"/equipo"}
                                    className={`${
                                        location.pathname === "equipo" &&
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-9 laptop:w-10 invert dark:invert-0"
                                        src={teamIcon}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="w-full bg-lightbuttonprimary dark:bg-darkbgunder rounded-e-sm p-2 h-[calc(100vh-180px)] tablet:h-[calc(100vh-215px)]">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Without Project
                <div className="w-full p-4 h-full">
                    <div className="w-full h-full grid justify-center text-center">
                        <div>
                            <h3>Dashboard</h3>
                            <h3 className="text-secondarycolor opacity-75 font-medium text-sm">
                                Selecciona, crea o accede a un proyecto.
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardLayout;
