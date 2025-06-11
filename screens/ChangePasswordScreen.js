import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // dummy existing password
  const existingPassword = '123456';

  const handleChange = () => {
    if (!oldPassword || !newPassword) {
      return Alert.alert('Error', 'Please fill both fields.');
    }

    if (oldPassword !== existingPassword) {
      return Alert.alert('Error', 'Old password is incorrect.');
    }

    if (newPassword.length < 6) {
      return Alert.alert('Error', 'New password must be at least 6 characters.');
    }

    Alert.alert('Success', 'Password changed successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.heading}>
        Change Password
      </Animatable.Text>

      <Animatable.View animation="fadeInLeft" delay={100} style={styles.inputWrapper}>
        <Icon name="lock-outline" size={20} color="#008080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={!showOld}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Pressable onPress={() => setShowOld(!showOld)}>
          <Icon
            name={showOld ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#555"
          />
        </Pressable>
      </Animatable.View>

      <Animatable.View animation="fadeInRight" delay={200} style={styles.inputWrapper}>
        <Icon name="lock-reset" size={20} color="#008080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!showNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Pressable onPress={() => setShowNew(!showNew)}>
          <Icon
            name={showNew ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#555"
          />
        </Pressable>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={300}>
        <Pressable style={styles.button} onPress={handleChange}>
          <Icon name="check-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Change Password</Text>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#008080',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#004d40',
  },
  button: {
    backgroundColor: '#008080',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#004d40',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
