import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Chore } from '../../types/chore.types';
import { Profile } from '../../types/profile.types';
import ChoreCard from './ChoreCard';

interface ChoreListProps {
  chores: Chore[];
  profiles: Profile[];
  onChorePress?: (chore: Chore) => void;
  onCompleteChore?: (chore: Chore) => void;
  filter?: 'all' | 'pending' | 'in-progress' | 'completed';
  groupByProfile?: boolean;
}

export default function ChoreList({
  chores,
  profiles,
  onChorePress,
  onCompleteChore,
  filter = 'all',
  groupByProfile = false,
}: ChoreListProps) {
  
  const getProfileById = (profileId: string) => {
    return profiles.find((p) => p.id === profileId);
  };

  const filteredChores = chores.filter((chore) => {
    if (filter === 'all') return true;
    return chore.status === filter;
  });

  const sortedChores = [...filteredChores].sort((a, b) => {
    // Sort by status (pending first), then by due date
    if (a.status !== b.status) {
      const statusOrder = { pending: 0, 'in-progress': 1, completed: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyText}>
        {filter === 'completed' 
          ? 'No completed chores yet' 
          : 'No chores assigned'}
      </Text>
    </View>
  );

  if (sortedChores.length === 0) {
    return renderEmptyState();
  }

  if (groupByProfile) {
    const choresByProfile: { [key: string]: Chore[] } = {};
    
    sortedChores.forEach((chore) => {
      if (!choresByProfile[chore.assignedProfileId]) {
        choresByProfile[chore.assignedProfileId] = [];
      }
      choresByProfile[chore.assignedProfileId].push(chore);
    });

    return (
      <FlatList
        data={Object.entries(choresByProfile)}
        keyExtractor={([profileId]) => profileId}
        renderItem={({ item: [profileId, profileChores] }) => {
          const profile = getProfileById(profileId);
          return (
            <View style={styles.profileGroup}>
              <View style={[styles.profileHeader, { backgroundColor: profile?.color || '#ddd' }]}>
                <Text style={styles.profileHeaderText}>
                  {profile?.name || 'Unknown'}
                </Text>
                <Text style={styles.profileHeaderCount}>
                  {profileChores.length} {profileChores.length === 1 ? 'chore' : 'chores'}
                </Text>
              </View>
              {profileChores.map((chore) => {
                const profile = getProfileById(chore.assignedProfileId);
                return (
                  <ChoreCard
                    key={chore.id}
                    chore={chore}
                    profileName={profile?.name}
                    profileColor={profile?.color}
                    onPress={onChorePress}
                    onComplete={onCompleteChore}
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
      data={sortedChores}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const profile = getProfileById(item.assignedProfileId);
        return (
          <ChoreCard
            chore={item}
            profileName={profile?.name}
            profileColor={profile?.color}
            onPress={onChorePress}
            onComplete={onCompleteChore}
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
  profileGroup: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
  },
  profileHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  profileHeaderCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
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
  },
});
