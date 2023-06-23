import { Outlet } from "react-router-dom";
import YourProjectsList from "../components/general-partials/YourProjectsList";

function ProjectsLayout() {
  return (
    <div className="flex px-1 mobilXL:px-5 pt-3 gap-4 justify-center">
      <div className="hidden laptop:block w-auto">
        <YourProjectsList />
      </div>
      <div className="w-full h-[calc(100vh-110px)] tablet:h-[calc(100vh-80px)] bg-lightbgprimary dark:bg-darkbgprimary pb-5 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectsLayout;
