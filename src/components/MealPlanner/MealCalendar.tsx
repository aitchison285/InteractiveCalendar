import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MealPlan } from '../../types/meal.types';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

interface MealCalendarProps {
  mealPlans: MealPlan[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMealPress?: (mealPlan: MealPlan) => void;
  onAddMeal?: (date: Date, mealType: MealPlan['mealType']) => void;
}

export default function MealCalendar({
  mealPlans,
  selectedDate = new Date(),
  onDateSelect,
  onMealPress,
  onAddMeal,
}: MealCalendarProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const mealTypes: Array<MealPlan['mealType']> = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getMealForDateAndType = (date: Date, mealType: MealPlan['mealType']) => {
    return mealPlans.find(
      (meal) =>
        isSameDay(new Date(meal.date), date) && meal.mealType === mealType
    );
  };

  const getMealTypeIcon = (mealType: MealPlan['mealType']) => {
    switch (mealType) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🥗';
      case 'dinner': return '🍽️';
      case 'snack': return '🍎';
      default: return '🍴';
    }
  };

  const renderDayColumn = (date: Date) => {
    const isToday = isSameDay(date, new Date());
    const isSelected = isSameDay(date, selectedDate);

    return (
      <View key={date.toISOString()} style={styles.dayColumn}>
        <TouchableOpacity
          style={[
            styles.dayHeader,
            isToday && styles.dayHeaderToday,
            isSelected && styles.dayHeaderSelected,
          ]}
          onPress={() => onDateSelect?.(date)}
        >
          <Text style={[styles.dayName, (isToday || isSelected) && styles.dayNameActive]}>
            {format(date, 'EEE')}
          </Text>
          <Text style={[styles.dayNumber, (isToday || isSelected) && styles.dayNumberActive]}>
            {format(date, 'd')}
          </Text>
        </TouchableOpacity>

        <View style={styles.mealsContainer}>
          {mealTypes.map((mealType) => {
            const meal = getMealForDateAndType(date, mealType);
            
            return (
              <TouchableOpacity
                key={mealType}
                style={[styles.mealSlot, meal && styles.mealSlotFilled]}
                onPress={() => {
                  if (meal) {
                    onMealPress?.(meal);
                  } else {
                    onAddMeal?.(date, mealType);
                  }
                }}
              >
                <Text style={styles.mealIcon}>{getMealTypeIcon(mealType)}</Text>
                {meal ? (
                  <Text style={styles.mealText} numberOfLines={2}>
                    {meal.customMeal || meal.recipeId}
                  </Text>
                ) : (
                  <Text style={styles.addText}>+</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.weekLabel}>
          {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </Text>
      </View>

      <View style={styles.mealTypeLabels}>
        <View style={styles.labelColumn}>
          {mealTypes.map((type) => (
            <View key={type} style={styles.labelRow}>
              <Text style={styles.labelText}>
                {getMealTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        horizontal
        data={weekDays}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => renderDayColumn(item)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mealTypeLabels: {
    position: 'absolute',
    top: 70,
    left: 0,
    zIndex: 1,
    backgroundColor: '#f9f9f9',
  },
  labelColumn: {
    paddingVertical: 8,
  },
  labelRow: {
    height: 80,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  weekContainer: {
    paddingLeft: 120,
  },
  dayColumn: {
    width: 120,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  dayHeader: {
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayHeaderToday: {
    backgroundColor: '#fff3cd',
  },
  dayHeaderSelected: {
    backgroundColor: '#4ECDC4',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  dayNameActive: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dayNumberActive: {
    color: '#fff',
  },
  mealsContainer: {
    paddingVertical: 8,
  },
  mealSlot: {
    height: 80,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealSlotFilled: {
    backgroundColor: '#f0f9ff',
  },
  mealIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  mealText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
  },
  addText: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
});
