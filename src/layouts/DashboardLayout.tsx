//Dependecies
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
//Types
import { ProjectType } from "../types/ProjectTypes";
import { UserType } from "../types/UserTypes";
import { open } from "../redux/modalsReducer";

function DashboardLayout() {
    const dispatch = useDispatch();
    const location = useLocation();
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

    return (
        <div className=" fade-in-left">
            {project ? (
                <div className="w-full">
                    {/* Dashboard Header */}
                    <div className="relative w-full text-center">
                        {/* Dashboard Banners */}
                        <div className="absolute p-2 right-3">
                            <img
                                className="w-8 tablet:w-10 object-contain rounded-full"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/projects/logos/${project.logo_url}`}
                                alt=""
                            />
                        </div>
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
                            <div className="flex items-center gap-1">
                                <h2
                                    style={{ color: `${project.color_one}` }}
                                    className="text-sm font-semibold"
                                >
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
                            <div className="flex gap-4">
                                {/*  Link Gasto */}
                                <button
                                    onClick={() => dispatch(open("spentModal"))}
                                    // onClick={() =>
                                    //     generateModal(ProfileItemModal)
                                    // }
                                    className={`bg-lightbuttonprimary dark:bg-darkbuttonringprimary 
                                    hover:dark:bg-red-950 transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md`}
                                >
                                    <img
                                        className="w-5 invert dark:invert-0"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/gasto-icon.png`}
                                        alt=""
                                    />
                                </button>

                                {/*  Link Venta */}
                                <Link
                                    to={"/venta"}
                                    style={{ background: project.color_one }}
                                    className={` ${
                                        location.pathname === "/venta"
                                            ? "bg-opacity-100"
                                            : "bg-opacity-50"
                                    }  hover:bg-opacity-100 transition-color duration-200 px-3 tablet:px-5 py-2 rounded-md `}
                                >
                                    <img
                                        className="w-5 invert dark:invert-0"
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
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-6 laptop:w-8 invert dark:invert-0"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/dashboard-icon.png`}
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
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/nobox-icon.png`}
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
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/services-icon.png`}
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
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/clients-icon.png`}
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
                                            src={`${
                                                import.meta.env
                                                    .VITE_SUPABASE_BUCKET_URL
                                            }/noboss/icons/diary-icon.png`}
                                            alt=""
                                        />
                                    </Link>
                                )}
                                {/* Team */}
                                <Link
                                    to={"/equipo"}
                                    className={`${
                                        location.pathname === "equipo" &&
                                        "bg-lightbuttonprimary dark:bg-darkbgunder"
                                    } hover:bg-lightbuttonprimary hover:dark:bg-darkbgunder  duration-200 transition-colors flex justify-center gap-3 font-semibold text-base w-full py-4 px-4 rounded-s-sm`}
                                >
                                    <img
                                        className="w-9 laptop:w-11 invert dark:invert-0"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/noboss/icons/team-icon.png`}
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
                // Sin Proyecto Seleccionado
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
