import { Injectable } from '@angular/core';


export enum ApplicationContext {
    NONE = 0,
    MOUNTAIN_SHELTER = 1,
    FIELD = 2
}

@Injectable()
export class LoginService {

    private app : ApplicationContext = ApplicationContext.NONE;

    constructor() { /**/ }

    public getApplicationContext() : ApplicationContext {
        return this.app;
    }

    public setApplicationContext(app : ApplicationContext) : void {
        this.app = app;
        this.changeTheme();
    }

    public reset() : void {
        this.app = ApplicationContext.NONE;
    }

    public switch() : void {
        if (this.app === ApplicationContext.MOUNTAIN_SHELTER) {
            this.setApplicationContext(ApplicationContext.FIELD);
        } else if (this.app === ApplicationContext.FIELD) {
            this.setApplicationContext(ApplicationContext.MOUNTAIN_SHELTER);
        }
    }

    private changeTheme() : void {
        let element = document.getElementById("theme-application");

        if (this.app === ApplicationContext.MOUNTAIN_SHELTER) {
            element.setAttribute('href', 'assets/styles/style.refuge.css');
        } else if (this.app === ApplicationContext.FIELD) {
            element.setAttribute('href', 'assets/styles/style.agriculture.css');
        }
    }
}