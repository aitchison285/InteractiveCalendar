import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarEvent } from '../../types/calendar.types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import EventList from './EventList';

interface CalendarViewProps {
  events: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  onEventPress?: (event: CalendarEvent) => void;
  onAddEvent?: () => void;
  initialDate?: Date;
  viewMode?: 'month' | 'week' | 'day' | 'agenda';
}

export default function CalendarView({
  events,
  onDateSelect,
  onEventPress,
  onAddEvent,
  initialDate = new Date(),
  viewMode: initialViewMode = 'month',
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState(initialViewMode);

  const handleDayPress = (day: DateData) => {
    const date = new Date(day.dateString);
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};
    
    events.forEach((event) => {
      const dateKey = format(new Date(event.startDate), 'yyyy-MM-dd');
      if (!marked[dateKey]) {
        marked[dateKey] = { dots: [] };
      }
      marked[dateKey].dots.push({
        color: event.color,
      });
    });

    // Mark selected date
    const selectedKey = format(selectedDate, 'yyyy-MM-dd');
    marked[selectedKey] = {
      ...marked[selectedKey],
      selected: true,
      selectedColor: '#4ECDC4',
    };

    return marked;
  };

  const getEventsForSelectedDate = () => {
    return events.filter((event) =>
      isSameDay(new Date(event.startDate), selectedDate)
    );
  };

  const renderViewModeSelector = () => (
    <View style={styles.viewModeSelector}>
      {(['month', 'agenda'] as const).map((mode) => (
        <TouchableOpacity
          key={mode}
          style={[
            styles.viewModeButton,
            viewMode === mode && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode(mode)}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === mode && styles.viewModeTextActive,
            ]}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (viewMode === 'agenda') {
    return (
      <View style={styles.container}>
        {renderViewModeSelector()}
        <EventList
          events={events}
          onEventPress={onEventPress}
          onAddEvent={onAddEvent}
          groupByDate={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderViewModeSelector()}
      
      <Calendar
        current={format(selectedDate, 'yyyy-MM-dd')}
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        markingType="multi-dot"
        theme={{
          todayTextColor: '#4ECDC4',
          selectedDayBackgroundColor: '#4ECDC4',
          selectedDayTextColor: '#ffffff',
          arrowColor: '#4ECDC4',
          monthTextColor: '#333',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      <View style={styles.selectedDateHeader}>
        <Text style={styles.selectedDateText}>
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </Text>
        {onAddEvent && (
          <TouchableOpacity onPress={onAddEvent} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.eventsList}>
        {getEventsForSelectedDate().length > 0 ? (
          getEventsForSelectedDate().map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventItem, { borderLeftColor: event.color }]}
              onPress={() => onEventPress?.(event)}
            >
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>
                {event.allDay
                  ? 'All Day'
                  : `${format(new Date(event.startDate), 'h:mm a')} - ${format(
                      new Date(event.endDate),
                      'h:mm a'
                    )}`}
              </Text>
              {event.location && (
                <Text style={styles.eventLocation}>📍 {event.location}</Text>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No events on this date</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viewModeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  viewModeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  viewModeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedDateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
