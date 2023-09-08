import { createSlice , PayloadAction  } from "@reduxjs/toolkit";

//structure of user data
export interface UserCred {
    name : String,
    email : String,
    role : String , 
    password : String
}

//structure of state 
export interface UserState{
    userCred : UserCred | null;
}

const initialState : UserState = {
    userCred : null
}


export const userSlice = createSlice({
    name : 'user',
    initialState , 
    reducers : {


        setUserInfo : (state , action: PayloadAction <UserCred | null>) => {
            state.userCred = action.payload
        }, 

        logout : (state) => {
            state.userCred = null;
        },
    }
})

export const { setUserInfo, logout} = userSlice.actions;
export default userSlice.reducer;