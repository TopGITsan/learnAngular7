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
  constructor() { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log('User submited: ', form);
  // }

  onSubmit() {
    console.log(this.submitForm);
  }
}
