import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@types/profile.types';

interface ProfileState {
  profiles: Profile[];
  activeProfileId: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  activeProfileId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(p => p.id !== action.payload);
      if (state.activeProfileId === action.payload) {
        state.activeProfileId = state.profiles[0]?.id || null;
      }
    },
    setActiveProfile: (state, action: PayloadAction<string>) => {
      state.activeProfileId = action.payload;
    },
  },
});

export const { addProfile, updateProfile, deleteProfile, setActiveProfile } = profileSlice.actions;
export default profileSlice.reducer;
