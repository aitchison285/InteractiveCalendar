# Family Calendar Touch Display Application

## 📋 Project Overview

A comprehensive family calendar application for Android Mini PC touchscreen displays (24-32 inch) that provides a centralized family organization hub with calendar sync, chore management, meal planning, and shopping lists.

## 🚀 Features

### Multi-User Family Profiles
- Support up to 8 family member profiles
- Custom avatars and color coding
- Individual calendar views
- Profile management (add, edit, delete, reorder)

### Universal Calendar Synchronization
- Two-way sync with Google Calendar, Apple Calendar/iCloud, Outlook/Microsoft 365
- Real-time synchronization (polling every 5-15 minutes)
- Offline mode with local caching
- Color-coded events by family member
- Recurring event support

### Chore Chart & Task Management
- Assign chores to family members
- Recurring schedule support
- Point-based reward system
- Leaderboard with rankings
- Calendar integration

### Meal Planner
- Visual weekly meal calendar
- 5000+ built-in recipes via TheMealDB API
- Custom recipe creation
- Recipe search and filtering
- Auto-generate shopping lists from meals
- Pantry inventory tracking

### Shopping List & Pantry Management
- Collaborative shopping list
- Real-time sync across devices
- Category organization
- Barcode scanner support
- Expiration date tracking

### Customizable Dashboard
- Drag-and-drop widget system
- Multiple widget types (Calendar, Chores, Meals, Weather, etc.)
- Per-user custom dashboards
- Portrait and landscape orientation support

## 🛠️ Technology Stack

- **Framework**: React Native 0.73+
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation
- **Storage**: AsyncStorage + Realm/SQLite
- **Calendar Sync**: Google Calendar API, CalDAV (Apple), Microsoft Graph API
- **UI Components**: React Native Paper
- **Date Handling**: date-fns
- **API Integration**: Axios

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 9+
- Android Studio with Android SDK
- Java Development Kit (JDK) 11+

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/aitchison285/InteractiveCalendar.git
   cd InteractiveCalendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

4. **Install Android dependencies**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## 🔑 API Configuration

### Required API Keys

1. **Google Calendar API**
   - Setup: [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Calendar API
   - Create OAuth 2.0 credentials (Android)

2. **Microsoft Graph API** (for Outlook)
   - Setup: [Azure Active Directory](https://portal.azure.com/)
   - Register application
   - Configure permissions: Calendars.ReadWrite

3. **Apple Calendar** (CalDAV)
   - Use Apple ID email + app-specific password
   - Generate app-specific password in Apple ID settings

4. **Recipe APIs**
   - TheMealDB: Free tier available
   - Alternative: Spoonacular or Edamam

5. **Weather API** (Optional)
   - OpenWeatherMap: Free tier available

Add all API keys to your `.env` file (see `.env.example` for template).

## 📁 Project Structure

```
family-calendar-app/
├── android/              # Android native code
├── ios/                  # iOS native code (for companion app)
├── src/
│   ├── assets/          # Images, fonts, icons
│   ├── components/      # Reusable React components
│   │   ├── Calendar/
│   │   ├── Chores/
│   │   ├── MealPlanner/
│   │   ├── Shopping/
│   │   ├── Dashboard/
│   │   ├── Profiles/
│   │   └── Common/
│   ├── screens/         # Main app screens
│   ├── navigation/      # React Navigation setup
│   ├── services/        # API and external services
│   │   ├── calendar/
│   │   ├── recipes/
│   │   ├── storage/
│   │   └── notifications/
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Redux store and slices
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── config/          # Configuration files
│   └── App.tsx          # Main app entry point
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Development Status

### ✅ Completed
- Project structure initialization
- TypeScript configuration
- Redux store setup with persistence
- Type definitions for all major entities
- Calendar service implementations (Google, Apple, Outlook)
- Recipe API service
- Configuration files
- Utility functions

### 🚧 In Progress
- UI component implementation
- Navigation setup
- Screen development
- Calendar sync integration

### 📋 TODO
- Chore management UI
- Meal planner UI
- Shopping list UI
- Dashboard with widgets
- Mobile companion app
- Testing and optimization
- Android APK generation

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 📱 Build for Production

### Android APK
```bash
npm run build:android
# APK will be in: android/app/build/outputs/apk/release/
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Please contact the repository owner for contribution guidelines.

## 📞 Support

For issues and questions, please create an issue in the GitHub repository or contact the project maintainer.

## 🎯 Target Device Requirements

- **Platform**: Android Mini PC
- **Minimum Android Version**: 9.0 (API 28)
- **Target Android Version**: 13+ (API 33+)
- **Screen Size**: 24-32 inch touchscreen display
- **Orientation**: Landscape primary, portrait support
- **Input**: Touch-first interface

## 🔄 Version History

### v1.0.0 (In Development)
- Initial project setup
- Core architecture implementation
- Calendar sync services
- Basic state management
