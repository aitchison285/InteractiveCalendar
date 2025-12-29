# Family Calendar Android Build Configuration

This directory contains Android-specific configuration for the Family Calendar application.

## Requirements
- Android Studio Arctic Fox or later
- Android SDK API 28+ (minimum)
- Android SDK API 33+ (target)
- Gradle 7.0+
- JDK 11+

## Build Commands

### Debug Build
```bash
cd android
./gradlew assembleDebug
```

### Release Build
```bash
cd android
./gradlew assembleRelease
```

## Configuration Files

- `build.gradle` - Project-level build configuration
- `app/build.gradle` - App-level build configuration
- `app/src/main/AndroidManifest.xml` - App manifest with permissions
- `gradle.properties` - Gradle properties
- `settings.gradle` - Project settings

## Permissions

The app requires the following permissions:
- INTERNET - For API calls and calendar sync
- ACCESS_NETWORK_STATE - For checking connectivity
- CAMERA - For barcode scanning and photo capture
- READ_EXTERNAL_STORAGE - For photo selection
- WRITE_EXTERNAL_STORAGE - For saving data
- WAKE_LOCK - For notifications

## Note

Full Android configuration will be added in Phase 2 of development.
For now, this directory serves as a placeholder for Android-specific files.
