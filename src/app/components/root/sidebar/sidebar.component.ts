import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app/components/root/sidebar/sidebar.view.html'
})

export class SidebarComponent {

    constructor(private login : LoginService) { /**/ }
}