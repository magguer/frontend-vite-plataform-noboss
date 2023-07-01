// Dependencies
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

// Routes
const Login = lazy(() => import("./routes/auth/Login"));
const Market = lazy(() => import("./routes/market/Market"));
const Profile = lazy(() => import("./routes/user/Profile"));
const Explorer = lazy(() => import("./routes/explorer/Explore"));
const ExploreLayout = lazy(() => import("./layouts/ExploreLayout"));
const Summary = lazy(() => import("./routes/project/Summary/Summary"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Inventory = lazy(() => import("./routes/project/Inventory/Inventory"));
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
import ProductOn from "./hooks/ProductOn";
import ServicesOn from "./hooks/ServicesOn";

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
                <Route path={"/resumen"} element={<Summary />} />
                <Route path={"*"} element={<Summary />} />
                <Route element={<ProductOn />}>
                  <Route path={"/inventario"} element={<Inventory />} />
                  <Route path={"/venta"} element={<Sale />} />
                </Route>
                <Route element={<ServicesOn />}>
                  <Route path={"/servicios"} element={<Services />} />
                </Route>
                <Route path={"/clientes"} element={<Clients />} />

                <Route path={"/agenda"} element={<Diary />} />
                <Route path={"/movimientos"} element={<Movements />} />
                <Route path={"/equipo"} element={<Team />} />
              </Route>

              <Route path={"/proyecto"} element={<ProjectConfig />} />
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
