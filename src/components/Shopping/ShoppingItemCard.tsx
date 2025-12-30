import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingItem } from '../../types/meal.types';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle?: (item: ShoppingItem) => void;
  onDelete?: (item: ShoppingItem) => void;
  addedByName?: string;
}

export default function ShoppingItemCard({
  item,
  onToggle,
  onDelete,
  addedByName,
}: ShoppingItemCardProps) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle(item);
    }
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      produce: '🥬',
      dairy: '🥛',
      meat: '🥩',
      pantry: '🥫',
      frozen: '🧊',
      household: '🧹',
      bakery: '🍞',
      beverages: '🥤',
    };
    return icons[category.toLowerCase()] || '🛒';
  };

  return (
    <TouchableOpacity
      style={[styles.container, item.checked && styles.containerChecked]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={handleToggle}
      >
        {item.checked && (
          <View style={styles.checkboxChecked}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.categoryIcon}>
            {getCategoryIcon(item.category)}
          </Text>
          <Text
            style={[styles.name, item.checked && styles.nameChecked]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.quantity}>
            {item.quantity} {item.unit}
          </Text>
          {addedByName && (
            <Text style={styles.addedBy}>
              Added by {addedByName}
            </Text>
          )}
        </View>

        {item.fromRecipeId && (
          <View style={styles.recipeTag}>
            <Text style={styles.recipeTagText}>From recipe</Text>
          </View>
        )}
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerChecked: {
    opacity: 0.6,
    backgroundColor: '#f9f9f9',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  nameChecked: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  addedBy: {
    fontSize: 12,
    color: '#999',
  },
  recipeTag: {
    backgroundColor: '#FFE66D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  recipeTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});
