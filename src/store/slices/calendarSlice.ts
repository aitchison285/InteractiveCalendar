import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarEvent, ConnectedAccount } from '@types/calendar.types';

interface CalendarState {
  events: CalendarEvent[];
  connectedAccounts: ConnectedAccount[];
  isLoading: boolean;
  lastSyncTime: Date | null;
}

const initialState: CalendarState = {
  events: [],
  connectedAccounts: [],
  isLoading: false,
  lastSyncTime: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    addConnectedAccount: (state, action: PayloadAction<ConnectedAccount>) => {
      state.connectedAccounts.push(action.payload);
    },
    removeConnectedAccount: (state, action: PayloadAction<string>) => {
      state.connectedAccounts = state.connectedAccounts.filter(a => a.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLastSyncTime: (state, action: PayloadAction<Date>) => {
      state.lastSyncTime = action.payload;
    },
  },
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  addConnectedAccount,
  removeConnectedAccount,
  setLoading,
  setLastSyncTime,
} = calendarSlice.actions;
export default calendarSlice.reducer;
