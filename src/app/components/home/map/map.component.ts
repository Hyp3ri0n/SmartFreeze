import { Component } from '@angular/core';

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
export class MapComponent {
    private lng:number = 6.830066;
    private lat:number = 45.851010;
    private zoom:number = 9;
    private markers:Marker[] = [];

    constructor() {
        this.markers.push({
            lat: 45.851010,
            lng: 6.830066,
            site: 'Refuge du Goûter',
            sensor: 'G2 - Fondoir',
            link: 'http://refugedugouter.ffcam.fr/'
        });
     }

    public clickedMarker(label: string, index: number) : void {
        console.log(`clicked the marker: ${label || index}`);
    }

    public mapClicked($event: any) : void {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            site: 'site',
            sensor: 'sensor',
            link: '#'
        });
    }
}