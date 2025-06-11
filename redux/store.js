import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';

import medicineReducer from './medicineSlice';  // your other slice
import reminderReducer from './reminderSlice';  // reminder slice

const rootReducer = combineReducers({
  auth: authReducer,
  medicine: medicineReducer,
  reminders: reminderReducer,
    notifications: notificationReducer,

});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
