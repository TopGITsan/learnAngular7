import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer, interval, Subscription } from 'rxjs';

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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
    });
    // learn more at reactivex.io/rxjs
    // create an observable witch runs infinitly
    const myNumbers = interval(1000);
    this.numberObservableSubs = myNumbers.subscribe((num: number) => { console.log('Data form observable: ', num);});

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
  // unsubscribe your observables when you navigate away from the page
  ngOnDestroy() {
    this.numberObservableSubs.unsubscribe();
    this.customObservable.unsubscribe();
  }
}
