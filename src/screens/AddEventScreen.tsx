import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { EventForm } from '../components/Calendar';
import { addEvent } from '../store/slices/calendarSlice';
import { RootState } from '../store/store';
import { CalendarEvent } from '../types/calendar.types';

export default function AddEventScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  
  // Use first profile or default
  const defaultProfileId = profiles.length > 0 ? profiles[0].id : 'default';

  const handleSubmit = (eventData: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title || '',
      description: eventData.description,
      startDate: eventData.startDate || new Date(),
      endDate: eventData.endDate || new Date(),
      allDay: eventData.allDay || false,
      location: eventData.location,
      profileId: eventData.profileId || defaultProfileId,
      calendarSource: 'local',
      color: eventData.color || '#4ECDC4',
      reminders: eventData.reminders || [],
      attendees: eventData.attendees,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch(addEvent(newEvent));
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <EventForm
        profileId={defaultProfileId}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
