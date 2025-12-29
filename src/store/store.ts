import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import profileReducer from './slices/profileSlice';
import calendarReducer from './slices/calendarSlice';
import choresReducer from './slices/choresSlice';
import mealPlannerReducer from './slices/mealPlannerSlice';
import shoppingReducer from './slices/shoppingSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile', 'calendar', 'chores', 'mealPlanner', 'shopping'],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  calendar: calendarReducer,
  chores: choresReducer,
  mealPlanner: mealPlannerReducer,
  shopping: shoppingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
