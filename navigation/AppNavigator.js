import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import { useSelector } from 'react-redux';

//import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import store from '../redux/store'; // your redux store path
import AuthStack from './AuthStack';

import DrawerNavigator from './DrawerNavigator';

import ReminderStack from './ReminderStack';  // jo upar banaya
// import SettingsScreen from './SettingsStack';



import MedicineListScreen from '../screens/MedicineListScreen';
// import AddMedicineScreen from '../screens/AddMedicineScreen';
import ReminderListScreen from '../screens/ReminderListScreen';

//import EditMedicineScreen from '../screens/EditMedicineScreen';


//const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();


const App = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Provider store={store}>
      <NavigationContainer>
              {isLoggedIn ? <DrawerNavigator /> : <AuthStack />  }

              

        
        
      </NavigationContainer>
    </Provider>
  );
};

export default App;
