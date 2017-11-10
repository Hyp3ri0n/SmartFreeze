import { Component, OnInit, Input } from '@angular/core';
import { SplashScreenModel } from './splashScreen.model';

@Component({
    selector: 'app-splashscreen',
    templateUrl: './app/components/root/splashScreen/splashScreen.view.html'
})

export class SplashScreenComponent implements OnInit {

    @Input() model : SplashScreenModel;

    constructor() { /**/ }

    public ngOnInit() : void {
        setTimeout(() => {
            if (this.model.callback != null) {
                this.model.callback();
            }
        }, this.model.getDuration());
    }
}