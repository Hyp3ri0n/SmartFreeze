import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';
import { Site } from '../sites/site.service';

export interface Meteo {
    id : number;
    name : string;
    cod : number;
    dt : number;
    base : string;
    sys : {
        message : number;
        country : string;
        sunrise : number;
        sunset : number;
    };
    coord : {
        lon : number;
        lat : number;
    };
    wind : {
        speed : number;
        deg : number;
    };
    clouds : {
        all : number;
    };
    weather : {
        id : number;
        main : string;
        description : string;
        icon : string;
    }[];
}

@Injectable()
export class MeteoService {

    private static apiKey : string = '948a4f8d9d39b26fd733260fe2fd2c41';

    constructor(private http : HttpService) { /**/ }

    public getMeteoFromSite(site : Site) : Observable<Meteo> {
        let params = {
            lat: site.latitude,
            lon: site.longitude,
            appid: MeteoService.apiKey,
            unit: 'metric',
            lang: 'fr'
        };
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, 'http://api.openweathermap.org/data/2.5/weather', params).subscribe(
                meteo => {
                    observer.next(meteo);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getForecastMeteoFromSite(site : Site) : Observable<Meteo[]> {
        let params = {
            lat: site.latitude,
            lon: site.longitude,
            appid: MeteoService.apiKey,
            unit: 'metric',
            lang: 'fr'
        };
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, 'http://api.openweathermap.org/data/2.5/forcast', params).subscribe(
                meteo => {
                    observer.next(meteo.list);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }
}