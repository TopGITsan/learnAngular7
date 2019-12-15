import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}


export interface IContactPfFormInterface {
  contactDetails: PfContact;
  emails: ContactEmail[];
  addresses: ContactAddress[];
}

export interface IContactPgFormInter {
  contactDetails: PgContact;
  emails: ContactEmail[];
  addresses: ContactAddress[];
}

export interface PfContact {
  firstName: string;
  lastName: string;
  codiceFiscale: string;
  partitaIva: string;
}

export interface ContactEmail {
  selected: boolean;
  pec: boolean;
  email: string;
}

export interface ContactAddress {
  street: string;
  number: number;
  city: string;
  country: string;
}

export interface PgContact {
  description: string;
  codiceFiscale: string;
  partitaIva: string;
}