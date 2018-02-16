import { Component, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../services/devices/device.service';
import { HttpService } from '../../../services/http/http.service';
import { SiteService } from '../../../services/sites/site.service';

export interface Marker {
    lat: number;
    lng: number;
    siteName: string;
    sensorName: string;
    siteId: string;
    sensorId: string;
}

@Component({
    selector: 'map',
    templateUrl: './app/components/home/map/map.view.html'
})
export class MapComponent implements OnDestroy {
    private lng:number = 6.830066;
    private lat:number = 45.851010;
    private zoom:number = 9;
    private markers:Marker[] = [];

    constructor(private device : DeviceService, private site : SiteService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'MapComponent', cb : () => this.getData()};
    }


    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('MapComponent');
    }

    private getData() : void {
        this.device.getDevices().subscribe(
            devices => {
                this.markers = [];
                devices.forEach(device => {
                    this.site.getSite(device.siteId).subscribe(
                        site => {
                            this.markers.push({
                                lat: device.latitude,
                                lng: device.longitude,
                                siteName: site.name,
                                sensorName: device.name,
                                sensorId: device.id,
                                siteId: device.siteId
                            });
                        }
                    );
                });
            }
        );
    }

    public clickedMarker(label: string, index: number) : void {}

    public mapClicked($event: any) : void {}
}