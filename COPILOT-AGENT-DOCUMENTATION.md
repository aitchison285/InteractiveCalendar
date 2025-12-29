# 📋 **GitHub Copilot Agent Documentation:  Family Calendar Touch Display Application**

## **Project Overview**

Create a comprehensive family calendar application for Android Mini PC touchscreen displays (24-32 inch) that replicates the Cozyla Calendar+ functionality. The application will run on an Android Mini PC connected to a touchscreen monitor, providing a centralized family organization hub with calendar sync, chore management, meal planning, and shopping lists.

---

## **📱 Technology Stack**

### **Recommended:  React Native with TypeScript**
- **Why:** Best balance of development speed, VS Code integration, cross-platform capability, and rich UI libraries for calendar interfaces
- **Language:** TypeScript for type safety
- **Development Environment:** Visual Studio Code
- **Target Platform:** Android (APK for Android Mini PC)
- **Minimum Android Version:** Android 9.0 (API 28)
- **Target Android Version:** Android 13+ (API 33+)

### **Alternative Frameworks (if preferred):**
1. **Flutter (Dart)** - Excellent UI performance, but requires learning Dart
2. **Kotlin + Jetpack Compose** - Native Android, best performance, Android-only
3. **Java (Android Native)** - Maximum control, more verbose

---

## **🎯 Core Features & Requirements**

### **1. Multi-User Family Profiles**
- Support up to 8 family member profiles
- Each profile has: 
  - Unique name
  - Custom avatar (upload or select from library)
  - Personalized color coding
  - Individual calendar view
- Profile management (add, edit, delete, reorder)
- Quick profile switcher on dashboard

### **2. Universal Calendar Synchronization**
- **Two-way sync** with multiple calendar services:
  - ✅ **Google Calendar** (OAuth 2.0 via Google Calendar API)
  - ✅ **Apple Calendar/iCloud** (CalDAV protocol with app-specific passwords)
  - ✅ Outlook/Microsoft 365 (Microsoft Graph API)
  - ✅ Yahoo Calendar (CalDAV)
  - ✅ Generic CalDAV/iCal support

#### **Calendar Sync Requirements:**
- Real-time or near real-time synchronization (polling every 5-15 minutes)
- Conflict resolution for simultaneous edits
- Offline mode with local caching
- Color-coded events by family member
- Event details:  title, date, time, location, notes, attendees, reminders
- Recurring event support (daily, weekly, monthly, custom)
- All-day event support
- Calendar views: Day, Week, Month, Agenda
- Touch gestures:  swipe between dates, pinch to zoom, long-press for quick add

