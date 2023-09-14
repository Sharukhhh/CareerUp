import { createSlice , PayloadAction  } from "@reduxjs/toolkit";

//structure of user data
export interface UserCred {
    username : String,
    useremail : String,
    role : String , 
    password : String
}

//structure of state 
export interface UserState{
    userCred : UserCred | null;
    isAuthenticated : boolean
}

const initialState : UserState = {
    userCred : null,
    isAuthenticated : false
}


export const userSlice = createSlice({
    name : 'user',
    initialState , 
    reducers : {


        setUserInfo : (state , action: PayloadAction <UserCred | null>) => {
            state.userCred = action.payload;
            state.isAuthenticated = Boolean(action.payload);          //sets to true if data exists
        }, 

        logout : (state) => {
            state.userCred = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setUserInfo, logout} = userSlice.actions;
export default userSlice.reducer;