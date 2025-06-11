import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Avatar, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { updateUser } from '../redux/authSlice';

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [saving, setSaving] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  useFocusEffect(
    React.useCallback(() => {
      const loadUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('userProfile');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setName(parsedUser.name);
            setEmail(parsedUser.email);
            setProfileImage(parsedUser.profileImage);
            dispatch(updateUser(parsedUser));
          }
        } catch (err) {
          console.log('Failed to load user from storage', err);
        }
      };
      loadUser();
    }, [dispatch])
  );

  const pickImage = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Please allow access to your photos.");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Image picking error:', error);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Name and Email are required.');
      return;
    }
    setSaving(true);

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    const updatedUser = { ...user, name, email, profileImage };
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
      dispatch(updateUser({ ...updatedUser, originalEmail: user.email }));

     // dispatch(updateUser(updatedUser));
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('Profile');
    } catch (err) {
      Alert.alert('Error', 'Failed to save profile.');
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Edit Profile</Title>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {profileImage ? (
          <Avatar.Image size={120} source={{ uri: profileImage }} />
        ) : (
          <Avatar.Icon size={120} icon="account-circle" color="#004D40" style={{ backgroundColor: '#B2DFDB' }} />
        )}
        <View style={styles.editIconWrapper}>
          <MaterialCommunityIcons name="pencil" size={24} color="#004D40" />
        </View>
      </TouchableOpacity>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="account" />}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="email" />}
      />

      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        <Button
          mode="contained"
          buttonColor="#00796B"
          loading={saving}
          disabled={saving}
          onPress={handleSave}
          style={styles.saveButton}
          icon="content-save"
        >
          Save
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    padding: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#B2DFDB',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#004D40',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 8,
  },
});
