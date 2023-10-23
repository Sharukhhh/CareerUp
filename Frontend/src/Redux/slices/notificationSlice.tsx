import { createSlice ,  PayloadAction} from "@reduxjs/toolkit";

export interface NotificationCount {
    notificationCount : number;
}

export interface notificationState {
    notificationCount : NotificationCount | null;
}

const initialState : notificationState = {
    notificationCount : {notificationCount : 0}
}


export const notificationSlice = createSlice ({
    name : 'notifications',
    initialState ,

    reducers : {
        updateNotificationCount : (state , action : PayloadAction<NotificationCount | null>) => {
            state.notificationCount = action.payload
        }
    }
})

export const {updateNotificationCount} = notificationSlice.actions;
export default notificationSlice.reducer;