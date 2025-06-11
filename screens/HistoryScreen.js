import React from 'react';
import moment from 'moment';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // vector icons
import * as Animatable from 'react-native-animatable'; // animation library

export default function HistoryScreen() {
  const reminders = useSelector(state => state.reminders?.reminderlist || []);

  const history = reminders
    .filter(reminder => reminder.status === 'completed')
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const renderItem = ({ item }) => (
    <Animatable.View 
      animation="fadeInUp" 
      duration={600} 
      delay={100}
      style={styles.reminderItem}
    >
      <View style={styles.row}>
        <Icon name="pill" size={28} color="#008080" />
        <Text style={styles.title}>{item.medicineName}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="clock-time-four-outline" size={20} color="#006666" />
        <Text style={styles.time}> {moment(item.time).format('MMMM Do, h:mm A')}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="check-circle" size={20} color="#009688" />
        <Text style={styles.status}> {item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Animatable.View animation="bounceIn" iterationCount="infinite" duration={1500}>
            <Icon name="history" size={80} color="#00808080" />
          </Animatable.View>
          <Text style={styles.emptyText}>No completed reminders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f2f1', // soft teal background
  },
  reminderItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    // subtle shadow
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  title: {
    marginLeft: 12,
    fontWeight: '700',
    fontSize: 18,
    color: '#004d40',
  },
  time: {
    marginLeft: 6,
    color: '#006666',
    fontSize: 14,
  },
  status: {
    marginLeft: 6,
    color: '#00796b',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 24,
    fontSize: 18,
    color: '#008080aa',
    fontWeight: '600',
  },
});
