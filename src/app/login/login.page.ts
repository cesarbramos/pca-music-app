import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { emailValidator } from '../validators/CustomEmailValidator';
import { validationMessages } from '../utils/validators-messages';
import { hasError } from '../utils/utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  showPsw: boolean = false;
  validationMessages = validationMessages;

  errorMsg?: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private navCtrl: NavController, private storage: Storage) {
    this.form = this.fb.group({ 
      email: ['', [
        Validators.required, 
        emailValidator,
        Validators.minLength(10),
      ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
    });
  }

  ngOnInit() {
  }

  hasError(field: string, type: string) {
    return hasError(field, type, this.form);
  }

  login(body: any) {
    this.authService.loginUser(body)
    .subscribe({ next: this.OnLogin, error: this.onLoginError });
  }

  OnLogin = async () => {
    await this.storage.set('isUserLoggedIn', true);
    this.navCtrl.navigateForward('/menu/home');
  }

  onLoginError(err: Error) {
    this.errorMsg = err.message;
    console.log(this.errorMsg);
  }

  onRegister() {
    this.navCtrl.navigateForward('/sign-up');
  }

}
