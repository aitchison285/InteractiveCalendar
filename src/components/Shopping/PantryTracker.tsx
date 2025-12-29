import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PantryItem } from '../../types/meal.types';
import PantryItemCard from './PantryItemCard';
import { isPast, isToday, differenceInDays } from 'date-fns';

interface PantryTrackerProps {
  items: PantryItem[];
  onItemPress?: (item: PantryItem) => void;
  onDeleteItem?: (item: PantryItem) => void;
  onAddItem?: () => void;
  groupByLocation?: boolean;
}

export default function PantryTracker({
  items,
  onItemPress,
  onDeleteItem,
  onAddItem,
  groupByLocation = true,
}: PantryTrackerProps) {
  
  const sortedItems = [...items].sort((a, b) => {
    // Sort by expiration date (soonest first)
    if (a.expirationDate && b.expirationDate) {
      return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
    }
    if (a.expirationDate) return -1;
    if (b.expirationDate) return 1;
    return a.name.localeCompare(b.name);
  });

  const getExpiringCount = () => {
    return items.filter((item) => {
      if (!item.expirationDate) return false;
      const expirationDate = new Date(item.expirationDate);
      if (isPast(expirationDate) && !isToday(expirationDate)) return true;
      const daysUntilExpiration = differenceInDays(expirationDate, new Date());
      return daysUntilExpiration <= 3;
    }).length;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyText}>Your pantry is empty</Text>
      {onAddItem && (
        <TouchableOpacity style={styles.addButton} onPress={onAddItem}>
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (items.length === 0) {
    return renderEmptyState();
  }

  if (groupByLocation) {
    const itemsByLocation: { [key: string]: PantryItem[] } = {};
    
    sortedItems.forEach((item) => {
      const location = item.location || 'Other';
      if (!itemsByLocation[location]) {
        itemsByLocation[location] = [];
      }
      itemsByLocation[location].push(item);
    });

    const locations = Object.keys(itemsByLocation).sort();

    return (
      <View style={styles.container}>
        {getExpiringCount() > 0 && (
          <View style={styles.alertBanner}>
            <Text style={styles.alertText}>
              ⚠️ {getExpiringCount()} {getExpiringCount() === 1 ? 'item' : 'items'} expiring soon
            </Text>
          </View>
        )}

        <FlatList
          data={locations}
          keyExtractor={(item) => item}
          renderItem={({ item: location }) => {
            const locationItems = itemsByLocation[location];
            
            return (
              <View style={styles.locationSection}>
                <View style={styles.locationHeader}>
                  <Text style={styles.locationTitle}>{location}</Text>
                  <Text style={styles.locationCount}>
                    {locationItems.length} {locationItems.length === 1 ? 'item' : 'items'}
                  </Text>
                </View>
                {locationItems.map((item) => (
                  <PantryItemCard
                    key={item.id}
                    item={item}
                    onPress={onItemPress}
                    onDelete={onDeleteItem}
                  />
                ))}
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {getExpiringCount() > 0 && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>
            ⚠️ {getExpiringCount()} {getExpiringCount() === 1 ? 'item' : 'items'} expiring soon
          </Text>
        </View>
      )}

      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PantryItemCard
            item={item}
            onPress={onItemPress}
            onDelete={onDeleteItem}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertBanner: {
    backgroundColor: '#FFE66D',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  locationSection: {
    marginBottom: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 4,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  locationCount: {
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
