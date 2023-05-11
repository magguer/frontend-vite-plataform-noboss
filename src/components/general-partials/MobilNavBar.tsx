//Dependencies
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
//Types
import { UserType } from "../../types/UserTypes";
//Assets
import userIcon from "../../assets/images/icons/user-icon.png";
import marketIcon from "../../assets/images/icons/market-icon.png";
import homeIcon from "../../assets/images/icons/home-icon.png";
import clientsIcon from "../../assets/images/icons/clients-icon.png";
import noboxIcon from "../../assets/images/icons/nobox-icon.png";
import servicesIcon from "../../assets/images/icons/services-icon.png";
import dashboardIcon from "../../assets/images/icons/dashboard-icon.png";
import teamIcon from "../../assets/images/icons/team-icon.png";
import diaryIcon from "../../assets/images/icons/diary-icon.png";
import { ProjectType } from "../../types/ProjectTypes";

function MobilNavBar() {
    const user = useSelector((state: UserType) => state.user);
    const project = useSelector((state: ProjectType) => state.project);
    const [showDashboardMenu, setShowDashboardMenu] = useState(false);
    const handleMenu = () => {
        setShowDashboardMenu(!showDashboardMenu);
    };
    return (
        <>
            <div className="w-full flex justify-center">
                <div
                    className={`${
                        showDashboardMenu ? "bottom-[53px]" : "bottom-0"
                    } fixed  tablet:hidden justify-center bg-lightbgsecondary dark:bg-darkbgprimary px-5 py-3 gap-8 flex transition-all duration-100 rounded`}
                >
                    {/* Resumen */}
                    <Link
                        to={"/resumen"}
                        onClick={handleMenu}
                        className={`flex justify-center w-full rounded-s-sm`}
                    >
                        <img
                            className="w-6 object-contain"
                            src={dashboardIcon}
                            alt=""
                        />
                    </Link>
                    {/* Inventario */}
                    {project.products_on && (
                        <Link
                            to={"/inventario"}
                            onClick={handleMenu}
                            className={` flex justify-center w-full rounded-s-sm`}
                        >
                            <img
                                className="w-6 object-contain"
                                src={noboxIcon}
                                alt=""
                            />
                        </Link>
                    )}
                    {/* Servicios */}
                    {project.services_on && (
                        <Link
                            to={"/servicios"}
                            onClick={handleMenu}
                            className={` flex justify-center w-full rounded-s-sm`}
                        >
                            <img
                                className="w-6 object-contain"
                                src={servicesIcon}
                                alt=""
                            />
                        </Link>
                    )}
                    {/* Clientes */}
                    <Link
                        to={"/clientes"}
                        onClick={handleMenu}
                        className={` flex justify-center w-full rounded-s-sm`}
                    >
                        <img
                            className="w-5 object-contain"
                            src={clientsIcon}
                            alt=""
                        />
                    </Link>
                    {/* Agenda */}
                    {project.services_on && (
                        <Link
                            onClick={handleMenu}
                            to={"/agenda"}
                            className={`flex justify-center w-full rounded-s-sm`}
                        >
                            <img
                                className="w-5 object-contain"
                                src={diaryIcon}
                                alt=""
                            />
                        </Link>
                    )}
                    {/* Team */}
                    <Link
                        onClick={handleMenu}
                        to={"/equipo"}
                        className={`flex justify-center w-full rounded-s-sm`}
                    >
                        <img
                            className="w-7 object-contain"
                            src={teamIcon}
                            alt=""
                        />
                    </Link>
                </div>
            </div>
            <div className="fixed tablet:hidden bottom-0 bg-lightbgsecondary dark:bg-darkbgprimary h-[50px] w-full">
                {user ? (
                    <div className="flex aboslute h-full items-center w-full justify-around">
                        {/*   Button Market */}
                        <NavLink
                            className="py-2 px-3 transition-colors duration-150 rounded"
                            to="/market"
                        >
                            <img
                                className="w-5 object-contain"
                                src={marketIcon}
                                alt="market-icon"
                            />
                        </NavLink>
                        {/*   Button Home */}
                        <button
                            onClick={handleMenu}
                            className="py-2 px-3  transition-colors duration-150 rounded"
                        >
                            <img
                                className="w-5 object-contain"
                                src={homeIcon}
                                alt="home-icon"
                            />
                        </button>
                        {/*   Button User Logued */}
                        <button className="mt-[2px] mx-1">
                            <img
                                className="w-7 h-7 rounded-full object-cover"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/users/avatars/${
                                    user.image_url !== "" ? user.image_url : ""
                                }`}
                                alt="user-image"
                            />
                        </button>
                    </div>
                ) : (
                    <div className="flex aboslute h-full items-center w-full justify-around">
                        {/*   Button Market */}

                        <NavLink to="/market">
                            <img
                                className="w-5 object-contain"
                                src={marketIcon}
                                alt="market-icon"
                            />
                        </NavLink>

                        <NavLink to="/login">
                            <img
                                className="w-5 object-contain"
                                src={userIcon}
                                alt="user-icon"
                            />
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );
}

export default MobilNavBar;
