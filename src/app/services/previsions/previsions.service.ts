import { HttpService, MethodRequest } from '../http/http.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export enum TrustIndication {
    NONE, LOW, MEDIUM, HIGH, IMINENT
}

export interface HalfDayForecast {
    trustIndication: TrustIndication;
    deviceId: string;
}

export interface ForecastDay  {
    date: Date;
    morning: HalfDayForecast;
    afternoon: HalfDayForecast;
}

export interface ForecastWeek {
    id:string;
    forecast: ForecastDay[];
}

@Injectable()
export class PrevisionsService {
    constructor(private http : HttpService) {
        /** */
    }


    public getPrevisionsForSite(id : string) : Observable<ForecastWeek> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Sites/' + id + "/freeze", {}).subscribe(
                previsions => {
                    console.log(previsions);
                    observer.next(previsions);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }
}