#### **Technical Implementation:**
- **Google Calendar:** Use Google Calendar API v3 with OAuth 2.0
- **Apple Calendar:** Use CalDAV protocol (server:  `https://caldav.icloud.com/`)
  - Users provide Apple ID email + app-specific password
  - Use CalDAV library:  [ical4j](https://github.com/ical4j/ical4j) or custom CalDAV client
- **Outlook:** Use Microsoft Graph API with OAuth 2.0
- **Local storage:** SQLite or Realm for offline calendar cache

### **3. Chore Chart & Task Management**
- Assign chores to individual family members
- Chore properties: 
  - Title and description
  - Assigned person(s)
  - Due date/time
  - Recurring schedule (daily, weekly, custom)
  - Status: Not Started, In Progress, Completed
  - Point value (for reward system)
  - Optional photo/icon

#### **Reward System:**
- Point accumulation per completed chore
- Leaderboard showing family rankings
- Visual celebrations (confetti animation, sound effects)
- Customizable rewards (redeemable points for privileges/treats)
- Weekly/monthly reset options
- Achievement badges

#### **Chore Views:**
- Grid view with color-coded assignments
- List view sorted by due date, person, or priority
- Calendar integration (chores appear on calendar)
- Drag-and-drop reassignment
- Quick complete button with haptic feedback

### **4. Meal Planner**
- Visual weekly meal calendar (Breakfast, Lunch, Dinner, Snacks)
- Recipe database: 
  - 5000+ built-in recipes (integrate free API like [TheMealDB](https://www.themealdb.com/api.php) or [Spoonacular](https://spoonacular.com/food-api))
  - Add custom recipes (title, ingredients, instructions, photos, cooking time, servings)
  - Recipe import from URLs (web scraping with [recipe-scrapers](https://github.com/hhursev/recipe-scrapers))
  - Photo recognition ("Snap-to-Recipe" - use image recognition API)

#### **Smart Features:**
- AI meal suggestions (integrate OpenAI API or Gemini API for meal planning)
- Dietary restrictions/preferences filter (vegetarian, vegan, gluten-free, allergies)
- Nutritional information display
- Cooking timers integrated with recipes
- Video tutorials (embed YouTube or TikTok)

#### **Meal-to-Grocery Integration:**
- Auto-generate shopping list from planned meals
- Ingredient quantity calculation based on servings
- Pantry inventory tracking (manual entry or barcode scan)
- Expiration date reminders

### **5. Shopping List & Pantry Management**
- Collaborative shopping list (all family members can edit)
- Real-time sync across devices (mobile companion app + wall display)
- Categories:  Produce, Dairy, Meat, Pantry, Frozen, Household, etc.
- Check/uncheck items
- Quick add via voice input or search
- Barcode scanner for adding items
- Price tracking (optional)

#### **Pantry Tracker:**
- Item inventory with quantities
- Expiration date tracking
- Low stock alerts
- Auto-add to shopping list when running low

### **6. Customizable Dashboard**
- Drag-and-drop widget system
- Resizable and repositionable widgets
- Available widgets:
  - Calendar (day/week/month view)
  - Chore chart
  - Meal planner
  - Shopping list
  - Weather widget (integrate OpenWeatherMap API)
  - To-do list / Notes
  - Photo slideshow
  - Clock/Date
  - Music player (Spotify embed if possible)
  - News feed
  - Family message board
  - Countdown timer
  - Smart home controls (optional)

#### **Dashboard Profiles:**
- Save multiple dashboard layouts
- Per-user custom dashboards
- Portrait and landscape orientation support
- Auto-rotate based on screen orientation

### **7. Companion Mobile App**
- React Native supports iOS and Android from same codebase
- Features:
  - View and edit calendar events
  - Add/complete chores
  - Manage shopping lists
  - View meal plans and recipes
  - Push notifications for reminders
  - Remote sync with wall display

### **8. Smart Home Integration (Optional but Recommended)**
- Google Home/Assistant integration
- Amazon Alexa integration
- Display smart camera feeds
- Control smart lights, thermostats, locks
- Voice commands for adding events, chores, shopping items

### **9. Additional Features**
- **Photo Frame Mode:** Display family photos when idle (screensaver)
- **Secure Authentication:** PIN/password lock, face recognition (optional)
- **Notifications:** Visual and audio alerts for upcoming events, chores due
- **Energy Saving:** Auto-dim, sleep mode, schedule on/off times
- **Multi-language Support:** Localization for at least English, Spanish, French
- **Data Backup & Sync:** Cloud backup (Firebase, AWS, or Google Drive)
- **Privacy Controls:** Data encryption, GDPR compliance

---

## **🏗️ Project Structure**

family-calendar-app/ ├── android/ # Android native code ├── ios/ # iOS native code (for mobile companion) ├── src/ │ ├── assets/ # Images, fonts, icons │ │ ├── avatars/ │ │ ├── icons/ │ │ └── animations/ │ ├── components/ # Reusable React components │ │ ├── Calendar/ │ │ │ ├── CalendarView.tsx │ │ │ ├── EventCard.tsx │ │ │ └── MonthView.tsx │ │ ├── Chores/ │ │ │ ├── ChoreCard.tsx │ │ │ ├── ChoreList.tsx │ │ │ └── Leaderboard.tsx │ │ ├── MealPlanner/ │ │ │ ├── MealCalendar.tsx │ │ │ ├── RecipeCard.tsx │ │ │ └── RecipeDetail.tsx │ │ ├── Shopping/ │ │ │ ├── ShoppingList.tsx │ │ │ └── PantryTracker.tsx │ │ ├── Dashboard/ │ │ │ ├── Dashboard.tsx │ │ │ ├── Widget.tsx │ │ │ └── WidgetGrid.tsx │ │ ├── Profiles/ │ │ │ ├── ProfileSelector.tsx │ │ │ └── ProfileManager.tsx │ │ └── Common/ │ │ ├── Button.tsx │ │ ├── Modal.tsx │ │ └── LoadingSpinner.tsx │ ├── screens/ # Main app screens │ │ ├── HomeScreen.tsx │ │ ├── CalendarScreen.tsx │ │ ├── ChoresScreen.tsx │ │ ├── MealPlannerScreen.tsx │ │ ├── ShoppingScreen.tsx │ │ ├── SettingsScreen.tsx │ │ └── ProfileSetupScreen.tsx │ ├── navigation/ # React Navigation setup │ │ └── AppNavigator.tsx │ ├── services/ # API and external services │ │ ├── calendar/ │ │ │ ├── GoogleCalendarService.ts │ │ │ ├── AppleCalendarService.ts (CalDAV) │ │ │ ├── OutlookCalendarService.ts │ │ │ └── CalendarSyncManager.ts │ │ ├── recipes/ │ │ │ ├── RecipeAPIService.ts │ │ │ └── RecipeScraperService.ts │ │ ├── ai/ │ │ │ └── MealSuggestionService.ts │ │ ├── storage/ │ │ │ ├── LocalStorageService.ts │ │ │ └── CloudSyncService.ts │ │ └── notifications/ │ │ └── NotificationService.ts │ ├── hooks/ # Custom React hooks │ │ ├── useCalendarSync.ts │ │ ├── useChores.ts │ │ ├── useMealPlanner. ts │ │ └── useProfiles.ts │ ├── store/ # State management (Redux Toolkit or Zustand) │ │ ├── slices/ │ │ │ ├── calendarSlice.ts │ │ │ ├── choresSlice.ts │ │ │ ├── mealPlannerSlice.ts │ │ │ ├── shoppingSlice.ts │ │ │ └── profileSlice. ts │ │ └── store.ts │ ├── utils/ # Utility functions │ │ ├── dateUtils.ts │ │ ├── colorUtils.ts │ │ └── validators.ts │ ├── types/ # TypeScript type definitions │ │ ├── calendar.types.ts │ │ ├── chore.types.ts │ │ ├── meal.types.ts │ │ └── profile.types.ts │ ├── config/ # Configuration files │ │ ├── api.config.ts │ │ └── app.config.ts │ └── App.tsx # Main app entry point ├── .env # Environment variables (API keys) ├── .gitignore ├── package.json ├── tsconfig.json ├── babel.config.js └── README.md


---

## **📦 Required Dependencies**

### **Core Dependencies:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-reanimated": "^3.6.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0"
  }
}

{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "redux-persist": "^6.0.0"
  }
}

{
  "dependencies": {
    "react-native-calendars": "^1.1305.0",
    "@react-native-community/datetimepicker": "^7.6.2",
    "date-fns": "^3.0.6",
    "rrule": "^2.8.1"
  }
}

{
  "dependencies": {
    "@react-native-google-signin/google-signin": "^11.0.0",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "axios": "^1.6.5",
    "ical. js": "^1.5.0",
    "react-native-caldav": "custom-implementation"
  }
}

{
  "dependencies": {
    "react-native-paper": "^5.11.6",
    "react-native-vector-icons": "^10.0.3",
    "react-native-svg": "^14.1.0",
    "react-native-linear-gradient": "^2.8.3",
    "lottie-react-native": "^6.5.1"
  }
}

{
  "dependencies": {
    "react-native-draggable-flatlist": "^4.0.1",
    "react-native-drax": "^0.11.0"
  }
}

{
  "dependencies": {
    "@react-native-community/netinfo": "^11.2.0",
    "realm": "^12.5.0",
    "react-native-sqlite-storage": "^6.0.1"
  }
}

{
  "dependencies": {
    "react-native-image-picker": "^7.1.0",
    "react-native-camera":  "^4.2.1",
    "react-native-vision-camera": "^3.6.17"
  }
}

{
  "dependencies": {
    "@notifee/react-native": "^7.8.2",
    "@react-native-firebase/messaging":  "^19.0.1"
  }
}

{
  "dependencies": {
    "react-query": "^3.39.3",
    "swr": "^2.2.4"
  }
}

🔐 API Keys & Services Required
1. Google Calendar API
Setup: Google Cloud Console
Credentials: OAuth 2.0 Client ID (Android)
Scopes: https://www.googleapis.com/auth/calendar
Documentation: https://developers.google.com/calendar/api
2. Microsoft Graph API (Outlook)
Setup: Azure Active Directory
Credentials: Application ID, Client Secret
Scopes: Calendars.ReadWrite
Documentation: https://learn.microsoft.com/en-us/graph/api/resources/calendar
3. CalDAV for Apple Calendar
Server URL: https://caldav.icloud.com/
Authentication: Apple ID + App-Specific Password
Library: Custom implementation or ical.js + axios
Documentation: https://developer.apple.com/documentation/devicemanagement/caldav
4. Recipe APIs
TheMealDB: Free tier available - https://www.themealdb.com/api.php
Spoonacular: 150 free requests/day - https://spoonacular.com/food-api
Edamam Recipe API: Free tier available - https://www.edamam.com/
5. AI Meal Planning (Optional)
OpenAI GPT-4: https://platform.openai.com/
Google Gemini API: https://ai.google.dev/
6. Weather API
OpenWeatherMap: Free tier - https://openweathermap.org/api
7. Cloud Storage & Sync
Firebase: Authentication, Firestore, Cloud Storage
Setup: Firebase Console - https://console.firebase.google.com/
🎨 UI/UX Design Guidelines
Design Principles:
Touch-First: All UI elements sized for finger touch (minimum 44x44dp)
High Contrast: Readable from 6-10 feet away
Color Coding: Consistent use of colors for family members
Visual Feedback: Animations, haptics, sounds for interactions
Accessibility: Large fonts, voice control support, screen reader compatible
Layout Guidelines:
Landscape Primary: Optimized for 16:9 or 16:10 displays
Portrait Support: Responsive layout for rotated displays
Grid System: 12-column responsive grid
Spacing: Consistent padding/margins (8dp base unit)
Color Palette (Customizable):

const FAMILY_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#95E1D3', // Mint
  '#A8E6CF', // Sage
  '#C7CEEA', // Lavender
  '#FFDAC1', // Peach
  '#B4A7D6', // Purple
];

const FONTS = {
  heading: { fontSize: 32, fontWeight: 'bold' },
  subheading: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 18, fontWeight: 'normal' },
  caption: { fontSize: 14, fontWeight: 'normal' },
};

interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
  isAdmin: boolean;
  createdAt: Date;
}

interface CalendarEvent {
  id:  string;
  title: string;
  description?:  string;
  startDate: Date;
  endDate: Date;
  allDay:  boolean;
  location?: string;
  profileId: string;
  calendarSource: 'google' | 'apple' | 'outlook' | 'local';
  sourceEventId?: string;
  recurrence?: RecurrenceRule;
  reminders:  Reminder[];
  color: string;
  attendees?:  string[];
  createdAt: Date;
  updatedAt: Date;
}

interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  daysOfWeek?: number[];
}

interface Reminder {
  minutes: number; // Minutes before event
  method: 'notification' | 'email';
}

interface Chore {
  id: string;
  title: string;
  description?:  string;
  assignedProfileId: string;
  dueDate?:  Date;
  status: 'pending' | 'in-progress' | 'completed';
  points:  number;
  recurrence?: RecurrenceRule;
  completedAt?: Date;
  createdAt: Date;
}

interface ChoreReward {
  id: string;
  title: string;
  description:  string;
  pointsCost: number;
  icon: string;
}

interface MealPlan {
  id:  string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId?:  string;
  customMeal?: string;
  servings: number;
  notes?: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients:  Ingredient[];
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number;
  servings: number;
  tags: string[];
  nutritionInfo?: NutritionInfo;
  sourceUrl?: string;
  isCustom: boolean;
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  addedBy: string; // profileId
  fromRecipeId?: string;
  createdAt: Date;
}

