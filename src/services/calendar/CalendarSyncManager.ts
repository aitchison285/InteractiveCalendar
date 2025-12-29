import { addMonths } from 'date-fns';
import GoogleCalendarService from './GoogleCalendarService';
import AppleCalendarService from './AppleCalendarService';
import OutlookCalendarService from './OutlookCalendarService';
import { store } from '@store/store';
import { setEvents, setLoading, setLastSyncTime } from '@store/slices/calendarSlice';
import { CalendarEvent } from '@types/calendar.types';
import { APP_CONFIG } from '@config/app.config';

class CalendarSyncManager {
  private syncInterval: NodeJS.Timeout | null = null;

  startAutoSync(intervalMinutes: number = APP_CONFIG.syncIntervalMinutes) {
    this.syncAll();
    this.syncInterval = setInterval(() => {
      this.syncAll();
    }, intervalMinutes * 60 * 1000);
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  async syncAll() {
    const state = store.getState();
    const connectedAccounts = state.calendar.connectedAccounts;

    store.dispatch(setLoading(true));

    const allEvents: CalendarEvent[] = [];
    const startDate = new Date();
    const endDate = addMonths(startDate, APP_CONFIG.calendarMonthsToSync);

    for (const account of connectedAccounts) {
      if (!account.isActive) continue;

      try {
        let events: CalendarEvent[] = [];

        switch (account.type) {
          case 'google':
            events = await GoogleCalendarService.getEvents(
              account.calendarId || 'primary',
              startDate,
              endDate
            );
            break;
          case 'apple':
            if (account.calendarPath) {
              events = await AppleCalendarService.getEvents(
                account.calendarPath,
                startDate,
                endDate
              );
            }
            break;
          case 'outlook':
            events = await OutlookCalendarService.getEvents(
              account.calendarId || 'default',
              startDate,
              endDate
            );
            break;
        }

        allEvents.push(...events);
      } catch (error) {
        console.error(`Sync failed for ${account.type} (${account.email}):`, error);
      }
    }

    store.dispatch(setEvents(allEvents));
    store.dispatch(setLastSyncTime(new Date()));
    store.dispatch(setLoading(false));
  }

  async pushLocalChanges() {
    // Get local changes that haven't been synced
    // Push to respective services
    console.log('Pushing local changes...');
  }
}

export default new CalendarSyncManager();
