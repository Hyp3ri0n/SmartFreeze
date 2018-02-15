import { Component } from '@angular/core';
import { LoadingModel } from '../../global/loading/loading.model';
import { Device, DeviceService } from '../../../services/devices/device.service';
import { Site, SiteService } from '../../../services/sites/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';

@Component({
    selector: 'addSensor',
    templateUrl: './app/components/admin/sensor/addSensor.view.html'
})

export class AddSensorComponent {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private device: Device = null;
    private sites : Site[] = [];
    private zones : string[] = [];

    constructor(private router : ActivatedRoute,
                private route : Router,
                private http : HttpService,
                private deviceService : DeviceService,
                private siteService : SiteService) { /**/ }

    public ngOnInit() : void {
        this.getData();
        this.http.backOnlineEventListener = {component: 'AddSensorComponent', cb : () => this.getData()};

        this.device = {
            id: '',
            name: '',
            isFavorite: false,
            latitude: 0,
            longitude: 0,
            siteId: '',
            activeAlarmsCount: 0,
            hasActiveAlarms: false,
            lastCommunication: new Date(),
            zone: '',
            altitude: 0
        };
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AddSensorComponent');
    }

    private getData() : void {
        this.sites = [];
        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
                this.site_changed(this.sites[0].id);
            }
        );
    }

    private site_changed(siteId : string) : void {
        this.zones = [];
        this.siteService.getSite(siteId).subscribe(
            site => {
                this.device.siteId = site.id;
                this.device.longitude = site.longitude;
                this.device.latitude = site.latitude;
                this.device.altitude = site.altitude;
                this.zones = site.zones;
                this.device.zone = this.zones[0];
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
        this.deviceService.createDevice(this.device).subscribe(
            success => {

            }
        );
    }
}