import { Component, OnInit } from '@angular/core';
import data from '../samples/catalog-data';
import { Catalog } from '../models/catalog.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  list: Catalog[];

  constructor() {
    this.list = data;
  }

  ngOnInit() {
  }

}
