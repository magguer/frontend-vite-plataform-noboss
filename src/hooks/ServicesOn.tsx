import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectType } from "../types/ProjectTypes";

function ServicesOn() {
    const project = useSelector((state: ProjectType) => state.project);

    if (project.services_on) {
        return <Outlet />;
    } else {
        return <Navigate to="/resumen" />;
    }
}

export default ServicesOn;
