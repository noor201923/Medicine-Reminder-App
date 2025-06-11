import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { setUser, addUser } from '../redux/authSlice';
import AppLogo from '../components/AppLogo'; // assuming you have this

export default function SignupScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const users = useSelector(state => state.auth.users || []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }
    if (!emailRegex.test(email)) {
      Toast.show({ type: 'error', text1: 'Invalid email format' });
      return;
    }
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Weak password',
        text2: 'Use 6+ chars, uppercase, lowercase, digit',
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      return;
    }
    const emailExists = users.find(user => user.email === email);
    if (emailExists) {
      Toast.show({ type: 'error', text1: 'Email already registered' });
      return;
    }
    dispatch(addUser({ name, email, password }));
    Toast.show({ type: 'success', text1: 'Signup successful!' });
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#E0F2F1' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <AppLogo />

        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>
          Join us and enjoy the best experience!
        </Text>

        <TextInput
          label="Full Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={styles.input}
          left={<TextInput.Icon name="account" />}
          returnKeyType="next"
        />

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          left={<TextInput.Icon name="email" />}
          autoCapitalize="none"
          returnKeyType="next"
        />

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
              forceTextInputFocus={false}
            />
          }
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          left={<TextInput.Icon name="lock" />}
          returnKeyType="next"
        />

        <TextInput
          label="Confirm Password"
          mode="outlined"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
              forceTextInputFocus={false}
            />
          }
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          left={<TextInput.Icon name="lock-check" />}
          returnKeyType="done"
          onSubmitEditing={handleSignup}
        />

        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          contentStyle={{ paddingVertical: 10 }}
          buttonColor="#00796B"
          textColor="#fff"
          uppercase={false}
          icon="account-plus"
        >
          Sign Up
        </Button>

        <View style={styles.loginPrompt}>
          <Text style={{ color: '#555' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004D40',
    marginTop: 12,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 25,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  loginPrompt: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'center',
  },
  loginText: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});
