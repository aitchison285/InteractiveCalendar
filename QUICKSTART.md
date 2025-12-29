# Quick Start Guide - Family Calendar Application

## 🚀 Getting Started in 5 Minutes

### Prerequisites Check
```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
```

### Step 1: Install Dependencies
```bash
cd /home/runner/work/InteractiveCalendar/InteractiveCalendar
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add at minimum:
# - GOOGLE_WEB_CLIENT_ID (for Google Calendar sync)
# - THEMEALDB_API_KEY (or use free tier)
```

### Step 3: Run the Application

#### On Android Device/Emulator
```bash
# Start Metro bundler
npm start

# In another terminal, run on Android
npm run android
```

#### Build for Production
```bash
npm run build:android
# APK will be in: android/app/build/outputs/apk/release/
```

## 📁 Project Structure Overview

```
InteractiveCalendar/
├── src/
│   ├── components/     # React components (to be implemented)
│   ├── screens/        # App screens (to be implemented)
│   ├── services/       # API services ✅
│   │   ├── calendar/   # Google, Apple, Outlook sync
│   │   ├── recipes/    # TheMealDB API
│   │   └── storage/    # Local storage wrapper
│   ├── store/          # Redux state management ✅
│   │   ├── slices/     # Redux slices for each feature
│   │   └── store.ts    # Main store configuration
│   ├── types/          # TypeScript type definitions ✅
│   ├── utils/          # Utility functions ✅
│   └── config/         # Configuration files ✅
├── App.tsx             # Main app component ✅
└── package.json        # Dependencies ✅
```

✅ = Implemented | ⏳ = In Progress | ❌ = Not Started

## 🎯 Current Status: Phase 1 Complete

### What's Working
- ✅ Project structure and configuration
- ✅ Redux store with persistence
- ✅ Calendar sync services (Google, Apple, Outlook)
- ✅ Recipe API integration
- ✅ Type-safe TypeScript throughout
- ✅ Utility functions (date, color, validation)

### What's Next (Phase 2)
- ⏳ React Navigation setup
- ⏳ UI Components (Button, Card, Modal, etc.)
- ⏳ Calendar UI (Day/Week/Month views)
- ⏳ Profile management UI

## 🔑 API Keys Needed

### Required (Core Features)
1. **Google Calendar API** - For calendar synchronization
   - Get at: https://console.cloud.google.com/
   - Enable Google Calendar API
   - Create OAuth 2.0 credentials

### Optional (Enhanced Features)
2. **Microsoft Graph API** - For Outlook calendar
3. **Apple CalDAV** - For Apple Calendar (uses app-specific password)
4. **TheMealDB** - Recipe database (free tier available)
5. **OpenWeatherMap** - Weather widget (free tier available)

## 📖 Documentation

- **README.md** - Full project documentation
- **STATUS.txt** - Detailed status report with all progress
- **TODO.md** - Development phases and tasks
- **COPILOT-AGENT-DOCUMENTATION.md** - Complete requirements specification
- **CHANGELOG.md** - Version history

## 🐛 Troubleshooting

### Common Issues

**Issue: Metro bundler won't start**
```bash
# Clear Metro cache
npm start -- --reset-cache
```

**Issue: Android build fails**
```bash
cd android
./gradlew clean
cd ..
```

**Issue: Module not found errors**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 🤝 Development Workflow

1. **Make changes** to TypeScript files in `src/`
2. **Test locally** with `npm start` and `npm run android`
3. **Run linter** with `npm run lint`
4. **Run tests** with `npm test`
5. **Build APK** with `npm run build:android`

## 💡 Tips for Developers

- Use VS Code for best experience (extensions already configured)
- TypeScript is strict - add proper types for all code
- Follow existing patterns in `src/services/` and `src/store/`
- Redux store is configured with Redux DevTools for debugging
- Use path aliases: `@services/`, `@components/`, `@utils/`, etc.

## 📞 Need Help?

- Check **STATUS.txt** for detailed implementation notes
- Review **COPILOT-AGENT-DOCUMENTATION.md** for requirements
- See **TODO.md** for planned features
- Create a GitHub issue for bugs or questions

## 🎉 Features to Implement Next

1. **Navigation** - React Navigation with stack and tab navigators
2. **UI Components** - Reusable Button, Card, Modal components
3. **Home Screen** - Dashboard with widgets
4. **Calendar Screen** - Day/Week/Month views with events
5. **Profile Screen** - Family member management

---

**Ready to build?** Run `npm install` and let's get coding! 🚀
