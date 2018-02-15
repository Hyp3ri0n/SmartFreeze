import { Component } from '@angular/core';
import { LoadingModel } from '../../global/loading/loading.model';
import { Device, DeviceService } from '../../../services/devices/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { SiteService, Site } from '../../../services/sites/site.service';

@Component({
    selector: 'sensor-form',
    templateUrl: './app/components/admin/sensor/form.view.html'
})

export class AdminSensorFormComponent {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private deviceId : string = '';
    private device: Device = null;
    private sites : Site[] = [];
    private zones : string[] = [];

    constructor(private router : ActivatedRoute,
                private route : Router,
                private http : HttpService,
                private deviceService : DeviceService,
                private siteService : SiteService) {
        this.router.params.subscribe(
            params => {
                this.deviceId = params['id'];
            }
        );
    }

    public ngOnInit() : void {
        this.getData();
        this.http.backOnlineEventListener = {component: 'AdminSensorFormComponent', cb : () => this.getData()};
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AdminSensorFormComponent');
    }

    private getData() : void {
        this.device = null;
        this.deviceService.getDevice(this.deviceId).subscribe(
            device => {
                this.device = device;
                this.site_changed(this.device.siteId);
            }
        );
        this.sites = [];
        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
            }
        );
    }

    private site_changed(siteId : string) : void {
        this.zones = [];
        this.siteService.getSite(siteId).subscribe(
            site => {
                this.device.siteId = site.id;
                this.zones = site.zones;
            }
        );
    }

    private zone_changed(zone : string) : void {
        this.device.zone = zone;
    }

    private favorite_changed(value : boolean) : void {
        this.device.isFavorite = value;
    }

    private send_device() : void {
        this.deviceService.setDevice(this.device).subscribe(
            success => {
                /* */
            }
        );
    }
}