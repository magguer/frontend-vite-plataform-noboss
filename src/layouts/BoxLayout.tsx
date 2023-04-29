import { Outlet } from "react-router-dom";

function BoxLayout() {
    return (
        <>
            <div className="bg-lightbgprimary dark:bg-darkbgprimary m-5 rounded-lg px-2 mobilXL:px-5 laptop:px-10 py-5 ">
                <Outlet />
            </div>
        </>
    );
}

export default BoxLayout;
