import { Component } from '@angular/core';
import { HttpService, MethodRequest } from '../../../../services/http/http.service';
import { Input } from '@angular/core';
import { Site } from '../../../../services/sites/site.service';

export interface Marker {
    lat: number;
    lng: number;
    departement : string;
    region : string;
}

@Component({
    selector: 'map-site',
    templateUrl: './app/components/admin/site/map/mapSite.view.html'
})
export class MapSiteComponent {
    @Input() public site : Site;
    private lng:number = 6.830066;
    private lat:number = 45.851010;
    private zoom:number = 9;
    private marker:Marker[] = [];
    constructor(private http : HttpService) {
        this.marker[0] = {
            lat: this.lat,
            lng: this.lng,
            departement: "",
            region: ""
        };
     }

     public mapClicked($event: any) : void {

        let params = {
            'key' : 'AIzaSyCJVLgZMjujdJhvWfcV12kxSZu01ZL8MHw',
            'latlng' : $event.coords.lat + ',' + $event.coords.lng
        };

        this.http.request(MethodRequest.GET, 'https://maps.googleapis.com/maps/api/geocode/json', params).subscribe(
            msg => {
                this.marker[0] = {
                    lat: $event.coords.lat,
                    lng: $event.coords.lng,
                    departement: msg.results[3].formatted_address,
                    region: msg.results[4].formatted_address
                };
                this.site.latitude = this.marker[0].lat;
                this.site.longitude = this.marker[0].lng;
                this.site.department = this.marker[0].departement;
                this.site.region = this.marker[0].region;
            }
        );
     }
}