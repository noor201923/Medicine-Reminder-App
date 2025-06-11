// components/AppLogo.js
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function AppLogo({ size = 100 }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
