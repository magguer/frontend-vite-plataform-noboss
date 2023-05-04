// Dependencies
import { Routes, Route } from "react-router-dom";

// Routes
import Login from "./routes/auth/Login";
import Market from "./routes/market/Market";
import Profile from "./routes/user/Profile";
import Error from "./routes/Error";
import Explorer from "./routes/explorer/Explore";
import ExploreLayout from "./layouts/ExploreLayout";
import Summary from "./routes/project/summary/Summary";
import DashboardLayout from "./layouts/DashboardLayout";
import Inventory from "./routes/project/inventory/Inventory";
import AddItemInventory from "./routes/project/inventory/AddItemInventory";
import EditItemInventory from "./routes/project/inventory/EditItemInventory";
import Clients from "./routes/project/clients/Clients";
import Diary from "./routes/project/diary/Diary";
import Team from "./routes/project/team/Team";
import Signin from "./routes/auth/Signin";
import Services from "./routes/project/services/Services";
import Sale from "./routes/project/sale/Sale";

// Components
import Modals from "./components/general-partials/Modals";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ProjectsLayout from "./layouts/ProjectsLayout";
import BoxLayout from "./layouts/BoxLayout";

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
                <Route element={<MainLayout />}>
                    <Route element={<NoAuthRequire />}>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/signin"} element={<Signin />} />
                    </Route>
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
                                    path="/inventario/editar/:slug"
                                    element={<EditItemInventory />}
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
                                <Route path={"/equipo"} element={<Team />} />
                                <Route path={"/venta"} element={<Sale />} />
                            </Route>
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
