import { useSelector } from "react-redux";
import UserTypes from "../../types/UserTypes";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function MobilNavBar() {
    const user = useSelector((state: UserTypes) => state.user);
    const [showDashboardMenu, setShowDashboardMenu] = useState(false);
    const handleMenu = () => {
        setShowDashboardMenu(!showDashboardMenu);
    };
    return (
        <>
            <div
                className={`${
                    showDashboardMenu ? "bottom-[50px]" : "bottom-0"
                } fixed  tablet:hidden justify-center bg-darkbgprimary px-2 py-3 w-full flex transition-all duration-100`}
            >
                {/* Resumen */}
                <Link
                    to={"/resumen"}
                    onClick={handleMenu}
                    className={`flex justify-center w-full rounded-s-sm`}
                >
                    <img
                        className="w-6 object-contain"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/dashboard-icon.png`}
                        alt=""
                    />
                </Link>
                {/* Inventario */}
                <Link
                    to={"/inventario"}
                    onClick={handleMenu}
                    className={` flex justify-center w-full rounded-s-sm`}
                >
                    <img
                        className="w-6 object-contain"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/nobox-icon.png`}
                        alt=""
                    />
                </Link>
                {/* Clientes */}
                <Link
                    to={"/clientes"}
                    onClick={handleMenu}
                    className={` flex justify-center w-full rounded-s-sm`}
                >
                    <img
                        className="w-5 object-contain"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/clients-icon.png`}
                        alt=""
                    />
                </Link>
                {/* Agenda */}
                <Link
                    onClick={handleMenu}
                    to={"/agenda"}
                    className={`flex justify-center w-full rounded-s-sm`}
                >
                    <img
                        className="w-5 object-contain"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/diary-icon.png`}
                        alt=""
                    />
                </Link>
                {/* Team */}
                <Link
                    onClick={handleMenu}
                    to={"/equipo"}
                    className={`flex justify-center w-full rounded-s-sm`}
                >
                    <img
                        className="w-7 object-contain"
                        src={`${
                            import.meta.env.VITE_SUPABASE_BUCKET_URL
                        }/noboss/icons/team-icon.png`}
                        alt=""
                    />
                </Link>
            </div>
            <div className="fixed tablet:hidden bottom-0 bg-darkbgprimary h-[50px] w-full">
                {user ? (
                    <div className="flex aboslute h-full items-center w-full justify-around">
                        {/*   Button Market */}
                        <NavLink
                            className="py-2 px-3 transition-colors duration-150 rounded"
                            to="/market"
                        >
                            <img
                                className="w-5 object-contain"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/noboss/icons/market-icon-blanco.png`}
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
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/noboss/icons/home-icon-blanco.png`}
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
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/noboss/icons/market-icon-blanco.png`}
                                alt="market-icon"
                            />
                        </NavLink>

                        <NavLink to="/login">
                            <img
                                className="w-5 object-contain"
                                src={`${
                                    import.meta.env.VITE_SUPABASE_BUCKET_URL
                                }/noboss/icons/user-icon-blanco.png`}
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
