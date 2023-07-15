import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private navCtrl: NavController, private storage: Storage) {}

  ngOnInit() {
  }

  async logout() {
    await this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

}
