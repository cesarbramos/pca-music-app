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
  song: any = {
    name: '',
    playing: false,
    preview_url: 'https://p.scdn.co/mp3-preview/18781de52205d9ade22904945510161feab085ce?cid=774b29d4f13844c495f206cafdad9c86',
  };
  currentSong?: HTMLAudioElement;
  songTime: any;
  albums: Album[] = [];

  constructor(private musicService: MusicService, private albumService: AlbumService, private modalController: ModalController) {}

  ngOnInit(): void { }

  get songProgress() {
    return ((this.currentSong?.currentTime||0) / (this.currentSong?.duration||1));
  }

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

  play() {
    const prevTime = this.currentSong?.currentTime;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.currentTime = prevTime ?? 0;
    this.currentSong.play();
    this.song.playing = true;

    fromEvent(this.currentSong, 'timeupdate')
    .subscribe(() => {
      this.songTime = (this.currentSong!.currentTime * (this.currentSong!.duration)) / 100;
    });

  }

  pause() {
    this.currentSong?.pause();
    this.song.playing = false;
  }

  parseTime(time: string = "0.00") {
    if (time){
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if(minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60 ).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return "00:00";
  }

  formatTime(seconds: any) {
    let minutes: string|number = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
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
