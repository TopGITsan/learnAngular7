import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  shadow: string;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  changeStyle($event) {
    this.shadow = $event.type == 'mouseover' ? '0 0 6px grey' : 'none';
    // this.shadow = $event.type == 'mouseout' ? 'none' : '0 0 6px grey';
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
