import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

import {
    persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";

import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import productReducer from './productsReducer';
import movementReducer from './movementsReducer';
import clientReducer from './clientsReducer'
import itemProfileReducer from "./itemProfileReducer";
import modalsReducer from "./modalsReducer";


const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    products: productReducer,
    movements: movementReducer,
    clients: clientReducer,
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