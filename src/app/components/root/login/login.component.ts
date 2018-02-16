import { Component, OnInit } from '@angular/core';
import { LoginService, ApplicationContext } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './app/components/root/login/login.view.html'
})
export class LoginComponent implements OnInit {

    private currentContext : ApplicationContext = ApplicationContext.MOUNTAIN_SHELTER;

    constructor(private login : LoginService) { /**/ }

    public ngOnInit() : void { /**/ }

    private mountain_clicked() : void {
        this.currentContext = ApplicationContext.MOUNTAIN_SHELTER;
    }

    private field_clicked() : void {
        this.currentContext = ApplicationContext.FIELD;
    }

    private go_clicked() : void {
        this.login.setApplicationContext(this.currentContext);
    }
}