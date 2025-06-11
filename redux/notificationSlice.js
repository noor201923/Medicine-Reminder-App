// redux/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminder: true,
  summary: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationPrefs: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotificationPrefs } = notificationSlice.actions;
export default notificationSlice.reducer;
