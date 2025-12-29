# Changelog

All notable changes to the Family Calendar Touch Display Application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added (Phase 2 - Calendar Integration - In Progress)
- Complete Android native configuration
  - AndroidManifest.xml with all required permissions
  - Gradle build system (build.gradle, settings.gradle, gradle.properties)
  - MainActivity and MainApplication Java classes
  - ProGuard rules and debug keystore
  - Android resources (strings, styles, mipmaps)
- React Navigation structure
  - Stack Navigator for modal/detail screens
  - Bottom Tab Navigator with 6 main screens
  - MaterialCommunityIcons integration
- Placeholder screens (9 total):
  - HomeScreen, CalendarScreen, ChoresScreen
  - MealPlannerScreen, ShoppingScreen, SettingsScreen
  - ProfileSetupScreen, EventDetailScreen, AddEventScreen
- Common UI components:
  - Button (4 variants, 3 sizes, loading/disabled states)
  - Card (elevation, customizable styling)
  - Modal (overlay, title, close button)
  - LoadingSpinner (customizable size/color/text)
- App integration with navigation system
- GestureHandlerRootView for navigation gestures
- PHASE2_SUMMARY.md documenting progress

### Changed
- Updated App.tsx to use AppNavigator instead of placeholder UI
- Fixed package.json dependency conflict (react-test-renderer)
- Updated TODO.md to reflect Phase 2 progress

### Added (Phase 1 - Foundation)
- Initial project structure with React Native and TypeScript
- Redux Toolkit store with persistence (AsyncStorage)
- Type definitions for all major entities (Profile, Calendar, Chore, Meal, Shopping)
- Configuration files (app.config.ts, api.config.ts)
- Calendar synchronization services:
  - Google Calendar Service (OAuth 2.0)
  - Apple Calendar Service (CalDAV)
  - Outlook Calendar Service (Microsoft Graph API)
  - Calendar Sync Manager (unified orchestration)
- Recipe API Service (TheMealDB integration)
- Local Storage Service (AsyncStorage wrapper)
- Utility functions:
  - Date utilities (formatting, calculations)
  - Color utilities (manipulation, contrast)
  - Validators (email, URL, date)
- Redux slices:
  - Profile slice with CRUD operations
  - Calendar slice with event management
  - Chores slice with reward system
  - Meal planner slice with recipe management
  - Shopping slice with pantry management
- Main App.tsx with Redux Provider
- Comprehensive documentation (README.md, STATUS.txt, TODO.md)
- ESLint and Prettier configuration
- Jest testing configuration
- Metro bundler configuration
- Environment variable template (.env.example)

### Changed
- N/A (Initial release)

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- Implemented environment variable management for API keys
- Set up secure authentication patterns for calendar services

## [1.0.0] - TBD

Initial release targeting Android Mini PC touchscreen displays.

### Core Features
- Multi-user family profiles (up to 8 members)
- Universal calendar synchronization (Google, Apple, Outlook)
- Chore chart with point-based reward system
- Meal planner with recipe database
- Shopping list with pantry management
- Customizable dashboard with widgets
- Mobile companion app (iOS and Android)
