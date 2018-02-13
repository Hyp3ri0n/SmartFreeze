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
    siteId: string;
}

export enum Type {
    All = 0,
    FreezeWarning = 1,
    ThawWarning = 2,
    DeviceFailure = 3,
    CommunicationFailure = 4
}

export enum Gravity {
    All = 0,
    Critical = 1,
    Serious = 2,
    Information = 3
}

@Injectable()
export class AlarmeService {

    public static types: string[] = [];
    public static gravities: string[] = [];

    constructor(private http : HttpService) {
        AlarmeService.types[Type.All] = "Tous";
        AlarmeService.types[Type.CommunicationFailure] = "Communication interrompue";
        AlarmeService.types[Type.DeviceFailure] = "Données incohérentes";
        AlarmeService.types[Type.FreezeWarning] = "Gel";
        AlarmeService.types[Type.ThawWarning] = "Dégel";

        AlarmeService.gravities[Gravity.All] = "Tous";
        AlarmeService.gravities[Gravity.Critical] = "Critique";
        AlarmeService.gravities[Gravity.Information] = "Informative";
        AlarmeService.gravities[Gravity.Serious] = "Sérieuse";
    }

    public getAlarmes() : Observable<Alarme[]> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Alarms', {}).subscribe(
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
            this.http.request(MethodRequest.GET, '/api/Alarms', params).subscribe(
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