import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ViewDidEnter } from '@ionic/angular';
import { Artist } from '../models/artist.model';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../modals/songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  artists: Artist[] = [];
  localArtists: any[] = [];
  song: any;

  constructor(private musicService: MusicService, private modalController: ModalController) {}

  ngOnInit(): void { }

  onArtistsLoad = (res: Artist[]) => {
    this.artists = res;
  }

  ionViewDidEnter(): void {
    this.musicService.getArtists()
    .subscribe({
      next: this.onArtistsLoad
    });

    const {artists} = this.musicService.getArtistsFromJson();
    this.localArtists = artists;
  }

  getImage(artist: any): string {
    return artist.images[1].url;
  }

  async showSongs(artist: Artist) {
    
    this.musicService.getArtistsTracks(artist.id)
    .subscribe({
      next: (res) => this.onSongsLoad(res, artist)
    });

  }

  onSongsLoad = async (songs: any[], artist: Artist) => {
    const modal = await this.modalController.create({
      component: SongsModalPage,
      id: 'my-modal-id',
      componentProps: {
        songs,
        artist
      }
    });

    modal.present();
  }

}
