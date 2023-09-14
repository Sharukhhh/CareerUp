import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/slice';
import themeReducer from '../slices/theme';

const store = configureStore({
    reducer : {
        user : userReducer,
        theme : themeReducer
    } , 


})   


export default store;