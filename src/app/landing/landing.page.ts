import { Component, OnInit } from '@angular/core';
import data from '../samples/catalog-data';
import { Catalog } from '../models/catalog.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  list: Catalog[];

  constructor(private storage: Storage, private navCtrl: NavController) {
    this.list = data;
  }

  ngOnInit() {
    this.storage.set('showLanding', true);
  }

  back() {
    this.navCtrl.navigateBack('/menu/home')
  }
}
