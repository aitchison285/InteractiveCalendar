import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dashboard } from '../components/Dashboard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Dashboard layout="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
