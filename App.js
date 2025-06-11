import React from 'react';
import { useNotificationSetup } from './utils/useNotificationSetup';
import { Provider as PaperProvider } from 'react-native-paper';

import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import AuthStack from './navigation/AuthStack';
import AppNavigator from './navigation/AppNavigator';


import store, { persistor } from './redux/store';

export default function App() {
  // ✅ Run notification setup
  useNotificationSetup();

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" />} persistor={persistor}>
            <PaperProvider>

        <>
          <AppNavigator />
          <Toast />
        </>
              </PaperProvider>

      </PersistGate>
    </Provider>
  );
}
