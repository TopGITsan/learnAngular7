import {NgModule} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { RFormComponent } from './r-form/r-form.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping.module#ShoppingModule' },
  {path: 'template-form', component: TemplateFormComponent },
  {path: 'reactive-form', component: ReactiveFormComponent },
  {path: 'r-form', component: RFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
