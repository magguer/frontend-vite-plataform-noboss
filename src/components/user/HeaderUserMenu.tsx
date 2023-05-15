import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userReducer";
import { remove } from "../../redux/projectReducer";
//Assets
import userIcon from "../../assets/images/icons/user-icon.png";

type Props = {
    setShowHeaderUserMenu: Function;
    showHeaderUserMenu: boolean;
};

function HeaderUserMenu({ setShowHeaderUserMenu, showHeaderUserMenu }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowHeaderUserMenu(false);
        dispatch(logout(null));
        dispatch(remove(null));
        navigate("/login");
    };

    const handleOverMenu = () => {
        setShowHeaderUserMenu(false);
    };

    return (
        <>
            <div
                className={`${
                    showHeaderUserMenu ? "top-0" : "top-[-300px]"
                } transition-all duration-200 absolute bg-lightbgprimary dark:bg-darkbgprimary bg-opacity-95 pt-[80px] pb-5 w-[250px] right-[30px] z-30 shadow rounded text-textlightprimary dark:text-textdarkprimary`}
            >
                <div className="w-full text-center px-2 grid gap-2">
                    <Link
                        onClick={() => setShowHeaderUserMenu(false)}
                        to={"/profile"}
                        className="bg-lightbgsecondary hover:bg-lightbuttonringprimary dark:bg-darkbuttonhoverprimary flex justify-center items-center gap-3 transition-all duration-200  hover:dark:bg-darkbgprimary w-full py-3 font-medium"
                    >
                        <img
                            className="w-6 h-6 object-cover invert dark:invert-0"
                            src={userIcon}
                            alt=""
                        />{" "}
                        Perfil
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-lightbuttonhoverprimary dark:bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-red-800 dark:hover:bg-red-950 w-full py-3 font-medium"
                    >
                        Desconectar
                    </button>
                </div>
            </div>
        </>
    );
}

export default HeaderUserMenu;
