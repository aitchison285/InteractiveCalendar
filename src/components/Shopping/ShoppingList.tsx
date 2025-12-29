import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ShoppingItem } from '../../types/meal.types';
import { Profile } from '../../types/profile.types';
import ShoppingItemCard from './ShoppingItemCard';

interface ShoppingListProps {
  items: ShoppingItem[];
  profiles: Profile[];
  onToggleItem?: (item: ShoppingItem) => void;
  onDeleteItem?: (item: ShoppingItem) => void;
  onAddItem?: () => void;
  groupByCategory?: boolean;
  showChecked?: boolean;
}

export default function ShoppingList({
  items,
  profiles,
  onToggleItem,
  onDeleteItem,
  onAddItem,
  groupByCategory = true,
  showChecked = true,
}: ShoppingListProps) {
  
  const getProfileById = (profileId: string) => {
    return profiles.find((p) => p.id === profileId);
  };

  const filteredItems = showChecked
    ? items
    : items.filter((item) => !item.checked);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyText}>Your shopping list is empty</Text>
      {onAddItem && (
        <TouchableOpacity style={styles.addButton} onPress={onAddItem}>
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (sortedItems.length === 0) {
    return renderEmptyState();
  }

  if (groupByCategory) {
    const itemsByCategory: { [key: string]: ShoppingItem[] } = {};
    
    sortedItems.forEach((item) => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });

    const categories = Object.keys(itemsByCategory).sort();

    return (
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item: category }) => {
          const categoryItems = itemsByCategory[category];
          
          return (
            <View style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {categoryItems.filter((i) => !i.checked).length} / {categoryItems.length}
                </Text>
              </View>
              {categoryItems.map((item) => {
                const profile = getProfileById(item.addedBy);
                return (
                  <ShoppingItemCard
                    key={item.id}
                    item={item}
                    addedByName={profile?.name}
                    onToggle={onToggleItem}
                    onDelete={onDeleteItem}
                  />
                );
              })}
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <FlatList
      data={sortedItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const profile = getProfileById(item.addedBy);
        return (
          <ShoppingItemCard
            item={item}
            addedByName={profile?.name}
            onToggle={onToggleItem}
            onDelete={onDeleteItem}
          />
        );
      }}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 300,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
