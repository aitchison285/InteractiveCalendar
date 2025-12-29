export interface MealPlan {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId?: string;
  customMeal?: string;
  servings: number;
  notes?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  nutritionInfo?: NutritionInfo;
  sourceUrl?: string;
  isCustom: boolean;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  addedBy: string;
  fromRecipeId?: string;
  createdAt: Date;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate?: Date;
  location?: string;
  addedDate: Date;
}
