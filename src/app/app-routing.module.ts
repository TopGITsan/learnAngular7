import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { RFormComponent } from './r-form/r-form.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes' , pathMatch: 'full'},
  {path: 'template-form', component: TemplateFormComponent },
  {path: 'reactive-form', component: ReactiveFormComponent },
  {path: 'r-form', component: RFormComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
