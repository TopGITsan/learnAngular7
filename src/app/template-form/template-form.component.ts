import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  @ViewChild('f') submitForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    secretAnswer: '',
    gender: ''
  };
  submited = false;

  constructor() { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log('User submited: ', form);
  // }

  onSubmit() {
    this.submited = true;
    this.user.username =  this.submitForm.value.userData.username;
    this.user.email =  this.submitForm.value.userData.email;
    this.user.secretQuestion =  this.submitForm.value.secret;
    this.user.secretAnswer =  this.submitForm.value.answer;
    this.user.gender =  this.submitForm.value.gender;

    this.submitForm.reset();
  }

  sugestUsername() {
    const sugestedName = 'superuser';
    // this.submitForm.setValue({
    //   userData: {
    //     username: sugestedName,
    //     email: sugestedName + '@mail.com'
    //   },
    //   secret: 'pet',
    //   answer: 'Lasie',
    //   gender: 'male'
    // });
    this.submitForm.form.patchValue({
      userData: {
        username: sugestedName
      }
    })
  }
}
