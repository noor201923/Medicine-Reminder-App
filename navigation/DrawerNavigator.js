import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';

import ProfileScreen from '../screens/ProfileScreen';

import MedicineStack from './MedicineStack'; // includes MedicineList, Add, Edit
import ReminderStack from './ReminderStack'; // includes ReminderList, Edit
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen'; 
import SettingsStack from './SettingsStack';
import LogoutScreen from '../screens/LogoutScreen'; 
import CustomDrawerContent from '../components/CustomDrawerContent'; // 🔥 new import


 // ✅ correct import

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home"       drawerContent={(props) => <CustomDrawerContent {...props} />}
>
        <Drawer.Screen name="Home" component={HomeScreen} />

        <Drawer.Screen name="Profile" component={ProfileScreen} />

      <Drawer.Screen name="My Medicines" component={MedicineStack} />
      <Drawer.Screen name="Reminders" component={ReminderStack} />
            <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
            <Drawer.Screen name="Logout" component={LogoutScreen} />


    </Drawer.Navigator>
  );
}
