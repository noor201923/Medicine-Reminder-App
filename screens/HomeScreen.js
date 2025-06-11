import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FadeInView } from '../components/FadeInView';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.auth.user);
  const userName = currentUser?.name || 'User';

  return (
    <FadeInView style={styles.container}>
      <MaterialCommunityIcons name="pill" size={64} color="#004D40" style={styles.icon} />

      <Text style={styles.heading}>Welcome back, {userName}! 👋</Text>
      <Text style={styles.subheading}>What would you like to do today?</Text>

      <Card style={styles.card}>
        <Button
          icon="format-list-bulleted"
          mode="contained"
          buttonColor="#00796B"
          textColor="#fff"
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={() =>
            navigation.navigate('My Medicines', {
              screen: 'MedicineList',
            })
          }
        >
          View Medicines
        </Button>

        <Button
          icon="plus-circle"
          mode="contained"
          buttonColor="#004D40"
          textColor="#fff"
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={() =>
            navigation.navigate('My Medicines', {
              screen: 'AddMedicine',
            })
          }
        >
          Add Medicine
        </Button>
      </Card>

      <Text style={styles.footerNote}>💡 Tip: Don’t forget to drink water!</Text>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    padding: 24,
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  icon: {
    marginBottom: 10,
  },
  footerNote: {
    marginTop: 30,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#00695C',
  },
});
