import { Outlet } from "react-router-dom";
import ProjectsList from "../components/partials/ProjectsList";

function ExploreLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 pt-5 gap-6 justify-center">
            <div className="w-full laptop:w-9/12 h-full bg-darkbgprimary p-4 rounded-lg">
                <Outlet />
            </div>
            <div className="hidden tablet:block">
                <ProjectsList />
            </div>
        </div>
    );
}

export default ExploreLayout;
