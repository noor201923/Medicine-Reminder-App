import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setNotificationPrefs } from '../redux/notificationSlice';
import * as Animatable from 'react-native-animatable';

export default function NotificationSettingsScreen() {
  const dispatch = useDispatch();
  const prefs = useSelector((state) => state.notifications);

  const [reminderNotif, setReminderNotif] = useState(prefs.reminder);
  const [dailySummary, setDailySummary] = useState(prefs.summary);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleReminderNotif = () => {
    const newValue = !reminderNotif;
    setReminderNotif(newValue);
    dispatch(setNotificationPrefs({ ...prefs, reminder: newValue }));
  };

  const toggleDailySummary = () => {
    const newValue = !dailySummary;
    setDailySummary(newValue);
    dispatch(setNotificationPrefs({ ...prefs, summary: newValue }));
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animatable.Text animation="fadeInDown" style={styles.heading}>
        Notification Settings
      </Animatable.Text>

      <Animatable.View animation="fadeInLeft" delay={200} style={styles.card}>
        <Ionicons name="notifications" size={24} color="#008080" />
        <Text style={styles.optionText}>Reminders</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#4dd0e1' }}
          thumbColor={reminderNotif ? '#008080' : '#f4f3f4'}
          onValueChange={toggleReminderNotif}
          value={reminderNotif}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInRight" delay={300} style={styles.card}>
        <Ionicons name="calendar-outline" size={24} color="#008080" />
        <Text style={styles.optionText}>Daily Summary</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#4dd0e1' }}
          thumbColor={dailySummary ? '#008080' : '#f4f3f4'}
          onValueChange={toggleDailySummary}
          value={dailySummary}
        />
      </Animatable.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: '#008080',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    color: '#004d40',
  },
});
