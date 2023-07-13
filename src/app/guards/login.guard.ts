import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: Storage, private navCtrl: NavController) {}

  async canActivate() {
    const isUserLoggedIn: boolean = await this.storage.get('isUserLoggedIn');
    if (isUserLoggedIn) return true;

    this.navCtrl.navigateForward('/login');
    return false;
  }
  
}
