import { Link } from "react-router-dom";

type Props = {
    setShowBurguerMenu: Function;
    showBurguerMenu: boolean;
};

function BurguerMenu({ setShowBurguerMenu, showBurguerMenu }: Props) {
    return (
        <div
            className={`${
                showBurguerMenu ? "left-0" : "left-[-300px]"
            } w-[300px] flex flex-col bg-darkbgprimary bg-opacity-90 h-screen fixed text-center transition-all duration-200 pt-[80px] z-30`}
        >
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-darkbgprimary w-full py-8 font-medium"
            >
                ¿Qué puedo hacer en Noboss?
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-darkbgprimary w-full py-8 font-medium"
            >
                ¿Quiénes Somos?
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-darkbgprimary w-full py-8 font-medium"
            >
                Sobre los Planes Premium
            </Link>
            <Link
                onClick={() => setShowBurguerMenu(false)}
                to={"/profile"}
                className="bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-darkbgprimary w-full py-8 font-medium"
            >
                Únete al equipo
            </Link>
        </div>
    );
}

export default BurguerMenu;
