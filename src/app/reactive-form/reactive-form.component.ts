import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  signupForm: FormGroup;
  genders = ['male', 'female'];
  forbbidenNames = ['noob', 'robot', 'Scorpion', 'bot'];
  forbbidenEmails = ['test@test.com', 'bot@test.com', 'noob@noob.com'];
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkForbbidenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.checkForbbidenEmail.bind(this)),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([], Validators.required)
    });

    this.signupForm.valueChanges.subscribe(value => console.log(value));
    this.signupForm.statusChanges.subscribe(status => console.log(status));
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobbie(){
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  checkForbbidenName(control: FormControl): {[s: string]: boolean}{
    if (this.forbbidenNames.indexOf(control.value) !== -1) {
      return {'forbbidenName': true}
    }
    return null;
  }

  checkForbbidenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbbidenEmails.indexOf(control.value) !== -1) {
          resolve({forbbidenEmail: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