interface PantryItem {
  id:  string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate?:  Date;
  location?: string; // Fridge, Pantry, Freezer
  addedDate:  Date;
}

🚀 Development Phases
Phase 1: Foundation (Weeks 1-2)
 Initialize React Native project with TypeScript
 Set up development environment and VS Code extensions
 Configure Android build settings for Mini PC target
 Implement navigation structure
 Create base UI components (Button, Card, Modal, etc.)
 Set up Redux Toolkit store with persist
 Implement profile management (CRUD)
Phase 2: Calendar Integration (Weeks 3-5)
 Implement local calendar UI (day/week/month views)
 Integrate Google Calendar API with OAuth 2.0
 Implement CalDAV client for Apple Calendar
 Integrate Microsoft Graph API for Outlook
 Build calendar sync manager with conflict resolution
 Implement offline mode with local caching
 Add event CRUD operations
 Implement recurring events
Phase 3: Chore Management (Week 6)
 Create chore list UI with drag-and-drop
 Implement chore assignment and status updates
 Build reward/points system
 Create leaderboard with animations
 Add recurring chore scheduling
 Implement chore notifications
Phase 4: Meal Planner (Weeks 7-8)
 Design meal calendar UI
 Integrate recipe API (TheMealDB or Spoonacular)
 Implement custom recipe creation
 Build recipe search and filter
 Add meal assignment to calendar
 Implement ingredient extraction
 Auto-generate shopping lists from meals
