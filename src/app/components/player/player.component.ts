import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Song } from 'src/app/models/song.model';
import { PlaybackService } from 'src/app/services/playback.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent  implements OnInit {

  currentSong?: HTMLAudioElement;
  songTime: any;

  constructor(private playblackService: PlaybackService) {
  }

  ngOnInit() {}

  get isPlaying() {
    return this.playblackService.isPlaying;
  }

  get songProgress() {
    return this.playblackService.songProgress;
  }

  get songName() {
    return this.playblackService.song?.name ?? 'Sin canción seleccionada';
  }

  get artistName() {
    return this.playblackService.song?.artist?.name ?? 'Artista';
  }

  get image() {
    return this.playblackService.song?.image ?? 'assets/images/song.png';
  }

  parseTime(time: string = "0.00") {
    if (time){
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if(minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60 ).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return "00:00";
  }

  formatTime(seconds: any) {
    let minutes: string|number = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  play() {
    this.playblackService.play();
    // const prevTime = this.currentSong?.currentTime;
    // this.currentSong = new Audio(this.song.preview_url);
    // this.currentSong.currentTime = prevTime ?? 0;
    // this.currentSong.play();
    // this.song.playing = true;

    this.playblackService.onAudioTimeUpdate.subscribe(n => {
      console.log(n);
    })

    // fromEvent(this.currentSong, 'timeupdate')
    // .subscribe(e => {
    //   console.log({e});
      
    //   this.songTime = (this.currentSong!.currentTime * (this.currentSong!.duration)) / 100;
    // });

  }

  pause() {
    this.playblackService.pause();
    // this.currentSong?.pause();
    // this.song.playing = false;
  }

}
