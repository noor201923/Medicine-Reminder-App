import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // update path if different
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteAccountScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear(); // or remove specific keys if needed
              dispatch(logout());

              Alert.alert('Deleted', 'Your account has been deleted.');

              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.heading}>
        Delete Account
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
        <Icon name="alert-circle-outline" size={60} color="#d32f2f" />
        <Text style={styles.warningText}>
          This will permanently delete your account and all related data.
        </Text>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="delete-forever-outline" size={20} color="#fff" />
          <Text style={styles.deleteText}>Delete My Account</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#008080',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  warningText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
