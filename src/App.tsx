// Imports React Router
import { Routes, Route } from "react-router-dom";

// Routes
import Login from "./routes/auth/Login";
import Dashboard from "./routes/project/Dashboard";
import Market from "./routes/market/Market";
import Profile from "./routes/user/Profile";
import Error from "./routes/Error";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ProjectsLayout from "./layouts/ProjectsLayout";

// Hooks
import AuthRequire from "./hooks/AuthRequire";
import NoAuthRequire from "./hooks/NoAuthRequire";

// CSS
import "./App.css";
import BoxLayout from "./layouts/BoxLayout";
import Explorer from "./routes/explorer/Explore";
import ExploreLayout from "./layouts/ExploreLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<MainLayout />}>
                    <Route element={<NoAuthRequire />}>
                        <Route path={"/login"} element={<Login />} />
                    </Route>
                    <Route element={<AuthRequire />}>
                        <Route element={<ProjectsLayout />}>
                            <Route
                                path={"/dashboard"}
                                element={<Dashboard />}
                            />
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
