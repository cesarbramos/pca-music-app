import { Injectable } from "@angular/core";
import { Song } from "../models/song.model";
import { Observable, Subject, fromEvent } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlaybackService {

    private audio?: HTMLAudioElement;
    private _song?: Song;

    private readonly onAudioTimeUpdate$: Subject<number> = new Subject();

    readonly onAudioTimeUpdate: Observable<number>;

    constructor() {
        this.onAudioTimeUpdate$.next(0);
        this.onAudioTimeUpdate = this.onAudioTimeUpdate$.asObservable();
    }

    get song() {
        return this._song;
    }

    get isPlaying() {
        return !this.audio?.paused;
    }

    get songProgress() {
        return ((this.audio?.currentTime||0) / (this.audio?.duration||1));
    }

    setNewSong(song: Song) {
        if (this._song === song) return;
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this._song = song;
        this.audio = new Audio(song.preview_url);

        fromEvent(this.audio, 'timeupdate')
        .subscribe(() => this.onAudioTimeUpdate$.next(this.audio!.currentTime));
    }

    pause() {
        this.audio?.pause();
    }

    play() {
        this.audio?.play();
    }

}