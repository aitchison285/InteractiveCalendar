import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChoresScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chores Screen</Text>
      <Text style={styles.subtitle}>Chore Management - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
