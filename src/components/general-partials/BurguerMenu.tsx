import { Link } from "react-router-dom";

type Props = {
    setShowBurguerMenu: Function;
    showBurguerMenu: boolean;
};

function BurguerMenu({ setShowBurguerMenu, showBurguerMenu }: Props) {
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <div
            className={`${
                showBurguerMenu ? "left-0" : "left-[-300px]"
            } w-[300px] flex flex-col dark:bg-darkbgprimary bg-lightbgprimary bg-opacity-90 h-screen fixed text-center transition-all duration-200 pt-[80px] z-30`}
        >
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                ¿Qué puedo hacer en Noboss?
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                ¿Quiénes Somos?
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                Sobre los Planes Premium
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="dark:bg-darkbuttonhoverprimary bg-lightbgsecondary transition-all duration-200 dark:hover:bg-darkbgprimary hover:bg-lightbuttonhoversecodnary w-full py-8 font-medium"
            >
                Únete al equipo
            </Link>
            <div className="text-center mt-5">
                <button
                    className="dark:bg-darkbgsecondary dark:hover:bg-darkbgprimary bg-lightbgsecondary hover:bg-lightbuttonhoversecodnary px-3 py-2 rounded transition-all duration-200"
                    onClick={toggleDarkMode}
                >
                    Light/Dark
                </button>
            </div>
        </div>
    );
}

export default BurguerMenu;
