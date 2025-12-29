import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.content}>
            <Text style={styles.title}>Family Calendar App</Text>
            <Text style={styles.subtitle}>Interactive Touch Display Application</Text>
            <Text style={styles.description}>
              A comprehensive family calendar application for Android Mini PC touchscreen
              displays with calendar sync, chore management, meal planning, and shopping lists.
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>✅ Multi-User Family Profiles</Text>
              <Text style={styles.featureItem}>✅ Universal Calendar Synchronization</Text>
              <Text style={styles.featureItem}>✅ Chore Chart & Task Management</Text>
              <Text style={styles.featureItem}>✅ Meal Planner with Recipe Database</Text>
              <Text style={styles.featureItem}>✅ Shopping List & Pantry Management</Text>
              <Text style={styles.featureItem}>✅ Customizable Dashboard</Text>
            </View>
            <Text style={styles.status}>
              Status: Foundation Complete - Ready for UI Development
            </Text>
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  featureList: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 32,
  },
  featureItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
