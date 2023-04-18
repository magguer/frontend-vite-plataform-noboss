import { Outlet } from "react-router-dom";
import Header from "../components/partials/Header";

function MainLayout() {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="pt-[60px]">
                <Outlet />
            </div>
        </>
    );
}

export default MainLayout;
