import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { IMenuItem } from '../models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems: IMenuItem[];

  constructor(private navCtrl: NavController, private storage: Storage) {
    this.menuItems = [
      { label: 'Intro', icon: 'golf-outline', route: '/landing' },
      { label: 'Cerrar sesión', icon: 'exit-outline', onClick: this.logout },
    ]
  }

  ngOnInit() {
  }

  logout = async () => {
    await this.storage.set('isUserLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }

}
