import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PantryItem } from '../../types/meal.types';
import { format, isPast, isToday, differenceInDays } from 'date-fns';

interface PantryItemCardProps {
  item: PantryItem;
  onPress?: (item: PantryItem) => void;
  onDelete?: (item: PantryItem) => void;
}

export default function PantryItemCard({
  item,
  onPress,
  onDelete,
}: PantryItemCardProps) {
  
  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item);
    }
  };

  const getExpirationStatus = () => {
    if (!item.expirationDate) {
      return { status: 'none', color: '#999', text: 'No expiration' };
    }

    const expirationDate = new Date(item.expirationDate);
    
    if (isPast(expirationDate) && !isToday(expirationDate)) {
      return { status: 'expired', color: '#ff6b6b', text: 'Expired' };
    }

    const daysUntilExpiration = differenceInDays(expirationDate, new Date());
    
    if (isToday(expirationDate) || daysUntilExpiration === 0) {
      return { status: 'today', color: '#FF9800', text: 'Expires today' };
    }

    if (daysUntilExpiration <= 3) {
      return { status: 'soon', color: '#FFB74D', text: `${daysUntilExpiration} days` };
    }

    return { 
      status: 'good', 
      color: '#4CAF50', 
      text: format(expirationDate, 'MMM d') 
    };
  };

  const expirationStatus = getExpirationStatus();

  const getLocationIcon = (location?: string) => {
    if (!location) return '📦';
    switch (location.toLowerCase()) {
      case 'fridge':
        return '❄️';
      case 'freezer':
        return '🧊';
      case 'pantry':
        return '🗄️';
      default:
        return '📦';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        expirationStatus.status === 'expired' && styles.containerExpired,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.locationIcon}>
            {getLocationIcon(item.location)}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.quantity}>
            {item.quantity} {item.unit}
          </Text>
          {item.location && (
            <Text style={styles.location}>{item.location}</Text>
          )}
        </View>

        <View style={[styles.expirationBadge, { backgroundColor: expirationStatus.color }]}>
          <Text style={styles.expirationText}>
            {expirationStatus.text}
          </Text>
        </View>
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
  containerExpired: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  location: {
    fontSize: 12,
    color: '#999',
  },
  expirationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  expirationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});
