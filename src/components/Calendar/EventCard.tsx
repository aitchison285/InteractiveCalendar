import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CalendarEvent } from '../../types/calendar.types';
import { format } from 'date-fns';

interface EventCardProps {
  event: CalendarEvent;
  onPress?: (event: CalendarEvent) => void;
  compact?: boolean;
}

export default function EventCard({ event, onPress, compact = false }: EventCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(event);
    }
  };

  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { borderLeftColor: event.color },
        compact && styles.compact
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        
        {!compact && event.description && (
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.time}>
            {event.allDay 
              ? 'All Day' 
              : `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
            }
          </Text>
          
          {!compact && event.location && (
            <Text style={styles.location} numberOfLines={1}>
              📍 {event.location}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compact: {
    padding: 8,
    marginVertical: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  time: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  location: {
    fontSize: 12,
    color: '#999',
    flex: 1,
    marginLeft: 12,
  },
});
