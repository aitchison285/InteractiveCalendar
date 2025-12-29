import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MealPlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner Screen</Text>
      <Text style={styles.subtitle}>Meal Planning - Coming Soon</Text>
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
