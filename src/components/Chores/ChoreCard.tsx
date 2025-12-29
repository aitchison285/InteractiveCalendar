import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Chore } from '../../types/chore.types';
import { format } from 'date-fns';

interface ChoreCardProps {
  chore: Chore;
  profileName?: string;
  profileColor?: string;
  onPress?: (chore: Chore) => void;
  onComplete?: (chore: Chore) => void;
  compact?: boolean;
}

export default function ChoreCard({
  chore,
  profileName,
  profileColor = '#4ECDC4',
  onPress,
  onComplete,
  compact = false,
}: ChoreCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(chore);
    }
  };

  const handleComplete = (e: any) => {
    e.stopPropagation();
    if (onComplete) {
      onComplete(chore);
    }
  };

  const getStatusIcon = () => {
    switch (chore.status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      default:
        return '○';
    }
  };

  const getStatusColor = () => {
    switch (chore.status) {
      case 'completed':
        return '#4CAF50';
      case 'in-progress':
        return '#FFB74D';
      default:
        return '#999';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderLeftColor: profileColor },
        chore.status === 'completed' && styles.completed,
        compact && styles.compact,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              chore.status === 'completed' && styles.titleCompleted,
            ]}
            numberOfLines={1}
          >
            {chore.title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
          </View>
        </View>

        {!compact && chore.description && (
          <Text style={styles.description} numberOfLines={2}>
            {chore.description}
          </Text>
        )}

        <View style={styles.footer}>
          {profileName && (
            <Text style={styles.assignee}>👤 {profileName}</Text>
          )}
          
          {chore.dueDate && (
            <Text style={styles.dueDate}>
              📅 {format(new Date(chore.dueDate), 'MMM d, h:mm a')}
            </Text>
          )}

          <View style={styles.points}>
            <Text style={styles.pointsText}>⭐ {chore.points} pts</Text>
          </View>
        </View>
      </View>

      {chore.status !== 'completed' && onComplete && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>✓</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compact: {
    padding: 8,
    marginVertical: 4,
  },
  completed: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  assignee: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
  },
  points: {
    backgroundColor: '#FFE66D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
