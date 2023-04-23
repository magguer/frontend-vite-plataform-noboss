import { Outlet } from "react-router-dom";
import Header from "../components/general-partials/Header";

function MainLayout() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
