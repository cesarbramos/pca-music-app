import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) {}

  async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const canActivate: boolean = await this.storage.get('showLanding');
    
    if (canActivate) {
      return true;
    }

    this.router.navigateByUrl('/home')
    return false;
  }
  
}
