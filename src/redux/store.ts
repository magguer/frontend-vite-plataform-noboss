import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

import {
    persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";

import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import projectsReducer from "./projectsReducer";
import productReducer from './productsReducer';
import movementReducer from './movementsReducer';
import clientReducer from './clientsReducer'
import itemProfileReducer from "./itemProfileReducer";
import modalsReducer from "./modalsReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    projects: projectsReducer,
    products: productReducer,
    movements: movementReducer,
    clients: clientReducer,
    cart: cartReducer,
    itemProfile: itemProfileReducer,
    modals: modalsReducer
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);


export { persistor, store }