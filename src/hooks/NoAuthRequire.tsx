import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../types/UserTypes";

function NoAuthRequire() {
    const user = useSelector((state: UserType) => state.user);

    if (user) {
        return <Navigate to="/resumen" />;
    } else {
        return <Outlet />;
    }
}

export default NoAuthRequire;
