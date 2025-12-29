import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetProps {
  title?: string;
  size?: WidgetSize;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function Widget({ 
  title, 
  size = 'medium', 
  children,
  style 
}: WidgetProps) {
  const getWidgetStyle = () => {
    switch (size) {
      case 'small':
        return styles.widgetSmall;
      case 'large':
        return styles.widgetLarge;
      default:
        return styles.widgetMedium;
    }
  };

  return (
    <View style={[styles.widget, getWidgetStyle(), style]}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  widgetSmall: {
    minHeight: 150,
  },
  widgetMedium: {
    minHeight: 250,
  },
  widgetLarge: {
    minHeight: 350,
  },
  header: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
});
