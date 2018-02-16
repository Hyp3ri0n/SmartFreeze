import { Component } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app/components/root/footer/footer.view.html'
})

export class FooterComponent {

    constructor(private http : HttpService) { /**/ }
}