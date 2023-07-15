import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserData } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { emailValidator } from '../validators/CustomEmailValidator';
import { equalsValidator } from '../validators/CustomEqualsValidator';
import { validationMessages } from '../utils/validators-messages';
import { hasError } from '../utils/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  validationMessages = validationMessages;

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private navCtrl: NavController) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, emailValidator, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
      cPassword: ['', [Validators.required ]],
    });

    this.form.setValidators( equalsValidator('password', 'cPassword') );
  }

  ngOnInit() {
  }

  registerUser(data: UserData): void {
    delete data.cPassword;
    this.authService.registerUser(data)
      .then(() => this.navCtrl.navigateBack('/login'));
  }
  
  hasError(field: string, type: string): boolean {
    return hasError(field, type, this.form);
  }

  hasErrorForm(field: FormGroup, type: string): boolean {
    return hasError(field, type);
  }

}
