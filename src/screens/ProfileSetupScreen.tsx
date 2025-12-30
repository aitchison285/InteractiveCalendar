import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addProfile, updateProfile, removeProfile } from '../store/slices/profileSlice';
import { ProfileManager } from '../components/Profile';
import { Profile } from '../types/profile.types';

export default function ProfileSetupScreen() {
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profile.profiles);

  const handleAddProfile = (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newProfile: Profile = {
      ...profileData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    dispatch(addProfile(newProfile));
  };

  const handleUpdateProfile = (id: string, profileData: Partial<Profile>) => {
    dispatch(updateProfile({ id, changes: profileData }));
  };

  const handleDeleteProfile = (id: string) => {
    dispatch(removeProfile(id));
  };

  return (
    <View style={styles.container}>
      <ProfileManager
        profiles={profiles}
        onAddProfile={handleAddProfile}
        onUpdateProfile={handleUpdateProfile}
        onDeleteProfile={handleDeleteProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
