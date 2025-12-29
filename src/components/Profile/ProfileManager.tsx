import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Profile } from '../../types/profile.types';
import ProfileCard from './ProfileCard';
import Button from '../common/Button';
import Modal from '../common/Modal';
import ProfileForm from './ProfileForm';

interface ProfileManagerProps {
  profiles: Profile[];
  onAddProfile: (profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  onUpdateProfile: (id: string, profile: Partial<Profile>) => void;
  onDeleteProfile: (id: string) => void;
  maxProfiles?: number;
}

export default function ProfileManager({
  profiles,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
  maxProfiles = 8,
}: ProfileManagerProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleAdd = () => {
    if (profiles.length >= maxProfiles) {
      Alert.alert(
        'Maximum Profiles Reached',
        `You can only create up to ${maxProfiles} family member profiles.`
      );
      return;
    }
    setShowAddModal(true);
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const handleDelete = (profile: Profile) => {
    Alert.alert(
      'Delete Profile',
      `Are you sure you want to delete ${profile.name}'s profile?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteProfile(profile.id),
        },
      ]
    );
  };

  const handleSubmitNew = (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    onAddProfile(profileData);
    setShowAddModal(false);
  };

  const handleSubmitEdit = (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    if (editingProfile) {
      onUpdateProfile(editingProfile.id, profileData);
      setEditingProfile(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Members</Text>
        <Text style={styles.subtitle}>
          {profiles.length} of {maxProfiles} profiles
        </Text>
      </View>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProfileCard
            profile={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions={true}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>No family members added yet</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Button
          title="+ Add Family Member"
          onPress={handleAdd}
          variant="primary"
          disabled={profiles.length >= maxProfiles}
        />
      </View>

      <Modal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Family Member"
      >
        <ProfileForm
          onSubmit={handleSubmitNew}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        visible={editingProfile !== null}
        onClose={() => setEditingProfile(null)}
        title="Edit Profile"
      >
        {editingProfile && (
          <ProfileForm
            profile={editingProfile}
            onSubmit={handleSubmitEdit}
            onCancel={() => setEditingProfile(null)}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
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
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
