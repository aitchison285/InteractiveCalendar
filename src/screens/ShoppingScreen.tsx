import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleShoppingItem, removeShoppingItem } from '../store/slices/shoppingSlice';
import { ShoppingList, PantryTracker } from '../components/Shopping';
import { ShoppingItem, PantryItem } from '../types/meal.types';

export default function ShoppingScreen() {
  const dispatch = useDispatch();
  const shoppingItems = useSelector((state: RootState) => state.shopping.shoppingList);
  const pantryItems = useSelector((state: RootState) => state.shopping.pantry);
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const [activeTab, setActiveTab] = useState<'shopping' | 'pantry'>('shopping');

  const handleToggleItem = (item: ShoppingItem) => {
    dispatch(toggleShoppingItem(item.id));
  };

  const handleDeleteItem = (item: ShoppingItem) => {
    dispatch(removeShoppingItem(item.id));
  };

  const handlePantryItemPress = (item: PantryItem) => {
    console.log('Pantry item pressed:', item);
    // TODO: Navigate to pantry item detail/edit screen
  };

  const handleDeletePantryItem = (item: PantryItem) => {
    console.log('Delete pantry item:', item);
    // TODO: Implement pantry item deletion
  };

  const handleAddItem = () => {
    console.log('Add item');
    // TODO: Open add item modal/screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping & Pantry</Text>
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'shopping' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('shopping')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'shopping' && styles.tabTextActive,
              ]}
            >
              Shopping List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'pantry' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('pantry')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'pantry' && styles.tabTextActive,
              ]}
            >
              Pantry
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'shopping' ? (
        <ShoppingList
          items={shoppingItems}
          profiles={profiles}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onAddItem={handleAddItem}
          groupByCategory={true}
          showChecked={true}
        />
      ) : (
        <PantryTracker
          items={pantryItems}
          onItemPress={handlePantryItemPress}
          onDeleteItem={handleDeletePantryItem}
          onAddItem={handleAddItem}
          groupByLocation={true}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#4ECDC4',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
