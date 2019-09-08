import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe;
  @Input() index: number;
  shadow: string;
  recipeActivated: boolean;
  manageRecipeSub: Subscription;

  constructor(private recipeService: RecipeService){}

  ngOnInit() {
    this.manageRecipeSub = this.recipeService.recipeActivate.subscribe((recipe: Recipe) => {
      if (recipe.name === 'Lasagna') {
        this.recipeActivated = true;
      }
    });
  }

  changeStyle($event) {
    this.shadow = $event.type === 'mouseover' ? '0 0 6px grey' : 'none';
    // this.shadow = $event.type == 'mouseout' ? 'none' : '0 0 6px grey';
  }

  ngOnDestroy(){
    this.manageRecipeSub.unsubscribe();
  }
}
