import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Widget from './Widget';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

export default function MealWidget() {
  const mealPlans = useSelector((state: RootState) => state.mealPlanner.mealPlans);
  const recipes = useSelector((state: RootState) => state.mealPlanner.recipes);

  const today = new Date();
  const todaysMeals = mealPlans.filter((meal) =>
    isSameDay(new Date(meal.date), today)
  );

  const getMealTypeIcon = (mealType: string) => {
    const icons: { [key: string]: string } = {
      breakfast: '🍳',
      lunch: '🥗',
      dinner: '🍽️',
      snack: '🍎',
    };
    return icons[mealType] || '🍴';
  };

  const renderMeal = (meal: any) => {
    const recipe = recipes.find((r) => r.id === meal.recipeId);
    const mealName = meal.customMeal || recipe?.title || 'Planned meal';

    return (
      <View key={`${meal.mealType}-${meal.date}`} style={styles.mealItem}>
        <Text style={styles.mealIcon}>{getMealTypeIcon(meal.mealType)}</Text>
        <View style={styles.mealContent}>
          <Text style={styles.mealType}>
            {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
          </Text>
          <Text style={styles.mealName} numberOfLines={1}>
            {mealName}
          </Text>
        </View>
      </View>
    );
  };

  // Get this week's meals count
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekMealsCount = mealPlans.filter((meal) => {
    const mealDate = new Date(meal.date);
    return mealDate >= weekStart && mealDate <= addDays(weekStart, 6);
  }).length;

  return (
    <Widget title="🍽️ Meals Today" size="medium">
      {todaysMeals.length > 0 ? (
        <>
          <View style={styles.mealsContainer}>
            {todaysMeals.map(renderMeal)}
          </View>
          <View style={styles.weekStats}>
            <Text style={styles.weekStatsText}>
              {weekMealsCount} meals planned this week
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🍴</Text>
          <Text style={styles.emptyText}>No meals planned today</Text>
          <Text style={styles.emptySubtext}>Tap to add meals</Text>
        </View>
      )}
    </Widget>
  );
}

const styles = StyleSheet.create({
  mealsContainer: {
    flex: 1,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  mealIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  mealContent: {
    flex: 1,
  },
  mealType: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  mealName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  weekStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  weekStatsText: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
