import axios from 'axios';
import { CalendarEvent } from '@types/calendar.types';
import { API_CONFIG } from '@config/api.config';

class OutlookCalendarService {
  private accessToken: string = '';

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async getEvents(calendarId = 'default', startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    try {
      const response = await axios.get(
        `${API_CONFIG.microsoft.graphApiUrl}/me/calendars/${calendarId}/events`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: {
            startDateTime: startDate.toISOString(),
            endDateTime: endDate.toISOString(),
          },
        }
      );

      return response.data.value.map(this.convertToAppEvent);
    } catch (error) {
      console.error('Error fetching Outlook Calendar events:', error);
      throw error;
    }
  }

  async createEvent(calendarId = 'default', event: CalendarEvent) {
    try {
      const response = await axios.post(
        `${API_CONFIG.microsoft.graphApiUrl}/me/calendars/${calendarId}/events`,
        this.convertToOutlookEvent(event),
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating Outlook Calendar event:', error);
      throw error;
    }
  }

  async updateEvent(eventId: string, event: CalendarEvent) {
    try {
      const response = await axios.patch(
        `${API_CONFIG.microsoft.graphApiUrl}/me/events/${eventId}`,
        this.convertToOutlookEvent(event),
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating Outlook Calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await axios.delete(`${API_CONFIG.microsoft.graphApiUrl}/me/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error deleting Outlook Calendar event:', error);
      throw error;
    }
  }

  private convertToAppEvent(outlookEvent: any): CalendarEvent {
    return {
      id: outlookEvent.id,
      title: outlookEvent.subject || 'Untitled Event',
      description: outlookEvent.bodyPreview,
      startDate: new Date(outlookEvent.start.dateTime),
      endDate: new Date(outlookEvent.end.dateTime),
      allDay: outlookEvent.isAllDay,
      location: outlookEvent.location?.displayName,
      profileId: '',
      calendarSource: 'outlook',
      sourceEventId: outlookEvent.id,
      reminders: [],
      color: '#0078D4',
      attendees: outlookEvent.attendees?.map((a: any) => a.emailAddress.address),
      createdAt: new Date(outlookEvent.createdDateTime),
      updatedAt: new Date(outlookEvent.lastModifiedDateTime),
    };
  }

  private convertToOutlookEvent(appEvent: CalendarEvent): any {
    return {
      subject: appEvent.title,
      body: {
        contentType: 'Text',
        content: appEvent.description || '',
      },
      start: {
        dateTime: appEvent.startDate.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: appEvent.endDate.toISOString(),
        timeZone: 'UTC',
      },
      location: {
        displayName: appEvent.location || '',
      },
      isAllDay: appEvent.allDay,
      attendees: appEvent.attendees?.map(email => ({
        emailAddress: { address: email },
        type: 'required',
      })),
    };
  }
}

export default new OutlookCalendarService();
