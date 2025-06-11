import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReminder } from '../redux/reminderSlice';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReminderListScreen() {
  const reminderlist = useSelector(state => state.reminders.reminderlist);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(state => state.auth.user?.id);
  const reminders = useSelector(state => state.reminders.reminderlist.filter(reminder => reminder.userId === userId));
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reminders',
      headerStyle: {
        backgroundColor: '#E0F2F1', // Light teal background
        shadowColor: 'transparent',
      },
      headerTitleStyle: {
        color: '#004D40', // Dark teal heading text
        fontWeight: 'bold',
        fontSize: 22,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditReminder')}
          style={styles.floatingAddButton}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      ),
      headerTintColor: '#00796B', // Tint for back button, etc.
    });
  }, [navigation]);

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteReminder(id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.medicineName}</Text>
        <Text style={styles.time}>⏰ {item.time}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('EditReminder', { reminder: item })}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="pencil" size={22} color="#00796B" />
          <Text style={[styles.buttonText, { color: '#00796B' }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => confirmDelete(item.id)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="delete" size={22} color="#e74c3c" />
          <Text style={[styles.buttonText, { color: '#e74c3c' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reminderlist}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={[styles.container, reminderlist.length === 0 && styles.emptyContainer]}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="calendar-remove" size={64} color="#b0bec5" />
          <Text style={styles.emptyText}>No reminders added yet.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#E0F2F1', // Light teal background
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  card: {
    backgroundColor: '#ffffff', // White card background
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // shadow for iOS
    shadowColor: '#004D40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // shadow for Android
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004D40', // Dark teal heading text
  },
  time: {
    marginTop: 6,
    fontSize: 16,
    color: '#00796B', // Primary accent teal for time text
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B2DFDB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#fdecea', // light red background for delete button
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
  emptyText: {
    fontSize: 18,
    color: '#607d8b',
    fontStyle: 'italic',
    marginTop: 12,
  },
  floatingAddButton: {
    backgroundColor: '#00796B',
    borderRadius: 30,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
