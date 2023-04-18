import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userReducer";
import { remove } from "../../redux/projectReducer";

type Props = {
    setShowHeaderUserMenu: Function;
    showHeaderUserMenu: boolean;
};

function HeaderUserMenu({ setShowHeaderUserMenu, showHeaderUserMenu }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
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
                } transition-all duration-200 absolute bg-darkbgprimary pt-[80px] pb-5 w-[250px] right-[30px] z-30 shadow rounded`}
            >
                <div className="w-full text-center px-2 grid gap-2">
                    <Link
                        onClick={() => setShowHeaderUserMenu(false)}
                        to={"/profile"}
                        className="bg-darkbuttonhoverprimary hover:bg-transparent w-full py-3 font-medium"
                    >
                        Perfil
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-darkbuttonhoverprimary hover:bg-transparent w-full py-3 font-medium"
                    >
                        Desconectar
                    </button>
                </div>
            </div>
        </>
    );
}

export default HeaderUserMenu;
