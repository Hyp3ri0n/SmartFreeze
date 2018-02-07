import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './app/components/root/header/header.view.html',
})

export class HeaderComponent {
    show : string;

    constructor() { this.show = 'none'; }

    private go_clicked() : void {
        if (this.show === 'none') {
            this.show = 'block';
        } else {
            this.show = 'none';
        }
    }
    private close() : void {
        this.show = 'none';
    }
}