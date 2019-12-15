import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-r-form',
  templateUrl: './r-form.component.html',
  styleUrls: ['./r-form.component.css']
})
export class RFormComponent implements OnInit {
  userForm: FormGroup;
  get name() {
    return this.userForm.get('name');
  }

  get hobbies() {
    return this.userForm.get('hobbies');
  }

  isChecked: boolean = false;
  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        suite: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl(''),
        geo: new FormGroup({
          lat: new FormControl(''),
          lng: new FormControl(''),
        })
      }),
      company: new FormGroup({
        name: new FormControl(''),
        catchphrase: new FormControl(''),
        bs: new FormControl(''),
      }),
      hobbies: new FormArray([])
    });
  }

  onAddHobbie(){
    (this.userForm.get('hobbies') as FormArray).push(
      new FormGroup({
        hobbie: new FormControl('', Validators.required),
        ispec: new FormControl(''),
        prefered: new FormControl('')
      })
    );
  }

  toggleCheck(status){
    this.isChecked = !this.isChecked;
  }

  onDeleteHobbie(index: number){
    (this.userForm.get('hobbies') as FormArray).removeAt(index);
  }

  onSubmit(){
    console.log('Form: ', this.userForm);
  }

}
