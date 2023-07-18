import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import * as listArtists from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>('https://musicback.fly.dev/artists');
  }


  getArtistsFromJson() {
    return listArtists;
  }
}
