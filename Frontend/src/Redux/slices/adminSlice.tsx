import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface AdminData {
    email : String;
    adminId : String;
}

export interface AdminState {
    adminData : AdminData | null;
}

const initialState : AdminState = {
    adminData : null
}

export const adminSlice = createSlice({
    name  : 'admin',
    initialState,
    reducers : {
        setAdminData : (state , action: PayloadAction <AdminData | null>) => {
            state.adminData = action.payload;
        },

        adminSignOut : (state) => {
            state.adminData = null;
            localStorage.removeItem('adminToken');
        }
    }
})


export const {setAdminData , adminSignOut} = adminSlice.actions;
export default adminSlice.reducer;