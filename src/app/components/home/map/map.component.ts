import { Component, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../services/devices/device.service';
import { HttpService } from '../../../services/http/http.service';

export interface Marker {
    lat: number;
    lng: number;
    site: string;
    sensor: string;
    link: string;
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

    constructor(private device : DeviceService, private http : HttpService) {
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
                    this.markers.push({
                        lat: device.latitude,
                        lng: device.longitude,
                        site: device.siteId,
                        sensor: device.name,
                        link: 'http://refugedugouter.ffcam.fr/'
                    });
                });
            }
        );
    }

    public clickedMarker(label: string, index: number) : void {
        // console.log(`clicked the marker: ${label || index}`);
    }

    public mapClicked($event: any) : void {
        // this.markers.push({
        //     lat: $event.coords.lat,
        //     lng: $event.coords.lng,
        //     site: 'site',
        //     sensor: 'sensor',
        //     link: '#'
        // });
    }
}