import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Text,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateMedicine } from '../redux/medicineSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditMedicineScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { medicine, index } = route.params;
  const medicineList = useSelector((state) => state.medicine.medicineList);

  const [name, setName] = useState(medicine.name);
  const [dosage, setDosage] = useState(medicine.dosage);
  const [time, setTime] = useState(medicine.time);

  // Animation for screen fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Convert "8:00 AM" to Date object for scheduling
  const getTriggerDateTime = (timeString) => {
    const [hourMinute, period] = timeString.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const now = new Date();
    const trigger = new Date(now);
    trigger.setHours(hour);
    trigger.setMinutes(minute);
    trigger.setSeconds(0);

    if (trigger <= now) {
      trigger.setDate(trigger.getDate() + 1);
    }

    return trigger;
  };

  const handleUpdate = async () => {
    if (!name.trim() || !dosage.trim() || !time.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      // Cancel previous notification if any
      const existingReminderId = medicineList[index]?.reminderId;
      if (existingReminderId) {
        await Notifications.cancelScheduledNotificationAsync(existingReminderId);
      }

      // Schedule new notification
      const trigger = getTriggerDateTime(time);
      const newReminderId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Medicine Reminder',
          body: `Time to take ${name}!`,
          sound: true,
        },
        trigger,
      });

      // Update Redux store
      dispatch(updateMedicine({
        index,
        updatedMedicine: { name, dosage, time, reminderId: newReminderId }
      }));

      Alert.alert('Success', 'Medicine updated!');
      navigation.goBack();

    } catch (error) {
      console.error('Error updating medicine reminder:', error);
      Alert.alert('Error', 'Something went wrong while updating reminder.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#E0F2F1' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Card style={styles.card}>
            <Card.Title
              title="Edit Medicine"
              left={() => (
                <MaterialCommunityIcons
                  name="pill"
                  size={28}
                  color="#00796B"
                  style={{ marginRight: 6 }}
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
                autoCapitalize="words"
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
                autoCapitalize="characters"
              />

              <Button
                mode="contained"
                icon="pencil"
                onPress={handleUpdate}
                style={styles.button}
                buttonColor="#00796B"
                contentStyle={{ paddingVertical: 8 }}
              >
                Update Medicine
              </Button>

              <Button
                mode="outlined"
                icon="arrow-left"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                textColor="#00796B"
                outlineColor="#00796B"
              >
                Cancel
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditMedicineScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#E0F2F1',
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
