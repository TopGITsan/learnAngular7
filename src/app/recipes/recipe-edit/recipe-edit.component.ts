import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Observer, interval, Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  numberObservableSubs: Subscription;
  customObservable: Subscription;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
    // learn more at reactivex.io/rxjs
    // create an observable witch runs infinitly
    // const myNumbers = interval(1000).pipe(map((data: number) => data * 3));
    // this.numberObservableSubs = myNumbers.subscribe((num: number) => { console.log('Data form observable: ', num); });

    // create an custom observable witch completes
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {observer.next('this is the 1st package'); }, 2000);
      setTimeout(() => {observer.next('this is the 2nd package'); }, 4000);
      setTimeout(() => {observer.error('this does NOT work'); }, 6000);
      setTimeout(() => {observer.complete(); }, 8000);
    });
    this.customObservable = myObservable.subscribe(
      (data: string) => { console.log('This is a data package: ', data); },
      (error: string) => { console.log('This is a error package: ', error); },
      () => { console.log('Data stream completed'); }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription= '';
    let recipeIngredients=  new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
      // or this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).insert(0,
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  // unsubscribe your observables when you navigate away from the page
  ngOnDestroy() {
    // this.numberObservableSubs.unsubscribe();
    this.customObservable.unsubscribe();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
