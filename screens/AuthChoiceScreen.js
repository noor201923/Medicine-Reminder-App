// screens/AuthChoiceScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import AppLogo from '../components/AppLogo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function AuthChoiceScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <AppLogo size={120} />

        <Text style={styles.heading}>Welcome to Medicine Reminder! 👋</Text>

        <Text style={styles.welcomeText}>
          Your health, our priority. Let’s keep you on track with your medications.
        </Text>

        <Animated.View style={{ transform: [{ translateY: floatAnim }], marginVertical: 15 }}>
          <MaterialCommunityIcons name="pill" size={48} color="#00A5A5" />
        </Animated.View>

        <View style={styles.card}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupBtn}
            contentStyle={styles.btnContent}
            labelStyle={styles.btnLabel}
            uppercase={false}
            icon="account-plus"
            buttonColor="#00A5A5"
          >
            Create Account
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginBtn}
            contentStyle={styles.btnContent}
            labelStyle={[styles.btnLabel, { color: '#A259FF' }]}
            uppercase={false}
            icon="login"
            textColor="#A259FF"
          >
            Already a User? Log In
          </Button>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  card: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  signupBtn: {
    marginBottom: 15,
    borderRadius: 8,
  },
  loginBtn: {
    borderRadius: 8,
    borderWidth: 1.5,
  },
  btnContent: {
    paddingVertical: 10,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
