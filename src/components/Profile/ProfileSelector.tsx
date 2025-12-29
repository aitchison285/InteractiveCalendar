import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Profile } from '../../types/profile.types';
import ProfileCard from './ProfileCard';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfile?: Profile | null;
  onSelectProfile: (profile: Profile) => void;
  horizontal?: boolean;
}

export default function ProfileSelector({
  profiles,
  selectedProfile,
  onSelectProfile,
  horizontal = false,
}: ProfileSelectorProps) {
  
  const renderProfile = ({ item }: { item: Profile }) => {
    const isSelected = selectedProfile?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.profileItem,
          isSelected && styles.profileItemSelected,
          { borderColor: item.color },
          horizontal && styles.profileItemHorizontal,
        ]}
        onPress={() => onSelectProfile(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.avatarCircle, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.profileName, isSelected && styles.profileNameSelected]}>
          {item.name}
        </Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>👥</Text>
        <Text style={styles.emptyText}>No profiles created yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id}
      renderItem={renderProfile}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.listContent,
        horizontal && styles.listContentHorizontal,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  listContentHorizontal: {
    paddingHorizontal: 16,
  },
  profileItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    minWidth: 100,
  },
  profileItemHorizontal: {
    marginHorizontal: 8,
  },
  profileItemSelected: {
    borderWidth: 3,
    backgroundColor: '#f0f9ff',
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  profileNameSelected: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4ECDC4',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
