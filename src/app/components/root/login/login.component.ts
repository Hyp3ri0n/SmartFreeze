import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './app/components/root/login/login.view.html'
})
export class LoginComponent implements OnInit {

    constructor(private login : LoginService) { /**/ }

    public ngOnInit() : void {
        /**/
    }

    private go_clicked() : void {
        this.login.app = 0;
    }
}