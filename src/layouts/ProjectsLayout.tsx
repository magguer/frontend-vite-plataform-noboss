import { Outlet } from "react-router-dom";
import YourProjectsList from "../components/project/Project/YourProjectsList";

function ProjectsLayout() {
  return (
    <div className="flex px-1 mobilXL:px-3 pt-3 gap-4 justify-center">
      <div className="w-full h-[calc(100dvh-110px)] tablet:h-[calc(100dvh-80px)] bg-lightbgprimary dark:bg-darkbgprimary pb-5 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectsLayout;
