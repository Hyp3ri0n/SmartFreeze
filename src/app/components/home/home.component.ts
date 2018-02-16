import { Component, OnDestroy } from '@angular/core';
import { DeviceService, Device } from '../../services/devices/device.service';
import { Site, SiteService } from '../../services/sites/site.service';
import { LoadingModel } from '../global/loading/loading.model';
import { HttpService } from '../../services/http/http.service';
import { Alarme, AlarmeService, Gravity } from '../../services/alarmes/alarme.service';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.view.html'
})

export class HomeComponent implements OnDestroy {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private sitesWithFavDevices : Site[] = null;
    private alarmes : any[] = null;
    private sites : Site[] = null;
    private devices : Device[] = null;

    // tslint:disable-next-line:max-line-length
    constructor(private siteService : SiteService, private deviceService : DeviceService, private alarmeService : AlarmeService, private http : HttpService) {
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
        this.sites = null;
        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
            }
        );
        this.devices = null;
        this.deviceService.getDevices().subscribe(
            devices => {
                this.devices = devices;
            }
        );
        this.alarmes = null;
        this.alarmeService.getAlarmesWithMoreInfo().subscribe(
            alarmes => {
                this.alarmes = alarmes;
            }
        );
    }

    private getNbAlarmesCritiques() : number {
        let nbAlarmesCritiques = 0;
        this.alarmes.forEach(alarme => {
            if (alarme.gravity === Gravity.Critical) {
                nbAlarmesCritiques++;
            }
       });
       return nbAlarmesCritiques;
    }

    private getNbSitesCritiques() : number {
        let sitesCritiques : string[] = [];

        this.alarmes.forEach(alarme => {
            if (alarme.gravity === Gravity.Critical) {
                if (sitesCritiques.find(alarme.siteId) === undefined) {
                    sitesCritiques.push(alarme.siteId);
                }
            }
        });
        return sitesCritiques.length;
    }

    private getNbDevicesCritiques() : number {
        let devicesCritiques : string[] = [];

        this.alarmes.forEach(alarme => {
            if (alarme.gravity === Gravity.Critical) {
                if (devicesCritiques.find(alarme.deviceId) === undefined) {
                    devicesCritiques.push(alarme.deviceId);
                }
            }
        });
        return devicesCritiques.length;
    }

    private getContentHeight() : number {
        return document.getElementById('contentMap').clientHeight;
    }
}