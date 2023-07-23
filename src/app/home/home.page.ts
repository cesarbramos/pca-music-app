import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ViewDidEnter } from '@ionic/angular';
import { Artist } from '../models/artist.model';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../modals/songs-modal/songs-modal.page';
import { fromEvent } from 'rxjs';
import { Album } from '../models/album.model';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  artists: Artist[] = [];
  localArtists: any[] = [];
  
  
  
  albums: Album[] = [];

  constructor(private musicService: MusicService, private albumService: AlbumService, private modalController: ModalController) {}

  ngOnInit(): void { }

  

  ionViewDidEnter(): void {
    this.musicService.getArtists()
    .subscribe({
      next: this.onArtistsLoad
    });

    this.albumService.getAlbums()
    .subscribe(albums => this.albums = albums);

    const {artists} = this.musicService.getArtistsFromJson();
    this.localArtists = artists;
  }

  onArtistsLoad = (res: Artist[]) => {
    this.artists = res;
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
        title: artist.name
      }
    });

    modal.present();
  }

  

  async showAlbumSongs(album:Album){

    this.musicService.getAlbumsTracks(album.id)
    .subscribe(async (songs) => {

      const modal = await this.modalController.create(
        {
          component: SongsModalPage,
          componentProps: {
            songs: songs,
            title: album.name
          }
        }
      );

      // modal.onDidDismiss().then( dataReturned => {
      //   this.song = dataReturned.data;
      // });
      
      modal.present();

    });
  }

}
