import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer, interval, Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  contactForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private recipeService: RecipeService) { }

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

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
    }
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      partitaIva: ['', Validators.required],
      emails: this.fb.array([]),
      addresses: this.fb.array([])
    });
  }

  onAddEmail() {
    (this.contactForm.get('emails') as FormArray).push(this.fb.group({
      'selected': [''],
      'email':['', Validators.required],
      'ispec':['']
    }));
  }

  onAddAddress(){
    (this.contactForm.get('addresses') as FormArray).push(this.fb.group({
      'street': ['', Validators.required],
      'number': ['', Validators.required],
      'city': ['', Validators.required],
      'country': ['', Validators.required],
    }));
  }

  onRemoveEmail(index: number){
    (this.contactForm.get('emails') as FormArray).removeAt(index);
  }

  onRemoveAddress(index: number){
    (this.contactForm.get('addresses') as FormArray).removeAt(index);
  }

  onRadioButtonChange(index: number){
    (this.contactForm.get('emails') as FormArray).setControl(index, new FormControl(''))
    console.log('1', ((this.contactForm.get('emails') as FormArray).controls[index]));
    
  }

  onCheckOnlyOne(index: number) {
    console.log("inside a email check",index);
    // console.log("inside emails array, group at ",index,": ", (this.contactForm.controls['emails'] as FormArray).controls[index].get('selected').patchValue(''));
    (this.contactForm.controls['emails'] as FormArray).controls.forEach(formgroup =>{
      formgroup.get('selected').patchValue(false);
    });
    (this.contactForm.controls['emails'] as FormArray).controls[index].get('selected').patchValue(true);
    console.log("inside emails array after: ",(this.contactForm.controls['emails']as FormArray));
  }

  onSubmit(){
    console.log('Contact form', this.contactForm);
  }

  // unsubscribe your observables when you navigate away from the page
  ngOnDestroy() {
    // this.numberObservableSubs.unsubscribe();
    this.customObservable.unsubscribe();
  }
}
