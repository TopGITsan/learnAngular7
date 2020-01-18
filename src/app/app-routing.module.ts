import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { RFormComponent } from './r-form/r-form.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes' , pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent },
  {path: 'template-form', component: TemplateFormComponent },
  {path: 'reactive-form', component: ReactiveFormComponent },
  {path: 'r-form', component: RFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
