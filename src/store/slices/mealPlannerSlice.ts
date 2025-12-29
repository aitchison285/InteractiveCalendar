import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealPlan, Recipe } from '@types/meal.types';

interface MealPlannerState {
  mealPlans: MealPlan[];
  recipes: Recipe[];
  favoriteRecipes: string[];
}

const initialState: MealPlannerState = {
  mealPlans: [],
  recipes: [],
  favoriteRecipes: [],
};

const mealPlannerSlice = createSlice({
  name: 'mealPlanner',
  initialState,
  reducers: {
    addMealPlan: (state, action: PayloadAction<MealPlan>) => {
      state.mealPlans.push(action.payload);
    },
    updateMealPlan: (state, action: PayloadAction<MealPlan>) => {
      const index = state.mealPlans.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.mealPlans[index] = action.payload;
      }
    },
    deleteMealPlan: (state, action: PayloadAction<string>) => {
      state.mealPlans = state.mealPlans.filter(m => m.id !== action.payload);
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    toggleFavoriteRecipe: (state, action: PayloadAction<string>) => {
      const index = state.favoriteRecipes.indexOf(action.payload);
      if (index === -1) {
        state.favoriteRecipes.push(action.payload);
      } else {
        state.favoriteRecipes.splice(index, 1);
      }
    },
  },
});

export const {
  addMealPlan,
  updateMealPlan,
  deleteMealPlan,
  addRecipe,
  setRecipes,
  toggleFavoriteRecipe,
} = mealPlannerSlice.actions;
export default mealPlannerSlice.reducer;
