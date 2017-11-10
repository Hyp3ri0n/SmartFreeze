import { Component } from '@angular/core';
import { SplashScreenModel } from './splashScreen/splashScreen.model';

@Component({
    selector: 'app-root',
    templateUrl: './app/components/root/app.view.html'
})
export class AppComponent {

    private splashScreenModel : SplashScreenModel = new SplashScreenModel(4242, () => this.endTimeSplashScreen());
    private endSplashScreen : boolean = false;

    constructor() { /**/ }

    public endTimeSplashScreen() : void {
        this.endSplashScreen = true;
    }
}