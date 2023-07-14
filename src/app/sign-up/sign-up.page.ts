import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, UserData } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private navCtrl: NavController) {
    this.form = this.fb.group({
      name: '',
      last_name: '',
      email: '',
      password: ''
    })
  }

  ngOnInit() {
  }

  registerUser(data: UserData): void {
    this.authService.registerUser(data)
      .then(() => this.navCtrl.navigateBack('/login'));
  }

}
