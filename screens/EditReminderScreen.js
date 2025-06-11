import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addReminder, editReminder } from '../redux/reminderSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scheduleNotification } from '../utils/notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';
import { Snackbar } from 'react-native-paper';

export default function EditReminderScreen() {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isEditing = !!params?.reminder;
  const reminderData = params?.reminder;

  const [medicineName, setMedicineName] = useState('');
  const [time, setTime] = useState(''); // Display string like "08:00 AM"
  const [dateObj, setDateObj] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    if (isEditing && reminderData) {
      setMedicineName(reminderData.medicineName);
      setTime(reminderData.time);
      setDateObj(parseTimeToDate(reminderData.time));
    }
  }, [isEditing, reminderData]);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (selectedDate) => {
    hidePicker();

    if (!selectedDate) return;

    // Format to hh:mm AM/PM
    const formattedTime = formatTime(selectedDate);
    setTime(formattedTime);
    setDateObj(selectedDate);
  };

  const handleSave = () => {
    if (!medicineName.trim()) {
      showSnackbar('Please enter the medicine name.');
      return;
    }

    if (!time) {
      showSnackbar('Please select a valid time.');
      return;
    }

    const triggerTime = dateObj;

    if (isEditing) {
      dispatch(editReminder({ id: reminderData.id, medicineName, time }));
      scheduleNotification(medicineName, `Time: ${time}`, triggerTime);
      showSnackbar('Reminder updated successfully!');
    } else {
      const newId = Date.now();
      dispatch(addReminder({ id: newId, medicineName, time }));
      scheduleNotification(medicineName, `Time: ${time}`, triggerTime);
      showSnackbar('Reminder added successfully!');
    }

    setTimeout(() => {
      navigation.goBack();
    }, 1200);
  };

  function parseTimeToDate(timeStr) {
    const now = new Date();
    if (!timeStr) return now;

    const [timePart, modifier] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const triggerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (triggerDate < now) {
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    return triggerDate;
  }

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // convert 0 to 12
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  }

  const showSnackbar = (message) => {
    setSnackbarMsg(message);
    setSnackbarVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.label}>Medicine Name</Text>
      <View style={styles.inputWrapper}>
        <Icon name="pill" size={22} color="#00796B" style={styles.icon} />
        <TextInput
          value={medicineName}
          onChangeText={setMedicineName}
          placeholder="Enter medicine name"
          style={styles.input}
          placeholderTextColor="#a0a0a0"
          returnKeyType="done"
        />
      </View>

      <Text style={styles.label}>Reminder Time</Text>
      <TouchableOpacity onPress={showPicker} activeOpacity={0.7}>
        <View style={[styles.inputWrapper, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="clock-time-four-outline" size={22} color="#00796B" style={styles.icon} />
            <Text style={[styles.input, { paddingVertical: 10 }]}>
              {time || 'Select time'}
            </Text>
          </View>
          <Icon name="chevron-down" size={26} color="#00796B" />
        </View>
      </TouchableOpacity>

      <Animatable.View animation="pulse" iterationCount="infinite" iterationDelay={2000}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Icon name="content-save-outline" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>{isEditing ? 'Update Reminder' : 'Save Reminder'}</Text>
        </TouchableOpacity>
      </Animatable.View>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        is24Hour={false}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: '#004D40' }}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
          color: '#A5D6A7',
        }}
      >
        {snackbarMsg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00796B',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#004D40',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '700',
  },
});
