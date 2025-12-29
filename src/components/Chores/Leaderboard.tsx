import React from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { Profile } from '../../types/profile.types';

interface LeaderboardEntry {
  profile: Profile;
  points: number;
  choresCompleted: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  period?: string;
}

export default function Leaderboard({ entries, period = 'This Week' }: LeaderboardProps) {
  const sortedEntries = [...entries].sort((a, b) => b.points - a.points);

  const getMedalEmoji = (index: number): string => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  const renderEntry = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rank = index + 1;
    const medal = getMedalEmoji(index);
    
    return (
      <View style={[styles.entryContainer, rank <= 3 && styles.topThree]}>
        <View style={styles.rankContainer}>
          {medal ? (
            <Text style={styles.medal}>{medal}</Text>
          ) : (
            <Text style={styles.rank}>{rank}</Text>
          )}
        </View>

        <View style={[styles.avatarContainer, { backgroundColor: item.profile.color }]}>
          <Text style={styles.avatarText}>
            {item.profile.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.profile.name}</Text>
          <Text style={styles.choresCompleted}>
            {item.choresCompleted} {item.choresCompleted === 1 ? 'chore' : 'chores'} completed
          </Text>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.points}>⭐ {item.points}</Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🏆</Text>
      <Text style={styles.emptyText}>No leaderboard data yet</Text>
      <Text style={styles.emptySubtext}>Complete chores to earn points!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <Text style={styles.period}>{period}</Text>
      </View>

      {sortedEntries.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={sortedEntries}
          keyExtractor={(item) => item.profile.id}
          renderItem={renderEntry}
          contentContainerStyle={styles.listContent}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  period: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topThree: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
  },
  medal: {
    fontSize: 32,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  choresCompleted: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  pointsContainer: {
    backgroundColor: '#FFE66D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
});
