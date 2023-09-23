import { createSlice , PayloadAction  } from "@reduxjs/toolkit";

//structure of user data
export interface UserCred {
    username : String,
    useremail : String,
    role : String , 
    userId : String,
}

//structure of state 
export interface UserState{
    userCred : UserCred | null;
}

const initialState : UserState = {
    userCred : null,
}


export const userSlice = createSlice({
    name : 'user',
    initialState , 
    reducers : {


        setUserInfo : (state , action: PayloadAction <UserCred | null>) => {
            state.userCred = action.payload;
        }, 

        logout : (state) => {
            state.userCred = null;
            localStorage.removeItem('userToken');
        },
    }
})

export const { setUserInfo, logout} = userSlice.actions;
export default userSlice.reducer;