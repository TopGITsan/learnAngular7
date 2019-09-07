import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  shadow: string;

  ngOnInit() {}

  changeStyle($event) {
    this.shadow = $event.type === 'mouseover' ? '0 0 6px grey' : 'none';
    // this.shadow = $event.type == 'mouseout' ? 'none' : '0 0 6px grey';
  }
}
