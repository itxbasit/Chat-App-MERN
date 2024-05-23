import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
    name: 'notification',
    initialState: {
        isVisible: false,
    },
    reducers: {
        showNotification(state) {
            state.isVisible = true;
        },
        hideNotification(state) {
            state.isVisible = false;
        }
    }
});

export const { showNotification, hideNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
