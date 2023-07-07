import { Component } from '@angular/core';
import data from '../samples/catalog-data';
import { Catalog } from '../models/catalog.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list: Catalog[];

  constructor() {
    this.list = data;
  }

}
