export const API_CONFIG = {
  google: {
    calendarApiUrl: 'https://www.googleapis.com/calendar/v3',
    scopes: ['https://www.googleapis.com/auth/calendar'],
  },
  apple: {
    caldavUrl: 'https://caldav.icloud.com',
  },
  microsoft: {
    graphApiUrl: 'https://graph.microsoft.com/v1.0',
    scopes: ['Calendars.ReadWrite'],
  },
  recipes: {
    themealdb: 'https://www.themealdb.com/api/json/v1/1',
    spoonacular: 'https://api.spoonacular.com',
    edamam: 'https://api.edamam.com',
  },
  weather: {
    openweathermap: 'https://api.openweathermap.org/data/2.5',
  },
};
