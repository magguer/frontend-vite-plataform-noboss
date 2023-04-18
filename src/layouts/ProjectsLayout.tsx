import { Outlet } from "react-router-dom";
import ProjectsList from "../components/partials/ProjectsList";

function ProjectsLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 laptop:px-8 pt-5 gap-6 justify-center">
            <div className="hidden tablet:block">
                <ProjectsList />
            </div>
            <div className="w-full laptop:w-9/12 h-full bg-darkbgprimary p-4 rounded-lg">
                <Outlet />
            </div>
        </div>
    );
}

export default ProjectsLayout;
