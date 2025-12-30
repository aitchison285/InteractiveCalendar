import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { CalendarEvent } from '../../types/calendar.types';
import Button from '../common/Button';
import { format } from 'date-fns';

interface EventFormProps {
  event?: CalendarEvent;
  profileId: string;
  onSubmit: (event: Partial<CalendarEvent>) => void;
  onCancel: () => void;
}

export default function EventForm({ event, profileId, onSubmit, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [location, setLocation] = useState(event?.location || '');
  const [startDate, setStartDate] = useState(event?.startDate || new Date());
  const [endDate, setEndDate] = useState(event?.endDate || new Date());
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const eventData: Partial<CalendarEvent> = {
      id: event?.id,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      startDate,
      endDate,
      allDay,
      profileId,
      calendarSource: event?.calendarSource || 'local',
      color: event?.color || '#4ECDC4',
      reminders: event?.reminders || [],
      attendees: event?.attendees || [],
      updatedAt: new Date(),
    };

    if (!event) {
      eventData.createdAt = new Date();
    }

    onSubmit(eventData);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>{event ? 'Edit Event' : 'New Event'}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
          placeholderTextColor="#999"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Event description"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Event location"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>All Day Event</Text>
          <Switch
            value={allDay}
            onValueChange={setAllDay}
            trackColor={{ false: '#ccc', true: '#4ECDC4' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>
            {format(new Date(startDate), allDay ? 'MMM d, yyyy' : 'MMM d, yyyy h:mm a')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Tap to change date/time</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>
            {format(new Date(endDate), allDay ? 'MMM d, yyyy' : 'MMM d, yyyy h:mm a')}
          </Text>
        </TouchableOpacity>
        {errors.endDate && <Text style={styles.errorText}>{errors.endDate}</Text>}
        <Text style={styles.hint}>Tap to change date/time</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          title={event ? 'Update' : 'Create'}
          onPress={handleSubmit}
          variant="primary"
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
});
