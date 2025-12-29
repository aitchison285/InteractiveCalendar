export interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  location?: string;
  profileId: string;
  calendarSource: 'google' | 'apple' | 'outlook' | 'local';
  sourceEventId?: string;
  recurrence?: RecurrenceRule;
  reminders: Reminder[];
  color: string;
  attendees?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  daysOfWeek?: number[];
}

export interface Reminder {
  minutes: number;
  method: 'notification' | 'email';
}

export interface ConnectedAccount {
  id: string;
  type: 'google' | 'apple' | 'outlook';
  email: string;
  calendarId?: string;
  calendarPath?: string;
  isActive: boolean;
}
