import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeActivate = new Subject();

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

  constructor(private slService: ShoppingListService) {}

  getRecepies() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
