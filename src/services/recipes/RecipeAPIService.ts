import axios from 'axios';
import { Recipe } from '@types/meal.types';
import { API_CONFIG } from '@config/api.config';

class RecipeAPIService {
  async searchRecipes(query: string, limit: number = 20): Promise<Recipe[]> {
    try {
      // Using TheMealDB as primary source (free API)
      const response = await axios.get(`${API_CONFIG.recipes.themealdb}/search.php`, {
        params: { s: query },
      });

      if (response.data.meals) {
        return response.data.meals.map(this.convertMealDBToRecipe);
      }

      return [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  }

  async getRandomRecipes(count: number = 10): Promise<Recipe[]> {
    try {
      const recipes: Recipe[] = [];
      
      for (let i = 0; i < count; i++) {
        const response = await axios.get(`${API_CONFIG.recipes.themealdb}/random.php`);
        if (response.data.meals && response.data.meals[0]) {
          recipes.push(this.convertMealDBToRecipe(response.data.meals[0]));
        }
      }

      return recipes;
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    try {
      const response = await axios.get(`${API_CONFIG.recipes.themealdb}/filter.php`, {
        params: { c: category },
      });

      if (response.data.meals) {
        // This endpoint returns limited data, need to fetch full details
        const recipeIds = response.data.meals.map((m: any) => m.idMeal);
        const recipes = await Promise.all(
          recipeIds.slice(0, 20).map(id => this.getRecipeById(id))
        );
        return recipes.filter(r => r !== null) as Recipe[];
      }

      return [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await axios.get(`${API_CONFIG.recipes.themealdb}/lookup.php`, {
        params: { i: id },
      });

      if (response.data.meals && response.data.meals[0]) {
        return this.convertMealDBToRecipe(response.data.meals[0]);
      }

      return null;
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  }

  private convertMealDBToRecipe(meal: any): Recipe {
    const ingredients = [];
    
    // TheMealDB has ingredients as strIngredient1-20 and measures as strMeasure1-20
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          quantity: measure ? parseFloat(measure) || 1 : 1,
          unit: measure ? measure.replace(/[0-9.]/g, '').trim() : '',
        });
      }
    }

    const instructions = meal.strInstructions
      ? meal.strInstructions.split(/\r?\n/).filter((s: string) => s.trim())
      : [];

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strMeal,
      imageUrl: meal.strMealThumb,
      ingredients,
      instructions,
      prepTime: 15, // Default values as TheMealDB doesn't provide these
      cookTime: 30,
      servings: 4,
      tags: [
        meal.strCategory,
        meal.strArea,
        ...(meal.strTags ? meal.strTags.split(',') : []),
      ].filter(Boolean),
      sourceUrl: meal.strSource || meal.strYoutube,
      isCustom: false,
    };
  }
}

export default new RecipeAPIService();
