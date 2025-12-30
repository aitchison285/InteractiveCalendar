import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Widget from './Widget';

export default function ChoresWidget() {
  const chores = useSelector((state: RootState) => state.chores.chores);
  const profiles = useSelector((state: RootState) => state.profile.profiles);

  const pendingChores = chores.filter((chore) => chore.status === 'pending');
  const inProgressChores = chores.filter((chore) => chore.status === 'in-progress');
  const completedTodayChores = chores.filter((chore) => {
    if (chore.status !== 'completed' || !chore.completedAt) return false;
    const today = new Date();
    const completedDate = new Date(chore.completedAt);
    return (
      completedDate.getDate() === today.getDate() &&
      completedDate.getMonth() === today.getMonth() &&
      completedDate.getFullYear() === today.getFullYear()
    );
  });

  const totalPoints = completedTodayChores.reduce((sum, chore) => sum + chore.points, 0);

  const getProfileName = (profileId: string) => {
    return profiles.find((p) => p.id === profileId)?.name || 'Unknown';
  };

  const renderChore = (chore: any) => {
    const profile = profiles.find((p) => p.id === chore.assignedProfileId);
    return (
      <View key={chore.id} style={styles.choreItem}>
        <View style={[styles.statusDot, { backgroundColor: profile?.color || '#999' }]} />
        <Text style={styles.choreName} numberOfLines={1}>
          {chore.title}
        </Text>
        <Text style={styles.chorePoints}>⭐{chore.points}</Text>
      </View>
    );
  };

  return (
    <Widget title="📋 Chores Today" size="medium">
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pendingChores.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{inProgressChores.length}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.completedValue]}>
            {completedTodayChores.length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.pointsValue]}>⭐{totalPoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {pendingChores.length > 0 ? (
        <View style={styles.choresList}>
          <Text style={styles.sectionTitle}>Up Next:</Text>
          {pendingChores.slice(0, 4).map(renderChore)}
          {pendingChores.length > 4 && (
            <Text style={styles.moreText}>
              +{pendingChores.length - 4} more
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>All chores done! 🎉</Text>
        </View>
      )}
    </Widget>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  completedValue: {
    color: '#4CAF50',
  },
  pointsValue: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  choresList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  choreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  choreName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  chorePoints: {
    fontSize: 12,
    color: '#FFB74D',
    fontWeight: '600',
  },
  moreText: {
    fontSize: 12,
    color: '#4ECDC4',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
