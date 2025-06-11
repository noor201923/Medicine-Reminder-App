import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, RefreshControl, ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons, Phone, Account } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const user = useSelector(state => state.auth.user);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  // Refresh state
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Refresh handler (can be extended to fetch fresh user data)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh action (replace with redux action or API call)
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Title style={{ color: '#004D40' }}>Please log in to view your profile</Title>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView 
        style={{ flex: 1, width: '100%' }} 
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card style={styles.card} elevation={6}>
          <View style={styles.avatarContainer}>
            {user.profileImage ? (
              <Avatar.Image size={120} source={{ uri: user.profileImage }} />
            ) : (
              <Avatar.Icon
                size={120}
                icon="account-circle"
                color="#004D40"
                style={{ backgroundColor: '#B2DFDB' }}
              />
            )}
          </View>

          <Title style={styles.name}>{user.name}</Title>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={20} color="#00796B" />
            <Paragraph style={styles.infoText}>{user.email}</Paragraph>
          </View>

          {user.phone && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={20} color="#00796B" />
              <Paragraph style={styles.infoText}>{user.phone}</Paragraph>
            </View>
          )}

          {user.bio && (
            <View style={[styles.infoRow, { marginTop: 10 }]}>
              <Paragraph style={styles.bioText}>{user.bio}</Paragraph>
            </View>
          )}

          {/* Edit Profile Button */}
          <Button
            mode="contained"
            buttonColor="#00796B"
            style={styles.editButton}
            onPress={() => navigation.navigate('Settings', { screen: 'EditProfile' })}
          >
            Edit Profile
          </Button>
        </Card>
      </ScrollView>
    </Animated.View>
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
  card: {
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    marginBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#004D40',
  },
  bioText: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#004D40',
    textAlign: 'center',
  },
  editButton: {
    marginTop: 30,
    borderRadius: 8,
  },
});
