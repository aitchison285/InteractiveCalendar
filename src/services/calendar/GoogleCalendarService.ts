import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { CalendarEvent } from '@types/calendar.types';
import { API_CONFIG } from '@config/api.config';

class GoogleCalendarService {
  async configure(webClientId: string) {
    GoogleSignin.configure({
      scopes: API_CONFIG.google.scopes,
      webClientId,
    });
  }

  async signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
    }
  }

  async getEvents(calendarId = 'primary', timeMin: Date, timeMax: Date): Promise<CalendarEvent[]> {
    try {
      const tokens = await GoogleSignin.getTokens();
      
      const response = await axios.get(
        `${API_CONFIG.google.calendarApiUrl}/calendars/${calendarId}/events`,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          params: {
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
          },
        }
      );

      return response.data.items.map(this.convertToAppEvent);
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  }

  async createEvent(calendarId = 'primary', event: CalendarEvent) {
    try {
      const tokens = await GoogleSignin.getTokens();
      
      const response = await axios.post(
        `${API_CONFIG.google.calendarApiUrl}/calendars/${calendarId}/events`,
        this.convertToGoogleEvent(event),
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      throw error;
    }
  }

  async updateEvent(calendarId = 'primary', eventId: string, event: CalendarEvent) {
    try {
      const tokens = await GoogleSignin.getTokens();
      
      const response = await axios.put(
        `${API_CONFIG.google.calendarApiUrl}/calendars/${calendarId}/events/${eventId}`,
        this.convertToGoogleEvent(event),
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating Google Calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(calendarId = 'primary', eventId: string) {
    try {
      const tokens = await GoogleSignin.getTokens();
      
      await axios.delete(
        `${API_CONFIG.google.calendarApiUrl}/calendars/${calendarId}/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      throw error;
    }
  }

  private convertToAppEvent(googleEvent: any): CalendarEvent {
    return {
      id: googleEvent.id,
      title: googleEvent.summary || 'Untitled Event',
      description: googleEvent.description,
      startDate: new Date(googleEvent.start.dateTime || googleEvent.start.date),
      endDate: new Date(googleEvent.end.dateTime || googleEvent.end.date),
      allDay: !googleEvent.start.dateTime,
      location: googleEvent.location,
      profileId: '',
      calendarSource: 'google',
      sourceEventId: googleEvent.id,
      reminders: [],
      color: googleEvent.colorId || '#4285F4',
      attendees: googleEvent.attendees?.map((a: any) => a.email),
      createdAt: new Date(googleEvent.created),
      updatedAt: new Date(googleEvent.updated),
    };
  }

  private convertToGoogleEvent(appEvent: CalendarEvent): any {
    return {
      summary: appEvent.title,
      description: appEvent.description,
      location: appEvent.location,
      start: appEvent.allDay
        ? { date: appEvent.startDate.toISOString().split('T')[0] }
        : { dateTime: appEvent.startDate.toISOString() },
      end: appEvent.allDay
        ? { date: appEvent.endDate.toISOString().split('T')[0] }
        : { dateTime: appEvent.endDate.toISOString() },
      attendees: appEvent.attendees?.map(email => ({ email })),
    };
  }
}

export default new GoogleCalendarService();
