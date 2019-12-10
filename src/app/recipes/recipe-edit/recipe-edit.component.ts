import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer, interval, Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';

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
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

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

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  // unsubscribe your observables when you navigate away from the page
  ngOnDestroy() {
    // this.numberObservableSubs.unsubscribe();
    this.customObservable.unsubscribe();
  }
}
