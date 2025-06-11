// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AppLogo from '../components/AppLogo';

export default function SplashScreen({ navigation }) {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Gentle pulse-like bounce loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.15,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in slogan + title
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('AuthChoice');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: bounceAnim }], alignItems: 'center' }}>
        <AppLogo size={130} />
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.title}>Medicine Reminder</Text>
        <Text style={styles.slogan}>Because Every Pill Matters.</Text>
        <ActivityIndicator animating={true} size="large" color="#00A5A5" style={{ marginTop: 25 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  slogan: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
