import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MedicineListScreen from '../screens/MedicineListScreen';
import AddMedicineScreen from '../screens/AddMedicineScreen';
import EditMedicineScreen from '../screens/EditMedicineScreen';

const Stack = createStackNavigator();

export default function MedicineStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicineList" component={MedicineListScreen} options={{ title: 'My Medicines', headerShown: false }} />
      <Stack.Screen name="AddMedicine" component={AddMedicineScreen} options={{ title: 'Add Medicine' }} />
      <Stack.Screen name="EditMedicine" component={EditMedicineScreen} options={{ title: 'Edit Medicine', headerShown: false }} />
    </Stack.Navigator>
  );
}
