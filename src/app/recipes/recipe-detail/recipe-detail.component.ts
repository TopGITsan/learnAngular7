import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  isOpen = false;
  index: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    // const id = this.route.snapshot.params.id;
    this.route.params.subscribe((params: Params)=> {
      this.index = +params.id;
      this.recipe = this.recipeService.getRecipe(this.index);
    });
  }

  onShowDropdown() {
    this.isOpen = !this.isOpen;
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
