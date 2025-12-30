import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { format, isToday, isTomorrow } from 'date-fns';
import Widget from './Widget';

export default function CalendarWidget() {
  const events = useSelector((state: RootState) => state.calendar.events);

  const todayEvents = events.filter((event) =>
    isToday(new Date(event.startDate))
  );

  const tomorrowEvents = events.filter((event) =>
    isTomorrow(new Date(event.startDate))
  );

  const renderEvent = (event: any) => (
    <View key={event.id} style={[styles.eventItem, { borderLeftColor: event.color }]}>
      <Text style={styles.eventTime}>
        {event.allDay ? 'All Day' : format(new Date(event.startDate), 'h:mm a')}
      </Text>
      <Text style={styles.eventTitle} numberOfLines={1}>
        {event.title}
      </Text>
    </View>
  );

  return (
    <Widget title="📅 Today's Schedule" size="medium">
      {todayEvents.length > 0 ? (
        <View style={styles.eventsContainer}>
          {todayEvents.slice(0, 5).map(renderEvent)}
          {todayEvents.length > 5 && (
            <Text style={styles.moreText}>
              +{todayEvents.length - 5} more events
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No events today</Text>
        </View>
      )}

      {tomorrowEvents.length > 0 && (
        <View style={styles.tomorrowSection}>
          <Text style={styles.tomorrowTitle}>Tomorrow:</Text>
          {tomorrowEvents.slice(0, 2).map(renderEvent)}
        </View>
      )}
    </Widget>
  );
}

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderLeftWidth: 3,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    width: 70,
  },
  eventTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  moreText: {
    fontSize: 12,
    color: '#4ECDC4',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  tomorrowSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tomorrowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
});
