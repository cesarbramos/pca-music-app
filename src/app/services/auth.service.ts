import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface UserData {
  name: string
  last_name: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) { }

  loginUser(credentials: any): Observable<any> {
    return of(credentials).pipe(
      map((data: any) => {
        if (!(data.email === 'cesar@pca.com' && data.password === 'cesar123')) {
          throw new Error('Usuario o contraseña incorrecta');
        }
        return 'Usuario correcto';
      })
    )
  }

  async registerUser(data: UserData) {
    data.password = btoa(data.password);
    await this.storage.set('user', data);
  }

}
