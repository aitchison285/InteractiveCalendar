import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddEventScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>
      <Text style={styles.subtitle}>Create a new calendar event</Text>
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
