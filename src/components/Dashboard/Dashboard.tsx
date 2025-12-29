import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Widget from './Widget';
import CalendarWidget from './CalendarWidget';
import ChoresWidget from './ChoresWidget';
import MealWidget from './MealWidget';

interface DashboardProps {
  layout?: 'default' | 'compact';
}

export default function Dashboard({ layout = 'default' }: DashboardProps) {
  if (layout === 'compact') {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.compactContent}
      >
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CalendarWidget />
          </View>
          <View style={styles.halfWidth}>
            <ChoresWidget />
          </View>
        </View>
        <View style={styles.fullWidth}>
          <MealWidget />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Home!</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.widgetsGrid}>
        <CalendarWidget />
        <ChoresWidget />
        <MealWidget />
        
        {/* Quick Stats Widget */}
        <Widget title="📊 Quick Stats" size="small">
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>12</Text>
              <Text style={styles.quickStatLabel}>Events This Week</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>85%</Text>
              <Text style={styles.quickStatLabel}>Chores Completed</Text>
            </View>
          </View>
        </Widget>

        {/* Weather Widget Placeholder */}
        <Widget title="🌤️ Weather" size="small">
          <View style={styles.weatherContent}>
            <Text style={styles.weatherTemp}>72°F</Text>
            <Text style={styles.weatherCondition}>Partly Cloudy</Text>
            <Text style={styles.weatherLocation}>San Francisco, CA</Text>
          </View>
        </Widget>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  compactContent: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  widgetsGrid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    marginBottom: 16,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  weatherContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 8,
  },
  weatherCondition: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  weatherLocation: {
    fontSize: 14,
    color: '#999',
  },
});
