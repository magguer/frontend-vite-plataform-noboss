// Imports React Router
import { Routes, Route } from "react-router-dom";

// Routes
import Login from "./routes/auth/Login";
import Market from "./routes/market/Market";
import Profile from "./routes/user/Profile";
import Error from "./routes/Error";
import Explorer from "./routes/explorer/Explore";
import ExploreLayout from "./layouts/ExploreLayout";
import Summary from "./routes/project/Summary/Summary";
import DashboardLayout from "./layouts/DashboardLayout";
import Inventory from "./routes/project/Inventory/Inventory";
import AddItemInventory from "./routes/project/Inventory/AddItemInventory";
import EditItemInventory from "./routes/project/Inventory/EditItemInventory";
import ProfileItemInventory from "./routes/project/Inventory/ProfileItemInventory";
import Clients from "./routes/project/Clients/Clients";
import Diary from "./routes/project/Diary/Diary";
import Team from "./routes/project/Team/Team";
import Sale from "./routes/project/Sale/Sale";
import Spent from "./routes/project/Spent/Spent";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ProjectsLayout from "./layouts/ProjectsLayout";
import BoxLayout from "./layouts/BoxLayout";

// Hooks
import AuthRequire from "./hooks/AuthRequire";
import NoAuthRequire from "./hooks/NoAuthRequire";

// CSS
import "./App.css";

function App() {
    return (
        <div className="">
            <Routes>
                <Route element={<MainLayout />}>
                    <Route element={<NoAuthRequire />}>
                        <Route path={"/login"} element={<Login />} />
                    </Route>
                    <Route element={<AuthRequire />}>
                        <Route element={<ProjectsLayout />}>
                            <Route element={<DashboardLayout />}>
                                <Route
                                    path={"/resumen"}
                                    element={<Summary />}
                                />
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
                                    path="/inventario/:slug"
                                    element={<ProfileItemInventory />}
                                />
                                <Route
                                    path={"/clientes"}
                                    element={<Clients />}
                                />
                                <Route path={"/agenda"} element={<Diary />} />
                                <Route path={"/equipo"} element={<Team />} />
                                <Route path={"/venta"} element={<Sale />} />
                                <Route path={"/gasto"} element={<Spent />} />
                            </Route>
                            <Route path={"/market"} element={<Market />} />
                        </Route>
                        <Route element={<ExploreLayout />}>
                            <Route path={"/explore"} element={<Explorer />} />
                        </Route>
                        <Route element={<BoxLayout />}>
                            <Route path={"/profile"} element={<Profile />} />
                            <Route path={"*"} element={<Error />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
