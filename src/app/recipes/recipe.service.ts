import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Lasagna',
      'Meat and pasta. Roma\'s not so favorit dish',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg',
      [new Ingredient('Meat', 4), new Ingredient('Mozzarella', 2)]
    ),
    new Recipe(
      'Lasagna Bolognese',
      'Meat and pasta and some. Bologna\'s favorit dish',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg',
      [new Ingredient('Meat', 8), new Ingredient('Mozzarella', 6)]
    )
  ];

  getRecepies() {
    return this.recipes.slice();
  }
}
