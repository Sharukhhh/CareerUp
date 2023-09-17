import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeState{
    theme : string
}

export interface SetThemepayload{
    theme: string
}   

const themeFromLocalStorage = window.localStorage.getItem('theme') ;
const initialTheme = themeFromLocalStorage ? JSON.parse(themeFromLocalStorage) : 'light';

const initialState : ThemeState = {
    theme : initialTheme 
};


const themeSlice = createSlice({
    name: 'theme',
    initialState , 
    reducers : {
        setTheme : (state, action : PayloadAction<SetThemepayload>) => {
            state.theme = action.payload.theme;
            localStorage.setItem('theme' , JSON.stringify(action.payload));
        }
    }
})

export default themeSlice.reducer;

export const {setTheme} = themeSlice.actions;