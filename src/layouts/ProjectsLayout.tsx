import { Outlet } from "react-router-dom";
import YourProjectsList from "../components/partials/YourProjectsList";

function ProjectsLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 pt-3 gap-4 justify-center">
            <div className="hidden tablet:block w-auto">
                <YourProjectsList />
            </div>
            <div className="laptop:w-full bg-darkbgprimary pb-5 rounded-lg h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default ProjectsLayout;
