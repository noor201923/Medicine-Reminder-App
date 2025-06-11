import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  useTheme,
  Text,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../redux/medicineSlice';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddMedicineScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const scheduleReminder = async (medicineName, timeString) => {
    if (!Device.isDevice) {
      Alert.alert('Use a physical device for notifications');
      return;
    }

    const [hour, minutePart] = timeString.split(':');
    let minute = parseInt(minutePart);
    let ampm = 'AM';

    if (minutePart.toLowerCase().includes('pm')) ampm = 'PM';

    let formattedHour = parseInt(hour);
    if (ampm === 'PM' && formattedHour < 12) formattedHour += 12;
    if (ampm === 'AM' && formattedHour === 12) formattedHour = 0;

    const now = new Date();
    const reminderTime = new Date(now);
    reminderTime.setHours(formattedHour);
    reminderTime.setMinutes(minute);
    reminderTime.setSeconds(0);

    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Medicine Reminder',
        body: `Time to take ${medicineName}!`,
        sound: true,
      },
      trigger: reminderTime,
    });
  };

  const handleAddMedicine = async () => {
    if (!name.trim() || !dosage.trim() || !time.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    dispatch(addMedicine({ name, dosage, time }));
    await scheduleReminder(name, time);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Medicine added with reminder!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Medicine added with reminder!');
    }
    
// navigation.navigate('My Medicines', {
             // screen: 'MedicineList',});
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Add New Medicine"
            left={() => (
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color="#00796B"
                style={{ marginRight: 8 }}
              />
            )}
            titleStyle={styles.heading}
          />
          <Card.Content>
            <TextInput
              label="Medicine Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              style={styles.input}
              left={<TextInput.Icon icon="capsule" />}
              outlineColor="#004D40"
              activeOutlineColor="#00796B"
            />
            <TextInput
              label="Dosage (e.g. 2 pills)"
              mode="outlined"
              value={dosage}
              onChangeText={setDosage}
              style={styles.input}
              left={<TextInput.Icon icon="format-list-numbered" />}
              outlineColor="#004D40"
              activeOutlineColor="#00796B"
            />
            <TextInput
              label="Time (e.g. 8:00 AM)"
              mode="outlined"
              value={time}
              onChangeText={setTime}
              style={styles.input}
              left={<TextInput.Icon icon="clock-outline" />}
              outlineColor="#004D40"
              activeOutlineColor="#00796B"
            />

            <Button
              mode="contained"
              icon="plus"
              onPress={handleAddMedicine}
              style={styles.button}
              buttonColor="#00796B"
              contentStyle={{ paddingVertical: 8 }}
            >
              Add Medicine
            </Button>

            <Button
              mode="outlined"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              textColor="#00796B"
              outlineColor="#00796B"
            >
              Go Back
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddMedicineScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F2F1',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
  },
  backButton: {
    marginTop: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00796B',
  },
});
