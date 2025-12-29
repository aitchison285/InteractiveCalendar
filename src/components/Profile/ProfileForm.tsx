import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import { Profile } from '../../types/profile.types';
import Button from '../common/Button';
import AvatarPicker from './AvatarPicker';

const FAMILY_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#95E1D3', // Mint
  '#A8E6CF', // Sage
  '#C7CEEA', // Lavender
  '#FFDAC1', // Peach
  '#B4A7D6', // Purple
];

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const [name, setName] = useState(profile?.name || '');
  const [color, setColor] = useState(profile?.color || FAMILY_COLORS[0]);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || '');
  const [isAdmin, setIsAdmin] = useState(profile?.isAdmin || false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const profileData: Omit<Profile, 'id' | 'createdAt'> = {
      name: name.trim(),
      color,
      avatarUrl,
      isAdmin,
    };

    onSubmit(profileData);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.field}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#999"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Avatar</Text>
        <AvatarPicker
          avatarUrl={avatarUrl}
          name={name}
          color={color}
          onAvatarChange={setAvatarUrl}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorGrid}>
          {FAMILY_COLORS.map((c) => (
            <View
              key={c}
              style={[
                styles.colorOption,
                { backgroundColor: c },
                color === c && styles.colorOptionSelected,
              ]}
              onTouchEnd={() => setColor(c)}
            >
              {color === c && (
                <Text style={styles.colorCheckmark}>✓</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.label}>Administrator</Text>
            <Text style={styles.hint}>Can manage profiles and settings</Text>
          </View>
          <Switch
            value={isAdmin}
            onValueChange={setIsAdmin}
            trackColor={{ false: '#ccc', true: '#4ECDC4' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          title={profile ? 'Update' : 'Add'}
          onPress={handleSubmit}
          variant="primary"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 4,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#333',
    borderWidth: 3,
  },
  colorCheckmark: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
