import { Outlet } from "react-router-dom";
import ExploreProjectsList from "../components/general-partials/ExploreProjectsList";

function ExploreLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 pt-5 gap-6 justify-center fade-in-right">
            <div className="w-full tablet:w-9/12 dark:text-textdarkprimary text-textlightprimary  bg-lightbgprimary dark:bg-darkbgprimary p-4 rounded-lg h-[calc(100vh-180px)] tablet:h-[calc(100vh-95px)]">
                <Outlet />
            </div>
            <div className="hidden tablet:block w-3/12">
                <ExploreProjectsList />
            </div>
        </div>
    );
}

export default ExploreLayout;
