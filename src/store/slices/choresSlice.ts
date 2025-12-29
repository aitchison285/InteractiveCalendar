import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore, ChoreReward } from '@types/chore.types';

interface ChoresState {
  chores: Chore[];
  rewards: ChoreReward[];
  leaderboard: { [profileId: string]: number };
}

const initialState: ChoresState = {
  chores: [],
  rewards: [],
  leaderboard: {},
};

const choresSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {
    addChore: (state, action: PayloadAction<Chore>) => {
      state.chores.push(action.payload);
    },
    updateChore: (state, action: PayloadAction<Chore>) => {
      const index = state.chores.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.chores[index] = action.payload;
      }
    },
    deleteChore: (state, action: PayloadAction<string>) => {
      state.chores = state.chores.filter(c => c.id !== action.payload);
    },
    completeChore: (state, action: PayloadAction<string>) => {
      const chore = state.chores.find(c => c.id === action.payload);
      if (chore) {
        chore.status = 'completed';
        chore.completedAt = new Date();
        const currentPoints = state.leaderboard[chore.assignedProfileId] || 0;
        state.leaderboard[chore.assignedProfileId] = currentPoints + chore.points;
      }
    },
    addReward: (state, action: PayloadAction<ChoreReward>) => {
      state.rewards.push(action.payload);
    },
    updateLeaderboard: (state, action: PayloadAction<{ [profileId: string]: number }>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { addChore, updateChore, deleteChore, completeChore, addReward, updateLeaderboard } =
  choresSlice.actions;
export default choresSlice.reducer;
