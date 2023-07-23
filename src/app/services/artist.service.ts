import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  
  private readonly apiUrl = environment.endpoint;

  constructor(private http: HttpClient) { }

  getArtistById(id: number) {
    return this.http.get<Artist>(`${this.apiUrl}artists/${id}`)
  }
}
