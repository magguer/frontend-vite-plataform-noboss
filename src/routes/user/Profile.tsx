import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../types/UserTypes";
import { logout } from "../../redux/userReducer";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/images/icons/logout-icon.png";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: UserType) => state.user);

    const handleLogout = () => {
        dispatch(logout(null));
        navigate("/login");
    };

    return (
        <div className="fade-in-left w-full dark:text-textdarkprimary text-textlightprimary">
            <div className="w-full text-start text-sm">
                <div className="flex items-staer gap-2 w-full justify-center">
                    <h3>Username: </h3>
                    <h3>{user.username}</h3>
                </div>
                <div className="flex items-center gap-2 w-full justify-center">
                    <h3>Email: </h3>
                    <h3>{user.email}</h3>
                </div>
                <div className="w-full flex justify-center mt-2">
                    <button
                        onClick={handleLogout}
                        className="bg-lightbuttonhoverprimary dark:bg-darkbuttonhoverprimary transition-all duration-200 hover:bg-red-800 dark:hover:bg-red-950 px-4 py-3 flex items-center justify-center gap-3 rounded"
                    >
                        <img
                            className="w-4 h-5 object-contain dark:invert"
                            src={logoutIcon}
                            alt="logout-icon"
                        />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
