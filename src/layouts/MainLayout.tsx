import { Outlet } from "react-router-dom";
import Header from "../components/general-partials/Header";
import MobilNavBar from "../components/general-partials/MobilNavBar";

function MainLayout() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <MobilNavBar />
            </div>
        </div>
    );
}

export default MainLayout;
