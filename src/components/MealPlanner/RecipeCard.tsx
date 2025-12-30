import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Recipe } from '../../types/meal.types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: (recipe: Recipe) => void;
  compact?: boolean;
}

export default function RecipeCard({ recipe, onPress, compact = false }: RecipeCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(recipe);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.compact]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {recipe.imageUrl && (
        <Image
          source={{ uri: recipe.imageUrl }}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={compact ? 1 : 2}>
          {recipe.title}
        </Text>

        {!compact && recipe.description && (
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        <View style={styles.footer}>
          {recipe.prepTime && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>⏱️ {recipe.prepTime}min</Text>
            </View>
          )}
          {recipe.servings && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>👥 {recipe.servings}</Text>
            </View>
          )}
          {recipe.isCustom && (
            <View style={[styles.tag, styles.customTag]}>
              <Text style={[styles.tagText, styles.customTagText]}>Custom</Text>
            </View>
          )}
        </View>

        {!compact && recipe.tags && recipe.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Text key={index} style={styles.recipeTag}>
                #{tag}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  compact: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  imageCompact: {
    width: 80,
    height: 80,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  customTag: {
    backgroundColor: '#4ECDC4',
  },
  customTagText: {
    color: '#fff',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  recipeTag: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '500',
  },
});
