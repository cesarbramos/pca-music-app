import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  imageSrc: string = 'assets/images/user.svg';
  photo?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser(1).subscribe(response => {
      console.log({response});
      
    })
  }

  async takePhoto() {
    const result = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (result?.dataUrl) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(result.dataUrl);
    }
    

  }

}
