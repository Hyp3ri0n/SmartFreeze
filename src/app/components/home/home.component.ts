import { Component, OnDestroy } from '@angular/core';
import { DeviceService, Device } from '../../services/devices/device.service';
import { Site, SiteService } from '../../services/sites/site.service';
import { LoadingModel } from '../global/loading/loading.model';
import { HttpService } from '../../services/http/http.service';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.view.html'
})

export class HomeComponent implements OnDestroy {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private sites : Site[] = null;

    constructor(private siteService : SiteService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'HomeComponent', cb : () => this.getData()};
    }


    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('HomeComponent');
    }

    private getData() : void {
        this.sites = null;
        this.siteService.getSiteWithFavDevices().subscribe(
            sites => {
                this.sites = sites;
                console.log(this.sites);
            }
        );
    }

    private getContentHeight() : number {
        return document.getElementById('content').clientHeight;
    }
}