import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
}
