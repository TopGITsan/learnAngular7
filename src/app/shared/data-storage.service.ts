import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json?auth=' + token;
    const body = this.recipeService.getRecepies();
    
    const header = new HttpHeaders().set('Authorization', 'Bearer meqwnbrljhgcxpiuzxycv').append('', '');

    return this.http.put(url, body, {
        observe: 'events',
        headers: header
      });
  }

  getRecipes() {
    const token = this.authService.getToken();
    const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json?auth=' + token;

    this.http.get<Recipe[]>(url).pipe(
      map((response: Recipe[]) => {
        const recipes: Recipe[] = response;
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
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
