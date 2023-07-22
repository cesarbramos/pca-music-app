import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { LoginGuard } from '../guards/login.guard';
import { LandingGuard } from '../guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'home',
    component: MenuPage,
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
    canActivate: [LoginGuard, LandingGuard]
  },
  {
    path: 'settings',
    component: MenuPage,
    loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
