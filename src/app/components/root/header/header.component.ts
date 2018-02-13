import { Component, OnDestroy } from '@angular/core';
import { Alarme, AlarmeService } from '../../../services/alarmes/alarme.service';
import { HttpService } from '../../../services/http/http.service';

@Component({
    selector: 'app-header',
    templateUrl: './app/components/root/header/header.view.html',
})

export class HeaderComponent implements OnDestroy {
    private show : string = 'none';

    private alarmes : Alarme[] = [];

    constructor(private alarme : AlarmeService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'HeaderComponent', cb : () => this.getData() };
    }

    public ngOnDestroy(): void {
        this.http.removeBackOnlineListener('HeaderComponent');
    }

    private getData() : void {
        this.alarme.getLastAlarmes().subscribe(
            alarmes => {
                this.alarmes = alarmes;
            }
        );
    }

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