import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export default function SettingsScreen({ navigation }) {
  const settings = [
    {
      title: 'Change Password',
      icon: 'lock-reset',
      action: () => navigation.navigate('ChangePassword'),
    },
    {
      title: 'Notification Settings',
      icon: 'bell-ring-outline',
      action: () => navigation.navigate('NotificationSettings'),
    },
    {
      title: 'Delete Account',
      icon: 'delete-outline',
      action: () => navigation.navigate('DeleteAccount'),
    },
    {
      title: 'Edit Profile',
      icon: 'account-edit-outline',
      action: () => navigation.navigate('EditProfile'),
    },
  ];

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.heading}>
        Settings
      </Animatable.Text>

      {settings.map((item, index) => (
        <Animatable.View
          animation="fadeInUp"
          delay={index * 150}
          key={index}
          style={styles.optionCard}
        >
          <PressableCard onPress={item.action} icon={item.icon} title={item.title} />
        </Animatable.View>
      ))}
    </View>
  );
}

// 🔥 Pressable card with scale + ripple + glow effect
function PressableCard({ onPress, icon, title }) {
  const [scaleValue] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleValue }],
        },
        isPressed && styles.glowShadow, // Add glowing shadow when pressed
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{
          color: '#b2dfdb', // ripple for Android
        }}
        style={({ pressed }) => [
          styles.optionRow,
          pressed && { backgroundColor: '#e0f2f1' }, // slight background tint on press (iOS)
        ]}
      >
        <Icon name={icon} size={24} color="#008080" />
        <Text style={styles.optionText}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f2f1', // light teal background
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionCard: {
    borderRadius: 10,
    marginVertical: 8,
    elevation: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  optionText: {
    marginLeft: 16,
    fontSize: 18,
    color: '#004d40',
    fontWeight: '500',
  },
  glowShadow: {
    shadowColor: '#26a69a', // teal glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10, // Android shadow
  },
});
