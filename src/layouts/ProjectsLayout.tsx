import { Outlet } from "react-router-dom";
import YourProjectsList from "../components/partials/YourProjectsList";

function ProjectsLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 pt-5 gap-6 justify-center">
            <div className="hidden tablet:block">
                <YourProjectsList />
            </div>
            <div className="w-full laptop:w-9/12 h-full bg-darkbgprimary p-4 pb-8 rounded-lg">
                <Outlet />
            </div>
        </div>
    );
}

export default ProjectsLayout;
