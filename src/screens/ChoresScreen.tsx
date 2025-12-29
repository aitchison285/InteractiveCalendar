import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { completeChore } from '../store/slices/choresSlice';
import { ChoreList } from '../components/Chores';
import { Chore } from '../types/chore.types';

export default function ChoresScreen() {
  const dispatch = useDispatch();
  const chores = useSelector((state: RootState) => state.chores.chores);
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const handleCompleteChore = (chore: Chore) => {
    dispatch(completeChore(chore.id));
  };

  const handleChorePress = (chore: Chore) => {
    console.log('Chore pressed:', chore);
    // TODO: Navigate to chore detail screen
  };

  const filters: Array<'all' | 'pending' | 'in-progress' | 'completed'> = [
    'all',
    'pending',
    'in-progress',
    'completed',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chores</Text>
        <View style={styles.filterContainer}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ChoreList
        chores={chores}
        profiles={profiles}
        filter={filter}
        groupByProfile={false}
        onChorePress={handleChorePress}
        onCompleteChore={handleCompleteChore}
      />
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  filterButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
