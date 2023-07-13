import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'pattern', message: 'El email no es válido' },
      { type: 'minlength', message: 'El email debe tener al menos 10 caracteres' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 4 caracteres' },
      { type: 'maxlength', message: 'La contraseña debe tener maximo 64 caracteres' },
    ]
  };

  errorMsg?: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private navCtrl: NavController, private storage: Storage) {
    this.form = this.fb.group({ 
      email: ['', [
        Validators.required, 
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.minLength(10),
      ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
    });
  }

  ngOnInit() {
  }

  hasError(field: string, type: string) {
    return this.form.get(field)?.hasError(type) && this.form.get(field)?.dirty;
  }

  login(body: any) {
    this.authService.loginUser(body)
    .subscribe({ next: this.OnLogin, error: this.onLoginError });
  }

  OnLogin = async () => {
    await this.storage.set('isUserLoggedIn', true);
    this.navCtrl.navigateForward('/home');
  }

  onLoginError(err: Error) {
    this.errorMsg = err.message;
    console.log(this.errorMsg);
  }

}
