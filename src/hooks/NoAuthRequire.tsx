import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserTypes from "../types/UserTypes";

function NoAuthRequire() {
    const user = useSelector((state: UserTypes) => state.user);

    if (user) {
        return <Navigate to="/dashboard" />;
    } else {
        return <Outlet />;
    }
}

export default NoAuthRequire;
