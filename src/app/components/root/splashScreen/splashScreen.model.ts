export class SplashScreenModel {

    private duration : number = -1;
    public callback : any = null;

    public constructor (duration : number, callback : any) {
        this.duration = duration;
        this.callback = callback;
    }

    public getDuration() : number {
        return this.duration;
    }
}