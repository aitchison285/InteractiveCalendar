import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AvatarPickerProps {
  avatarUrl: string;
  name: string;
  color: string;
  onAvatarChange: (url: string) => void;
}

export default function AvatarPicker({
  avatarUrl,
  name,
  color,
  onAvatarChange,
}: AvatarPickerProps) {
  
  const handleUploadPhoto = () => {
    // TODO: Implement image picker
    // For now, this is a placeholder
    console.log('Upload photo functionality to be implemented');
  };

  const handleRemovePhoto = () => {
    onAvatarChange('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarPreview, { backgroundColor: color }]}>
        {avatarUrl ? (
          <Text style={styles.avatarText}>Photo</Text>
        ) : (
          <Text style={styles.avatarInitial}>
            {name ? name.charAt(0).toUpperCase() : '?'}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleUploadPhoto}
        >
          <Text style={styles.actionButtonText}>
            {avatarUrl ? 'Change Photo' : 'Upload Photo'}
          </Text>
        </TouchableOpacity>

        {avatarUrl && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={handleRemovePhoto}
          >
            <Text style={[styles.actionButtonText, styles.removeButtonText]}>
              Remove Photo
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.hint}>
        Upload a photo or use the initial letter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
  },
  removeButtonText: {
    color: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
