//Dependencies
import { Outlet } from "react-router-dom";
import { useState } from "react";

//Assets
import sunicon from "../assets/images/icons/sun-icon.png";
import moonicon from "../assets/images/icons/moon-icon.png";

function NoAuthLayout() {
    const [theme, setTheme] = useState(false);
    const toggleDarkMode = () => {
        setTheme(document.documentElement.classList.toggle("dark"));
    };

    return (
        <div>
            <div className="absolute w-full flex justify-end py-2 px-2 z-50">
                <button
                    className="dark:bg-darkbgsecondary dark:hover:bg-darkbgprimary bg-lightbgsecondary hover:bg-lightbuttonhoversecodnary px-3 py-2 rounded transition-all duration-200"
                    onClick={toggleDarkMode}
                >
                    <img
                        className={`w-8 invert`}
                        src={theme ? sunicon : moonicon}
                        alt=""
                    />
                </button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default NoAuthLayout;
