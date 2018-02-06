import { Component } from '@angular/core';
import { SplashScreenModel } from './splashScreen/splashScreen.model';
import { LoginService } from './login/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app/components/root/app.view.html'
})
export class AppComponent {

    private splashScreenModel : SplashScreenModel = new SplashScreenModel(2000, () => this.endTimeSplashScreen());
    private endSplashScreen : boolean = false;

    constructor(private loginService : LoginService) { /**/ }

    public endTimeSplashScreen() : void {
        this.endSplashScreen = true;
    }
}