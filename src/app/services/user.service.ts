import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.endpoint;

  constructor(private http: HttpClient) { }

  getUser(user_id: number){
    return this.http.get(`${this.apiUrl}/current_user/${user_id}`);
  }
}
