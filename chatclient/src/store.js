import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./features/Userslice";
import Api from "./services/Api";

//persist our store
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux";
import { persistReducer} from 'redux-persist'
import thunk from "redux-thunk";
//reducers
const reducer = combineReducers({
    user: Userslice,
    [Api.reducerPath]: Api.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [Api.reducerPath]
};

//persist our store

const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store 

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, Api.middleware],
});

export default store;