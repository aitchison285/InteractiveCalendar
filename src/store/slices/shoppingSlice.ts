import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingItem, PantryItem } from '@types/meal.types';

interface ShoppingState {
  shoppingList: ShoppingItem[];
  pantry: PantryItem[];
}

const initialState: ShoppingState = {
  shoppingList: [],
  pantry: [],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.shoppingList.push(action.payload);
    },
    updateShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.shoppingList.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.shoppingList[index] = action.payload;
      }
    },
    deleteShoppingItem: (state, action: PayloadAction<string>) => {
      state.shoppingList = state.shoppingList.filter(i => i.id !== action.payload);
    },
    toggleShoppingItem: (state, action: PayloadAction<string>) => {
      const item = state.shoppingList.find(i => i.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },
    addPantryItem: (state, action: PayloadAction<PantryItem>) => {
      state.pantry.push(action.payload);
    },
    updatePantryItem: (state, action: PayloadAction<PantryItem>) => {
      const index = state.pantry.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.pantry[index] = action.payload;
      }
    },
    deletePantryItem: (state, action: PayloadAction<string>) => {
      state.pantry = state.pantry.filter(i => i.id !== action.payload);
    },
  },
});

export const {
  addShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
  toggleShoppingItem,
  addPantryItem,
  updatePantryItem,
  deletePantryItem,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
