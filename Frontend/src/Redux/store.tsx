import { configureStore } from "@reduxjs/toolkit";
import useReducer from './slice';

export const store = configureStore({
    reducer : {
        userInfo : useReducer
    }
})