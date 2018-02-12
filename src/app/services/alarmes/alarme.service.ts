import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';

export interface Alarme {
    id : string;
    description : string;
    isActive : boolean;
    occuredAt : string;
    type : Type;
    gravity : Gravity;
    shortDescription : string;
    deviceId: string;
}

export enum Type {
    All = 0,
    FreezeWarning = 1,
    ThawWarning = 2,
    DeviceFailure = 3
}

export enum Gravity {
    All = 0,
    Critical = 1,
    Serious = 2,
    Information = 3
}

@Injectable()
export class AlarmeService {

    constructor(private http : HttpService) { /**/ }

    public getAlarmes() : Observable<Alarme[]> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Alarmes', {}).subscribe(
                alarmes => {
                    observer.next(alarmes.items);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getLastAlarmes() : Observable<Alarme[]> {
        return Observable.create((observer) => {
            let params = {
                'rowsPerPage': '5',
                'pageNumber': '1'
            };
            this.http.request(MethodRequest.GET, '/api/Alarmes', params).subscribe(
                alarmes => {
                    observer.next(alarmes.items);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }
}