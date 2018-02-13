import { Component, OnDestroy } from '@angular/core';
import { DeviceService, Device } from '../../services/devices/device.service';
import { Site, SiteService } from '../../services/sites/site.service';
import { LoadingModel } from '../global/loading/loading.model';
import { HttpService } from '../../services/http/http.service';
import { Alarme, AlarmeService } from '../../services/alarmes/alarme.service';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.view.html'
})

export class HomeComponent implements OnDestroy {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private sitesWithFavDevices : Site[] = null;
    private alarmes : any[] = null;

    constructor(private siteService : SiteService, private alarmeService : AlarmeService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'HomeComponent', cb : () => this.getData() };
    }


    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('HomeComponent');
    }

    private getData() : void {
        this.sitesWithFavDevices = null;
        this.siteService.getSiteWithFavDevices().subscribe(
            sites => {
                this.sitesWithFavDevices = sites;
            }
        );
        this.alarmes = null;
        this.alarmeService.getAlarmesWithMoreInfo().subscribe(
            alarmes => {
                this.alarmes = alarmes;
            }
        );
    }

    private getContentHeight() : number {
        return document.getElementById('contentMap').clientHeight;
    }
}