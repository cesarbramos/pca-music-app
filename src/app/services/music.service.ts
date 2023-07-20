import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import * as listArtists from './artists.json';
import { environment } from 'src/environments/environment';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private apiUrl: string = environment.endpoint;

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}artists`);
  }

  getArtistsFromJson() {
    return listArtists;
  }

  getArtistsTracks(artist_id: number){
    return this.http.get<any[]>(`${this.apiUrl}tracks/artist/${artist_id}`);
  }

  getAlbumsTracks(album_id: number) {
    return this.http.get<Song[]>(`${this.apiUrl}tracks/album/${album_id}`);
  }

}
