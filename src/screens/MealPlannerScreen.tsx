import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MealCalendar, RecipeSearch } from '../components/MealPlanner';
import { MealPlan } from '../types/meal.types';

export default function MealPlannerScreen() {
  const mealPlans = useSelector((state: RootState) => state.mealPlanner.mealPlans);
  const recipes = useSelector((state: RootState) => state.mealPlanner.recipes);
  const [viewMode, setViewMode] = useState<'calendar' | 'recipes'>('calendar');

  const handleMealPress = (mealPlan: MealPlan) => {
    console.log('Meal pressed:', mealPlan);
    // TODO: Navigate to meal detail or edit screen
  };

  const handleAddMeal = (date: Date, mealType: MealPlan['mealType']) => {
    console.log('Add meal for:', date, mealType);
    // TODO: Open meal selection or add meal screen
  };

  const handleRecipeSelect = (recipe: any) => {
    console.log('Recipe selected:', recipe);
    // TODO: Navigate to recipe detail screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Planner</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'calendar' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('calendar')}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'calendar' && styles.toggleTextActive,
              ]}
            >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'recipes' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('recipes')}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'recipes' && styles.toggleTextActive,
              ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'calendar' ? (
        <MealCalendar
          mealPlans={mealPlans}
          onMealPress={handleMealPress}
          onAddMeal={handleAddMeal}
        />
      ) : (
        <RecipeSearch
          recipes={recipes}
          onRecipeSelect={handleRecipeSelect}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
