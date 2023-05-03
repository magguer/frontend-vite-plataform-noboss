import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../types/UserTypes";

function AuthRequire() {
    const user = useSelector((state: UserType) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
}

export default AuthRequire;
