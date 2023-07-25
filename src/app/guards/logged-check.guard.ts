import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoggedCheckGuard implements CanActivate {

  constructor(private storage: Storage, private navCtrl: NavController) {}

  async canActivate() {
    const isUserLoggedIn: boolean = await this.storage.get('isUserLoggedIn');
    if (!isUserLoggedIn) return true;
    
    this.navCtrl.navigateRoot('/menu/home');
    return false;
  }
  
}
