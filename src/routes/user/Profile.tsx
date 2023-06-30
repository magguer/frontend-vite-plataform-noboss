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
      {/* Perfil */}
      <div className="w-full grid mobilXL:flex justify-center items-center gap-5 text-sm">
        <div>
          <img
            className="m-auto w-20 h-20 mobilXL:w-28 mobilXL:h-28 rounded-full object-cover"
            src={`${import.meta.env.VITE_SUPABASE_BUCKET_URL}/users/avatars/${
              user.image_url !== "" ? user.image_url : ""
            }`}
            alt="user-image"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex gap-2 w-full bg-lightbgunder px-2 py-1 rounded">
            <h3>{user.username}</h3>
          </div>
          <div className="flex gap-2 w-full bg-lightbgunder px-2 py-1 rounded">
            <h3>{user.email}</h3>
          </div>
        </div>
      </div>
      {/* Botones Generales */}
      <div className="w-full flex justify-center mt-5">
        {/*   Cerrar Sesión */}
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
  );
}

export default Profile;
