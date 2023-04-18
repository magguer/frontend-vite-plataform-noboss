import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <div className="bg-lightbgunder text-white dark:bg-darkbgunder scrollbar h-screen w-full fixed">
                        <App />
                    </div>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
