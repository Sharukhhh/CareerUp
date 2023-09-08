import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/slice';


const store = configureStore({
    reducer : {
        user : userReducer,
    } , 


})


export default store;