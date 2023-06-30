import { Outlet } from "react-router-dom";
import Header from "../components/general-partials/Header";
import MobilNavBar from "../components/general-partials/MobilNavBar";
import { Suspense } from "react";
import Spinner from "../components/general-partials/Spinner";

function MainLayout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Suspense
          fallback={
            <div className="grid place-content-center h-[85dvh] w-screen">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <div>
        <MobilNavBar />
      </div>
    </div>
  );
}

export default MainLayout;
