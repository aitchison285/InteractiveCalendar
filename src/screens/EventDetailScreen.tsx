import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from '../store/store';
import { updateEvent, removeEvent } from '../store/slices/calendarSlice';
import { EventForm } from '../components/Calendar';
import { CalendarEvent } from '../types/calendar.types';
import { format } from 'date-fns';
import Button from '../components/common/Button';

export default function EventDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { eventId } = route.params as { eventId: string };
  
  const event = useSelector((state: RootState) =>
    state.calendar.events.find((e) => e.id === eventId)
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (eventData: Partial<CalendarEvent>) => {
    dispatch(updateEvent({ id: event.id, changes: eventData }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeEvent(event.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (isEditing) {
    return (
      <View style={styles.container}>
        <EventForm
          event={event}
          profileId={event.profileId}
          onSubmit={handleUpdate}
          onCancel={handleCancelEdit}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.colorBar, { backgroundColor: event.color }]} />
      
      <Text style={styles.title}>{event.title}</Text>

      {event.description && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.sectionText}>{event.description}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Date & Time</Text>
        <Text style={styles.sectionText}>
          {event.allDay ? (
            <>
              {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
              {'\n'}All Day Event
            </>
          ) : (
            <>
              {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
              {'\n'}
              {format(new Date(event.startDate), 'h:mm a')} -{' '}
              {format(new Date(event.endDate), 'h:mm a')}
            </>
          )}
        </Text>
      </View>

      {event.location && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location</Text>
          <Text style={styles.sectionText}>📍 {event.location}</Text>
        </View>
      )}

      {event.attendees && event.attendees.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Attendees</Text>
          {event.attendees.map((attendee, index) => (
            <Text key={index} style={styles.sectionText}>
              • {attendee}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Calendar Source</Text>
        <Text style={styles.sectionText}>
          {event.calendarSource.charAt(0).toUpperCase() + event.calendarSource.slice(1)}
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={handleEdit}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Delete"
          onPress={handleDelete}
          variant="danger"
          style={styles.button}
        />
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
  colorBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    padding: 32,
  },
});
