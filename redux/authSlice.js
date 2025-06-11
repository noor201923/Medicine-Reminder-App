import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [], // list of registered users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUser(state, action) {
  const updated = action.payload;
  const oldEmail = updated.originalEmail || state.user?.email;

  state.user = { ...state.user, ...updated };

  const index = state.users.findIndex(u => u.email === oldEmail);
  if (index !== -1) {
    state.users[index] = { ...state.users[index], ...updated };
  }
},
  

    addUser(state, action) {
      state.users.push(action.payload);
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, updateUser, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
