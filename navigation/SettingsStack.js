// navigation/SettingsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';



const Stack = createStackNavigator();

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A stack navigator for the settings section of the app.
 * It includes screens for the main settings, editing profile, and changing password.
 * 

/*******  56d14290-c55b-4eda-8415-642f30fb9837  *******/
export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true}}>
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ title: 'Settings', headerShown: false}} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile', headerShown: true }} 
      />
      <Stack.Screen 
        name="ChangePassword" 
        component={ChangePasswordScreen} 
        options={{ title: 'Change Password', headerShown: true }} 
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen} 
        options={{ title: 'Notifications', headerShown: true }} 
      />
      <Stack.Screen 
        name="DeleteAccount" 
        component={DeleteAccountScreen} 
        options={{ title: 'Delete Account', headerShown: true }} 
      />
    </Stack.Navigator>
  );
}
