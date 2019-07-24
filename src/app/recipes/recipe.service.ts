import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Lasagna',
      'Meat and pasta. Bologna\'s favorit dish',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg'
    ),
    new Recipe(
      'Lasagna Bolognese',
      'Meat and pasta and some. Bologna\'s favorit dish',
      'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg'
    )
  ];

  getRecepies() {
    return this.recipes.slice();
  }
}
