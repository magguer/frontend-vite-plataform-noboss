//Assets
import sunicon from "../../assets/images/icons/sun-icon.png";
import moonicon from "../../assets/images/icons/moon-icon.png";
import { useEffect, useState } from "react";
type Props = {
    setShowBurguerMenu: Function;
    showBurguerMenu: boolean;
};

function BurguerMenu({ setShowBurguerMenu, showBurguerMenu }: Props) {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }, []);

    const toggleDarkMode = () => {
        setTheme(!theme);
        document.documentElement.classList.toggle("dark");
        setShowBurguerMenu(false);
    };

    return (
        <div
            className={`${
                showBurguerMenu ? "left-0" : "left-[-300px]"
            } w-[300px] flex flex-col dark:bg-darkbgprimary bg-lightbgprimary text-textlightprimary dark:text-textdarkprimary bg-opacity-90 h-screen fixed text-center transition-all duration-200 pt-[80px] z-30`}
        >
            <a
                target="_blank"
                onClick={() => setShowBurguerMenu(false)}
                href={`${import.meta.env.VITE_LOADING_URL}/#info`}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                ¿Qué puedo hacer en Noboss?
            </a>
            <a
                target="_blank"
                onClick={() => setShowBurguerMenu(false)}
                href={`${import.meta.env.VITE_LOADING_URL}/#sobre-nosotros`}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                ¿Quiénes Somos?
            </a>
            <a
                target="_blank"
                onClick={() => setShowBurguerMenu(false)}
                href={`${import.meta.env.VITE_LOADING_URL}/#planes`}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                Sobre los Planes Premium
            </a>
            {/*  <a
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                Únete al equipo
            </a> */}
            <div className="text-center mt-5 mb-2 flex flex-col justify-end h-full gap-5">
                <div>
                    <button
                        className="dark:bg-darkbgsecondary dark:hover:bg-darkbgprimary bg-lightbgsecondary hover:bg-lightbuttonhoversecodnary px-3 py-2 rounded transition-all duration-200 "
                        onClick={toggleDarkMode}
                    >
                        <img
                            className={`w-8 invert`}
                            src={theme ? sunicon : moonicon}
                            alt=""
                        />
                    </button>
                </div>
                <h3 className="text-[10px] font-light">
                    Hecho con 💚 desde Latam / Uy.
                </h3>
            </div>
        </div>
    );
}

export default BurguerMenu;
