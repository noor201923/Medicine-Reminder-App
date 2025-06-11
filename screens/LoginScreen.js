import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppLogo from '../components/AppLogo';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const users = useSelector(state => state.auth.users || []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({ type: 'error', text1: 'All fields required' });
      return;
    }

    const foundUser = users.find(user => user.email === email && user.password === password);
    if (!foundUser) {
      Toast.show({ type: 'error', text1: 'Invalid email or password' });
      return;
    }

    dispatch(setUser({ name: foundUser.name, email: foundUser.email, profileImage: foundUser.profileImage || null }));
    Toast.show({ type: 'success', text1: `Welcome ${foundUser.name}` });
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#E0F2F1' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <AppLogo />

        <Text style={styles.heading}>Login</Text>
        <Text style={styles.welcomeBack}>Welcome back! We're glad to see you again. 😊</Text>

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
            />
          }
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          left={<TextInput.Icon name="lock" />}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          contentStyle={{ paddingVertical: 10 }}
          buttonColor="#00796B"
          textColor="#fff"
          uppercase={false}
          icon="login"
        >
          Login
        </Button>

        <View style={styles.signupPrompt}>
          <Text style={{ color: '#555' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  welcomeBack: {
    fontSize: 16,
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  signupPrompt: {
    marginTop: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});
