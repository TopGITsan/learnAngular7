import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  isOpen = false;
  constructor() {}

  ngOnInit() {}

  onShowDropdown() {
    this.isOpen = !this.isOpen;
  }
}
