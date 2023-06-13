import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectType } from "../types/ProjectTypes";

function ProductOn() {
    const project = useSelector((state: ProjectType) => state.project);

    if (project.products_on) {
        return <Outlet />;
    } else {
        return <Navigate to="/resumen" />;
    }
}

export default ProductOn;
