import { createSlice } from '@reduxjs/toolkit';

const reminderSlice = createSlice({
  name: 'reminders',
  initialState: {
    reminderlist: [],  // Always an array here
  },
  reducers: {
    addReminder: (state, action) => {
      state.reminderlist.push(action.payload);
    },
    editReminder: (state, action) => {
      const index = state.reminderlist.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reminderlist[index] = action.payload;
      }
    },
    deleteReminder: (state, action) => {
      state.reminderlist = state.reminderlist.filter(r => r.id !== action.payload);
    },
  },
});

export const { addReminder, editReminder, deleteReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
