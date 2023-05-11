//Dependencies
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
//Types
import { UserType } from "../../types/UserTypes";
//Components
import BurguerMenu from "./BurguerMenu";
import HeaderUserMenu from "../user/HeaderUserMenu";
//Assets
import burguerIcon from "../../assets/images/icons/burguer-icon.png";
import userIcon from "../../assets/images/icons/user-icon.png";
import marketIcon from "../../assets/images/icons/market-icon.png";
import homeIcon from "../../assets/images/icons/home-icon.png";
import exploreIcon from "../../assets/images/icons/explore-icon.png";
import nobossLogoSm from "../../assets/images/logos/noboss-logo-sm.png";
import nobossLogoXl from "../../assets/images/logos/noboss-logo-xl.png";

function Header() {
    const user = useSelector((state: UserType) => state.user);
    const [showHeaderUserMenu, setShowHeaderUserMenu] = useState(false);
    const [showBurguerMenu, setShowBurguerMenu] = useState(false);

    return (
        <>
            {user && (
                <HeaderUserMenu
                    setShowHeaderUserMenu={setShowHeaderUserMenu}
                    showHeaderUserMenu={showHeaderUserMenu}
                />
            )}

            <BurguerMenu
                setShowBurguerMenu={setShowBurguerMenu}
                showBurguerMenu={showBurguerMenu}
            />
            <div className="z-50 relative">
                <nav className="w-full flex top-0 justify-between items-center shadow-lg px-2 tablet:px-5 laptop:px-10 py-2 bg-lightbgprimary dark:bg-darkbgprimary text-white roundedb-md h-[40px] tablet:min-h-[60px] z-40">
                    <div className="flex items-center gap-1 mobilXL:gap-6">
                        {/* Burguer Menu */}
                        <button
                            onClick={() => setShowBurguerMenu(!showBurguerMenu)}
                            className="py-1 px-2 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary transition-colors duration-150 rounded"
                        >
                            <img
                                src={burguerIcon}
                                alt="burguer-icon"
                                className="w-6 invert dark:invert-0"
                            />
                        </button>
                        {/*  Logo Noboss */}
                        <Link to={user ? "/resumen" : "/"}>
                            <img
                                src={nobossLogoXl}
                                alt="logo-noboss"
                                className="hidden mobilXL:flex w-20 tablet:w-28 invert dark:invert-0"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                src={nobossLogoSm}
                                alt=""
                                className="ml-1 w-5 mobilXL:hidden invert dark:invert-0"
                            />
                        </Link>
                    </div>
                    {/* Buscador */}
                    <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary flex items-center transition-color duration-200 rounded-lg">
                        <input
                            className="text-xs tablet:text-sm tablet:m-1 w-36 mobilS:w-44 mobilL:w-72 laptop:w-96 py-1 px-2 bg-transparent border-transparent rounded-lg focus:ring-gray-600 focus:border-transparent placeholder:text-gray-700 dark:placeholder:text-gray-500 dark:text-textdarkprimary text-textlightprimary"
                            type="text"
                            name=""
                            id=""
                            placeholder="Buscar proyectos, rubros, zonas..."
                        />
                        <NavLink to="/explore">
                            <div className="text-white bg-lightbuttonprimary hover:bg-lightbuttonhoverprimary focus:ring-2 focus:outline-none focus:ring-lightbuttonringprimary  dark:bg-darkbuttonprimary dark:hover:bg-darkbuttonhoverprimary dark:focus:ring-darkbuttonringprimary rounded-lg p-0.5 tablet:p-1.5 m-1 cursor-pointer transition-color duration-200">
                                <img
                                    className="w-5 invert dark:invert-0"
                                    src={exploreIcon}
                                    alt=""
                                />
                            </div>
                        </NavLink>
                    </div>

                    {/* User Menu */}
                    <div className="hidden tablet:flex gap-3 laptop:gap-6 items-center">
                        {user ? (
                            <>
                                {/*   Button Market */}
                                <NavLink
                                    className="py-2 px-3 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary  transition-colors duration-150 rounded"
                                    to="/market"
                                >
                                    <img
                                        className="w-5 object-contain invert dark:invert-0"
                                        src={marketIcon}
                                        alt="market-icon"
                                    />
                                </NavLink>
                                {/*   Button Home */}
                                <NavLink
                                    className="py-2 px-3 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary  transition-colors duration-150 rounded"
                                    to="/resumen"
                                >
                                    <img
                                        className="w-5 object-contain invert dark:invert-0"
                                        src={homeIcon}
                                        alt="home-icon"
                                    />
                                </NavLink>
                                {/*   Button User Logued */}
                                <button
                                    onClick={() =>
                                        setShowHeaderUserMenu(
                                            !showHeaderUserMenu
                                        )
                                    }
                                    className="mt-[2px] mx-1"
                                >
                                    <img
                                        className="w-9 h-9 rounded-full object-cover"
                                        src={`${
                                            import.meta.env
                                                .VITE_SUPABASE_BUCKET_URL
                                        }/users/avatars/${
                                            user.image_url !== ""
                                                ? user.image_url
                                                : ""
                                        }`}
                                        alt="user-image"
                                    />
                                </button>
                            </>
                        ) : (
                            <>
                                {/*   Button Market */}

                                <NavLink
                                    className="py-2 px-3 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary  transition-colors duration-150 rounded"
                                    to="/market"
                                >
                                    <img
                                        className="w-5 object-contain invert dark:invert-0"
                                        src={marketIcon}
                                        alt="market-icon"
                                    />
                                </NavLink>

                                <NavLink
                                    className="py-2 px-3 bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbgsecondary hover:dark:bg-darkbuttonhoverprimary  transition-colors duration-150 rounded"
                                    to="/login"
                                >
                                    <img
                                        className="w-5 object-contain invert dark:invert-0"
                                        src={userIcon}
                                        alt="user-icon"
                                    />
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
