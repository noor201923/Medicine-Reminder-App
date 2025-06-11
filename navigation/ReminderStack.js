import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReminderListScreen from '../screens/ReminderListScreen';
import EditReminderScreen from '../screens/EditReminderScreen';

const Stack = createStackNavigator();

export default function ReminderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false , }}>
      <Stack.Screen name="ReminderList" component={ReminderListScreen} options={{ title: 'Reminders' , headerShown: true}} />
      <Stack.Screen name="EditReminder" component={EditReminderScreen} options={{ title: 'Edit Reminder' , headerShown: true }} />
    </Stack.Navigator>
  );
}
