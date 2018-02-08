import { Component } from '@angular/core';

export interface Marker {
    lat: number;
    lng: number;
    buildingNum : number;
    streetName : string;
}

@Component({
    selector: 'map-site',
    templateUrl: './app/components/admin/site/map/mapSite.view.html'
})
export class MapSiteComponent {
    private lng:number = 6.830066;
    private lat:number = 45.851010;
    private zoom:number = 9;
    private marker:Marker;
    constructor() { /* */
     }

     public mapClicked($event: any) : void {
         this.marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            buildingNum: 0,
            streetName: ""
        };
        //this.getGeoLocation(this.marker.lat, this.marker.lng);
        console.log(this.marker);

     }

     /*
     getGeoLocation(lat: number, lng: number) {
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
            let request = { latLng: latlng };
            geocoder.geocode(request, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                let result = results[0];
                let rsltAdrComponent = result.address_components;
                let resultLength = rsltAdrComponent.length;
                if (result != null) {
                  this.marker.buildingNum = rsltAdrComponent[resultLength - 8 ].short_name;
                  this.marker.streetName = rsltAdrComponent[resultLength - 7 ].short_name;
                } else {
                  alert("No address available!");
                }
              }
            });
        }
        }*/
}