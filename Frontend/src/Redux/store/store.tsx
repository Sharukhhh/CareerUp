import {  configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/slice';
import notificationReducer from '../slices/notificationSlice';
import themeReducer from '../slices/theme';
import { persistReducer , persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'user',
    storage
}

const themePersistConfig = {
    key : 'theme',
    storage
}

const notifcationConfig = {
    key : 'notification',
    storage
}

const persistUserReducer = persistReducer(persistConfig , userReducer);
const persistThemeReducer = persistReducer(themePersistConfig , themeReducer);
const persistNotificationReducer = persistReducer(notifcationConfig , notificationReducer);


const store = configureStore({
    reducer : {
        user : persistUserReducer,
        theme : persistThemeReducer,
        notification : persistNotificationReducer
    } , 
})   

const persistor = persistStore(store);


export {store , persistor};