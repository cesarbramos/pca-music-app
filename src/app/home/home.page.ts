import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ViewDidEnter } from '@ionic/angular';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  artists: Artist[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void { }

  onArtistsLoad = (res: Artist[]) => {
    this.artists = res;
  }

  ionViewDidEnter(): void {
    this.musicService.getArtists()
    .subscribe({
      next: this.onArtistsLoad
    });

    const artists = this.musicService.getArtistsFromJson();
    console.log({artists});
    
  }

}
