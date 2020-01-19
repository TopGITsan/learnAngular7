import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { RFormComponent } from './r-form/r-form.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping.module#ShoppingModule' },
  {path: 'template-form', component: TemplateFormComponent },
  {path: 'reactive-form', component: ReactiveFormComponent },
  {path: 'r-form', component: RFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
