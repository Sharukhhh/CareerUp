import { createSlice ,  PayloadAction} from "@reduxjs/toolkit";

export interface Notification {
    id : string;
    message : string;
}

export interface notificationState {
    notifications : Notification[];
    hasNewNotification : boolean;
}

const initialState : notificationState = {
    notifications : [],
    hasNewNotification : false,
}


export const notificationSlice = createSlice ({
    name : 'notifications',
    initialState ,

    reducers : {
        addNotification : (state , action : PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
            state.hasNewNotification = true;
        },

        clearNotification : (state) => {
            state.hasNewNotification = false;
            state.notifications = [];
        }
    }
})

export const {addNotification , clearNotification} = notificationSlice.actions;
export default notificationSlice.reducer;