Phase 5: Shopping List & Pantry (Week 9)
 Create shopping list UI with categories
 Implement real-time sync across devices
 Add pantry inventory management
 Implement expiration tracking
 Build low-stock alerts
 Add barcode scanner integration
Phase 6: Dashboard & Widgets (Week 10)
 Implement drag-and-drop dashboard
 Create resizable widget system
 Build all widget types (calendar, chores, weather, etc.)
 Implement dashboard profiles
 Add photo slideshow widget
 Optimize for landscape and portrait
Phase 7: Mobile Companion App (Week 11)
 Build mobile navigation structure
 Adapt UI for phone screens
 Implement push notifications
 Set up Firebase Cloud Messaging
 Test cross-device sync
Phase 8: Polish & Testing (Weeks 12-14)
 Implement animations and transitions
 Add sound effects and haptic feedback
 Optimize performance for large screens
 Implement data backup and restore
 Add settings and preferences
 Comprehensive testing on Android Mini PC
 Bug fixes and refinements
 User acceptance testing
Phase 9: Deployment (Week 15)
 Generate signed Android APK
 Create installation documentation
 Set up cloud backend (Firebase or custom)
 Deploy to internal distribution or Google Play Store
 Create user manual and tutorials


🧪 Testing Strategy
Unit Tests:
Jest for component and utility function testing
Test coverage target: 80%+
Integration Tests:
Test calendar sync flows
Test chore completion flows
Test meal planning workflows
E2E Tests:
Detox for React Native E2E testing
Test critical user journeys
Device Testing:
Test on actual Android Mini PC connected to touchscreen
Test various screen sizes (24", 32")
Test orientation changes
Test with multiple family members
🔧 VS Code Setup & Extensions
Required Extensions:

{
  "recommendations":  [
    "dsznajder.es7-react-js-snippets",
    "dbaeumer.vscode-eslint",
    "esbenp. prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "msjsdiag.vscode-react-native",
    "GitHub.copilot",
    "GitHub. copilot-chat",
    "formulahendry.auto-rename-tag",
    "jpoissonnier.vscode-styled-components",
    "bradlc.vscode-tailwindcss"
  ]
}

{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": {
    "*.tsx":  "typescriptreact"
  }
}

📚 Key Implementation Notes
CalDAV Integration for Apple Calendar:
Since there's no official Apple Calendar API, use CalDAV protocol:

// services/calendar/AppleCalendarService.ts
import axios from 'axios';
import ICAL from 'ical. js';

class AppleCalendarService {
  private baseURL = 'https://caldav.icloud.com';
  private username:  string;
  private password: string; // App-specific password

