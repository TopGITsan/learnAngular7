import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService){}

  storeRecipes(){
    const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json';
    const body = this.recipeService.getRecepies();
    return this.http.put(url, body);
  }

  getRecipes() {
    const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json';
    return this.http.get(url).pipe(
      map((response: Recipe[]) => {
        const recipes: Recipe[] = response;
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      },
      (error: Response) => { console.log(error); }
    );
  }
}