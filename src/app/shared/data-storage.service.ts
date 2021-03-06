import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
    const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json';
    const body = this.recipeService.getRecepies();

    // const header = new HttpHeaders().set('Authorization', 'Bearer meqwnbrljhgcxpiuzxycv').append('', '');
    const param = new HttpParams().set('auth', token);

    // return this.http.put(url, body, {
    //     observe: 'body',
    //     params: param
    //     // headers: header
    //   });
    const req = new HttpRequest('PUT', url, body, {reportProgress: true});
    return this.http.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // const url = 'https://top-ng-recipebook.firebaseio.com/recipes.json?auth=' + token;

    const urlForInterceptor = 'https://top-ng-recipebook.firebaseio.com/recipes.json';

    this.http.get<Recipe[]>(urlForInterceptor, {observe: 'body', responseType: 'json'}).pipe(
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
