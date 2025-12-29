import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CalendarView } from '../components/Calendar';
import { useNavigation } from '@react-navigation/native';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const events = useSelector((state: RootState) => state.calendar.events);

  const handleEventPress = (event: any) => {
    navigation.navigate('EventDetail' as never, { eventId: event.id } as never);
  };

  const handleAddEvent = () => {
    navigation.navigate('AddEvent' as never);
  };

  const handleDateSelect = (date: Date) => {
    console.log('Date selected:', date);
  };

  return (
    <View style={styles.container}>
      <CalendarView
        events={events}
        onEventPress={handleEventPress}
        onAddEvent={handleAddEvent}
        onDateSelect={handleDateSelect}
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
