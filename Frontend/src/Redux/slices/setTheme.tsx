import { Dispatch } from "@reduxjs/toolkit";
import { SetThemepayload , setTheme } from "./theme";

export function SetTheme(value : SetThemepayload ){
    return (dispatch : Dispatch) => {
        dispatch(setTheme(value));
    }
}   