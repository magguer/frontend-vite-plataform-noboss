import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

import {
    persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";

import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import productsReducer from './productsReducer';


const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    products: productsReducer
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