import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CalendarEvent } from '../../types/calendar.types';
import EventCard from './EventCard';
import { format, isSameDay, startOfDay } from 'date-fns';

interface EventListProps {
  events: CalendarEvent[];
  onEventPress?: (event: CalendarEvent) => void;
  onAddEvent?: () => void;
  emptyMessage?: string;
  groupByDate?: boolean;
}

export default function EventList({ 
  events, 
  onEventPress, 
  onAddEvent,
  emptyMessage = 'No events scheduled',
  groupByDate = true 
}: EventListProps) {
  
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const groupedEvents = groupByDate ? groupEventsByDate(sortedEvents) : null;

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📅</Text>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
      {onAddEvent && (
        <TouchableOpacity style={styles.addButton} onPress={onAddEvent}>
          <Text style={styles.addButtonText}>+ Add Event</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (events.length === 0) {
    return renderEmptyState();
  }

  if (groupByDate && groupedEvents) {
    return (
      <FlatList
        data={groupedEvents}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dateGroup}>
            <Text style={styles.dateHeader}>
              {format(new Date(item.date), 'EEEE, MMMM d, yyyy')}
            </Text>
            {item.events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onPress={onEventPress}
              />
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <FlatList
      data={sortedEvents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={onEventPress} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

function groupEventsByDate(events: CalendarEvent[]): { date: string; events: CalendarEvent[] }[] {
  const groups: { [key: string]: CalendarEvent[] } = {};
  
  events.forEach((event) => {
    const dateKey = format(startOfDay(new Date(event.startDate)), 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  });

  return Object.entries(groups).map(([date, events]) => ({
    date,
    events,
  }));
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
