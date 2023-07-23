import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable, merge } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { PlaybackService } from 'src/app/services/playback.service';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {
  songs?: Song[];
  albums: Album[] = [];
  artists: Artist[] = [];
  albumRequests: Observable<Album>[] = [];
  artistsRequests: Observable<Artist>[] = [];
  title?: string;

  constructor(private navParams: NavParams, 
    private modalController: ModalController, 
    private albumService: AlbumService, 
    private playbackService: PlaybackService,
    private artistService: ArtistService) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    this.title = this.navParams.data['title'];
    this.loadAlbums();
    this.loadArtists();
  }

  loadArtists() {
    const artistsIds: Set<number> = new Set(this.songs?.map(({artist_id}) => artist_id))

    for(const id of artistsIds) {
      this.artistsRequests.push(this.artistService.getArtistById(id));
    }

    merge(...this.artistsRequests)
    .subscribe(artist => {
      this.artists.push(artist);

      this.songs?.filter(song => song.artist_id === artist.id)
      .forEach(song => song.artist = artist);

    });
  }

  loadAlbums() {
    const albumIds: Set<number> = new Set(this.songs?.map(({album_id}) => album_id))

    for(const id of albumIds) {
      this.albumRequests.push(this.albumService.getAlbumById(id));
    }

    merge(...this.albumRequests)
    .subscribe(album => {
      this.albums.push(album);

      this.songs?.filter(song => song.album_id === album.id)
      .forEach(song => {
        song.image = album.image;
        song.album_name = album.name;
      });

    });
  }

  parent() {
    
  }

  addToFavorite(song: Song, e: Event) {
    e.stopPropagation();
    song._fav = !song?._fav;
  }

  close() {
    return this.modalController.dismiss(null, '');
  }

  play(song: Song) {
    this.playbackService.setNewSong(song);
    this.playbackService.play();
  }

  isSameSongPlaying(song: Song): boolean {
    return this.playbackService?.song?.id === song.id;
  }

}
