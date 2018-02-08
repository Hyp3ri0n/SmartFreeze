import { Component } from '@angular/core';
import { DeviceService, Device } from '../../services/devices/device.service';
import { Site, SiteService } from '../../services/sites/site.service';
import { LoadingModel } from '../global/loading/loading.model';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.view.html'
})

export class HomeComponent {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private sites : Site[] = null;

    constructor(private siteService : SiteService) {
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