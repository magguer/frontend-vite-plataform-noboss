// Dependencies
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Routes
const Login = lazy(() => import("./routes/auth/Login"));
const Market = lazy(() => import("./routes/market/Market"));
const Profile = lazy(() => import("./routes/user/Profile"));
const Explorer = lazy(() => import("./routes/explorer/Explore"));
const ExploreLayout = lazy(() => import("./layouts/ExploreLayout"));
const Summary = lazy(() => import("./routes/project/Summary/Summary"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Inventory = lazy(() => import("./routes/project/Inventory/Inventory"));
const AddItemInventory = lazy(
    () => import("./routes/project/Inventory/AddItemInventory")
);
const Clients = lazy(() => import("./routes/project/Clients/Clients"));
const Diary = lazy(() => import("./routes/project/Diary/Diary"));
const Team = lazy(() => import("./routes/project/Team/Team"));
const Signin = lazy(() => import("./routes/auth/Signin"));
const Services = lazy(() => import("./routes/project/Services/Services"));
const Sale = lazy(() => import("./routes/project/Sale/Sale"));
const Movements = lazy(() => import("./routes/project/Movements/Movements"));
const ProjectConfig = lazy(
    () => import("./routes/project/Project/ProjectConfig")
);
import Error from "./routes/Error";
/* import Login from "./routes/auth/Login"; */
/* import Market from "./routes/market/Market"; */
/* import Profile from "./routes/user/Profile"; */
/* import Explorer from "./routes/explorer/Explore"; */
/* import ExploreLayout from "./layouts/ExploreLayout"; */
/* import Summary from "./routes/project/Summary/Summary"; */
/* import DashboardLayout from "./layouts/DashboardLayout"; */
/* import Inventory from "./routes/project/Inventory/Inventory"; */
/* import AddItemInventory from "./routes/project/Inventory/AddItemInventory"; */
/* import Clients from "./routes/project/Clients/Clients"; */
/* import Diary from "./routes/project/Diary/Diary"; */
/* import Team from "./routes/project/Team/Team"; */
/* import Signin from "./routes/auth/Signin"; */
/* import Services from "./routes/project/Services/Services"; */
/* import Sale from "./routes/project/Sale/Sale"; */
/* import Movements from "./routes/project/Movements/Movements"; */
/* import ProjectConfig from "./routes/project/Project/ProjectConfig"; */

// Components
import Modals from "./components/general-partials/Modals";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ProjectsLayout from "./layouts/ProjectsLayout";
import BoxLayout from "./layouts/BoxLayout";
import NoAuthLayout from "./layouts/NoAuthLayout";

// Hooks
import AuthRequire from "./hooks/AuthRequire";
import NoAuthRequire from "./hooks/NoAuthRequire";

// CSS
import "./App.css";
import "./animations/animations.css";

function App() {
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    return (
        <div>
            <Modals />
            <Routes>
                <Route element={<NoAuthRequire />}>
                    <Route element={<NoAuthLayout />}>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/signin"} element={<Signin />} />
                    </Route>
                </Route>
                <Route element={<MainLayout />}>
                    <Route element={<AuthRequire />}>
                        <Route element={<ProjectsLayout />}>
                            <Route element={<DashboardLayout />}>
                                <Route
                                    path={"/resumen"}
                                    element={<Summary />}
                                />
                                <Route path={"*"} element={<Summary />} />
                                <Route
                                    path={"/inventario"}
                                    element={<Inventory />}
                                />
                                <Route
                                    path="/inventario/agregar"
                                    element={<AddItemInventory />}
                                />

                                <Route
                                    path={"/servicios"}
                                    element={<Services />}
                                />
                                <Route
                                    path={"/clientes"}
                                    element={<Clients />}
                                />

                                <Route path={"/agenda"} element={<Diary />} />
                                <Route
                                    path={"/movimientos"}
                                    element={<Movements />}
                                />
                                <Route path={"/equipo"} element={<Team />} />

                                <Route path={"/venta"} element={<Sale />} />
                            </Route>

                            <Route
                                path={"/proyecto"}
                                element={<ProjectConfig />}
                            />
                            <Route path={"/market"} element={<Market />} />
                        </Route>
                        <Route element={<ExploreLayout />}>
                            <Route path={"/explore"} element={<Explorer />} />
                        </Route>
                        <Route element={<BoxLayout />}>
                            <Route path={"/profile"} element={<Profile />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