  async authenticate(email: string, appPassword: string) {
    this.username = email;
    this.password = appPassword;
    // Test connection with PROPFIND request
    const response = await axios({
      method: 'PROPFIND',
      url: `${this.baseURL}/${this.username}/calendars/`,
      auth: {
        username: this.username,
        password: this.password,
      },
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Depth': '1',
      },
    });
    return response.status === 207; // Multi-Status success
  }

  async getEvents(calendarPath: string, startDate: Date, endDate: Date) {
    const reportBody = `<?xml version="1.0" encoding="utf-8" ?>
      <C:calendar-query xmlns:D="DAV:" xmlns: C="urn:ietf:params:xml:ns:caldav">
        <D:prop>
          <D:getetag/>
          <C:calendar-data/>
        </D:prop>
        <C:filter>
          <C: comp-filter name="VCALENDAR">
            <C:comp-filter name="VEVENT">
              <C:time-range start="${startDate. toISOString()}" end="${endDate.toISOString()}"/>
            </C:comp-filter>
          </C:comp-filter>
        </C:filter>
      </C:calendar-query>`;

    const response = await axios({
      method: 'REPORT',
      url: `${this.baseURL}${calendarPath}`,
      auth: {
        username: this. username,
        password: this. password,
      },
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Depth': '1',
      },
      data: reportBody,
    });

    // Parse iCalendar data with ical.js
    const events = this.parseICalResponse(response.data);
    return events;
  }

  private parseICalResponse(xml: string): CalendarEvent[] {
    // Parse XML and extract VCALENDAR data
    // Use ical.js to parse iCalendar format
    // Convert to app's CalendarEvent format
    // Implementation details... 
  }

  async createEvent(calendarPath: string, event: CalendarEvent) {
    // Create iCalendar format with ical.js
    // Send PUT request to CalDAV server
  }

  async updateEvent(eventPath: string, event: CalendarEvent) {
    // Similar to createEvent but with existing event path
  }

  async deleteEvent(eventPath: string) {
    // Send DELETE request
  }
}

export default new AppleCalendarService();

// services/calendar/GoogleCalendarService.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

class GoogleCalendarService {
  async signIn() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId: process. env.GOOGLE_WEB_CLIENT_ID,
    });

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  }

  async getEvents(calendarId = 'primary', timeMin: Date, timeMax: Date) {
    const tokens = await GoogleSignin.getTokens();
    
    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
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

    return response.data.items. map(this.convertToAppEvent);
  }

  async createEvent(calendarId = 'primary', event: CalendarEvent) {
    const tokens = await GoogleSignin.getTokens();
    
    const response = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      this.convertToGoogleEvent(event),
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }

  private convertToAppEvent(googleEvent: any): CalendarEvent {
    // Convert Google Calendar format to app format
  }

  private convertToGoogleEvent(appEvent: CalendarEvent): any {
    // Convert app format to Google Calendar format
  }
}

export default new GoogleCalendarService();

// services/calendar/CalendarSyncManager.ts
import GoogleCalendarService from './GoogleCalendarService';
import AppleCalendarService from './AppleCalendarService';
import OutlookCalendarService from './OutlookCalendarService';
import { store } from '../../store/store';
import { setEvents } from '../../store/slices/calendarSlice';

class CalendarSyncManager {
  private syncInterval: NodeJS.Timeout | null = null;

  startAutoSync(intervalMinutes = 15) {
    this.syncAll();
    this.syncInterval = setInterval(() => {
      this.syncAll();
    }, intervalMinutes * 60 * 1000);
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this. syncInterval);
    }
  }

  async syncAll() {
    const state = store.getState();
    const connectedAccounts = state.calendar.connectedAccounts;

    const allEvents:  CalendarEvent[] = [];

    for (const account of connectedAccounts) {
      try {
        let events:  CalendarEvent[] = [];

        switch (account.type) {
          case 'google':
            events = await GoogleCalendarService.getEvents(
              account.calendarId,
              new Date(),
              addMonths(new Date(), 3)
            );
            break;
          case 'apple': 
            events = await AppleCalendarService.getEvents(
              account.calendarPath,
              new Date(),
              addMonths(new Date(), 3)
            );
            break;
          case 'outlook': 
            events = await OutlookCalendarService.getEvents(
              account.calendarId,
              new Date(),
              addMonths(new Date(), 3)
            );
            break;
        }

        allEvents.push(...events);
      } catch (error) {
        console.error(`Sync failed for ${account.type}:`, error);
      }
    }

    store.dispatch(setEvents(allEvents));
  }

  async pushLocalChanges() {
    // Get local changes that haven't been synced
    // Push to respective services
  }
}

export default new CalendarSyncManager();
