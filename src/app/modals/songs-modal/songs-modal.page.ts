import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable, concat, forkJoin, merge, of } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {
  songs?: Song[];
  albums: Album[] = [];
  albumRequests: Observable<Album>[] = [];
  title?: string;

  constructor(private navParams: NavParams, private modalController: ModalController, private albumService: AlbumService) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    this.title = this.navParams.data['title'];
    this.loadAlbums();
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

}
