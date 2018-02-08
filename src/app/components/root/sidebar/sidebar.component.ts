import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app/components/root/sidebar/sidebar.view.html'
})

export class SidebarComponent {

    private activeOffset:number;

    constructor(private login : LoginService) {
        this.activeOffset = 0;
     }
    private go_clicked(offset) : void {
        this.activeOffset = offset;
    }
}