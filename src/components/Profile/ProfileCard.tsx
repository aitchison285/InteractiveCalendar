import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Profile } from '../../types/profile.types';

interface ProfileCardProps {
  profile: Profile;
  onPress?: (profile: Profile) => void;
  onEdit?: (profile: Profile) => void;
  onDelete?: (profile: Profile) => void;
  showActions?: boolean;
}

export default function ProfileCard({
  profile,
  onPress,
  onEdit,
  onDelete,
  showActions = false,
}: ProfileCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(profile);
    }
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(profile);
    }
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(profile);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: profile.color }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.avatarContainer, { backgroundColor: profile.color }]}>
        {profile.avatarUrl ? (
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarInitial}>
            {profile.name.charAt(0).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{profile.name}</Text>
        {profile.isAdmin && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminText}>Admin</Text>
          </View>
        )}
      </View>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEdit}
          >
            <Text style={styles.actionText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <Text style={styles.actionText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  adminBadge: {
    backgroundColor: '#FFE66D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  adminText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  actionText: {
    fontSize: 20,
  },
});
