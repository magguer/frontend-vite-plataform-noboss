//Dependencies
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
//Components
import Spinner from "../components/general-partials/Spinner";
const ExploreProjectsList = lazy(
    () => import("../components/general-partials/ExploreProjectsList")
);

function ExploreLayout() {
    return (
        <div className="flex px-2 mobilXL:px-5 pt-5 gap-6 justify-center fade-in-right">
            <div className="w-full tablet:w-9/12 dark:text-textdarkprimary text-textlightprimary  bg-lightbgprimary dark:bg-darkbgprimary p-4 rounded-lg h-[calc(100vh-180px)] tablet:h-[calc(100vh-95px)]">
                <Outlet />
            </div>
            <div className="hidden tablet:block w-3/12">
                <Suspense
                    fallback={
                        <div className="grid place-content-center h-screen w-screen">
                            <Spinner />
                        </div>
                    }
                >
                    <ExploreProjectsList />
                </Suspense>
            </div>
        </div>
    );
}

export default ExploreLayout;
