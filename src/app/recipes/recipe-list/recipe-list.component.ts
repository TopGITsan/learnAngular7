import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  shadow: string;
  recipes: Recipe[] = [
    new Recipe(
      "Lasagna",
      "Meat and pasta. Bologna's favorit dish",
      "http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg"
    ),
    new Recipe(
      "Lasagna",
      "Meat and pasta. Bologna's favorit dish",
      "http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg"
    )
  ];
  constructor() {}

  ngOnInit() {}

  changeStyle($event){
    this.shadow = $event.type == 'mouseover' ? '0 0 6px grey' : 'none';
    // this.shadow = $event.type == 'mouseout' ? 'none' : '0 0 6px grey';
  }
}
