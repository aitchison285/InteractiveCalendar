import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Recipe } from '../../types/meal.types';
import Button from '../common/Button';

interface RecipeDetailProps {
  recipe: Recipe;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onGenerateShoppingList?: (recipe: Recipe) => void;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (recipe: Recipe) => void;
}

export default function RecipeDetail({
  recipe,
  onAddToMealPlan,
  onGenerateShoppingList,
  onEdit,
  onDelete,
}: RecipeDetailProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {recipe.imageUrl && (
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.headerSection}>
        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.description && (
          <Text style={styles.description}>{recipe.description}</Text>
        )}

        <View style={styles.infoRow}>
          {recipe.prepTime && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Prep</Text>
              <Text style={styles.infoValue}>⏱️ {recipe.prepTime}min</Text>
            </View>
          )}
          {recipe.cookTime && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cook</Text>
              <Text style={styles.infoValue}>🔥 {recipe.cookTime}min</Text>
            </View>
          )}
          {recipe.servings && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Servings</Text>
              <Text style={styles.infoValue}>👥 {recipe.servings}</Text>
            </View>
          )}
        </View>

        {recipe.tags && recipe.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {recipe.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ingredientText}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((instruction, index) => (
          <View key={index} style={styles.instructionItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{instruction}</Text>
          </View>
        ))}
      </View>

      {recipe.nutritionInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Info</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {recipe.nutritionInfo.calories}
              </Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {recipe.nutritionInfo.protein}g
              </Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {recipe.nutritionInfo.carbs}g
              </Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.nutritionInfo.fat}g</Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        {onAddToMealPlan && (
          <Button
            title="Add to Meal Plan"
            onPress={() => onAddToMealPlan(recipe)}
            variant="primary"
          />
        )}
        {onGenerateShoppingList && (
          <Button
            title="Generate Shopping List"
            onPress={() => onGenerateShoppingList(recipe)}
            variant="secondary"
          />
        )}
        {recipe.isCustom && onEdit && (
          <Button
            title="Edit Recipe"
            onPress={() => onEdit(recipe)}
            variant="outline"
          />
        )}
        {recipe.isCustom && onDelete && (
          <Button
            title="Delete Recipe"
            onPress={() => onDelete(recipe)}
            variant="danger"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  headerSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    color: '#4ECDC4',
    marginRight: 8,
    lineHeight: 24,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 24,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    padding: 16,
    gap: 12,
  },
});
