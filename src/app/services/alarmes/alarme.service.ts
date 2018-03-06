import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';
import { DeviceService, Device } from '../devices/device.service';
import { SiteService, Site } from '../sites/site.service';

export interface Alarme {
    id : string;
    description : string;
    isActive : boolean;
    occuredAt : Date;
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

    constructor(private http : HttpService, private device : DeviceService, private site : SiteService) {
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

    public getAlarmes(activeAlarms? : boolean) : Observable<Alarme[]> {
        return Observable.create((observer) => {

            let params = {};
            if (activeAlarms !== undefined) {
                params = {
                    'isActive' : activeAlarms
                };
            }

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

    public setAlarmeAsView(id : string) : Observable<String> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.PUT, '/api/Alarms/' + id + "/ack", {}).subscribe(
                sucess => {
                    observer.next('');
                }
            );
        });
    }

    public getLastAlarmes() : Observable<Alarme[]> {
        return Observable.create((observer) => {
            let params = {
                'rowsPerPage': '5',
                'pageNumber': '1',
                'isRead': false
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

    public getAlarmesWithMoreInfo(activeAlarms? : boolean) : Observable<any[]> {
        return Observable.create((observer) => {
            this.device.getDevices().subscribe(
                devices => {
                    this.site.getSites().subscribe(
                        sites => {
                            this.getAlarmes(activeAlarms).subscribe(
                                alarms => {
                                    let data : any[] = [];
                                    alarms.forEach(alarm => {
                                        let device : Device = null;
                                        devices.forEach(d => {
                                            if (d.id === alarm.deviceId) {
                                                device = d;
                                                return;
                                            }
                                        });
                                        let site : Site = null;
                                        sites.forEach(s => {
                                            if (s.id === alarm.siteId) {
                                                site = s;
                                                return;
                                            }
                                        });
                                        data.push({
                                            id : alarm.id,
                                            description : alarm.description,
                                            isActive : alarm.isActive,
                                            occuredAt : alarm.occuredAt,
                                            type : alarm.type,
                                            gravity : alarm.gravity,
                                            shortDescription : alarm.shortDescription,
                                            deviceId: alarm.deviceId,
                                            deviceName: device.name,
                                            deviceZone: device.zone,
                                            siteId: alarm.siteId,
                                            siteName: site.name,
                                            siteRegion: site.region
                                        });
                                    });
                                    observer.next(data);
                                }
                            );
                        }
                    );
                }
            );
        });
    }

    public getAlarmesWithMoreInfoByDevices(devices : Device[]) : Observable<any[]> {
        return Observable.create((observer) => {
            this.getAlarmes().subscribe(
                alarms => {
                    let data : any[] = [];
                    alarms.forEach(alarm => {
                        let device : Device = null;
                        devices.forEach(d => {
                            if (d.id === alarm.deviceId) {
                                device = d;
                                return;
                            }
                        });
                        if (device != null) {
                          data.push({
                              id : alarm.id,
                              description : alarm.description,
                              isActive : alarm.isActive,
                              occuredAt : alarm.occuredAt,
                              type : alarm.type,
                              gravity : alarm.gravity,
                              shortDescription : alarm.shortDescription,
                              deviceId: alarm.deviceId,
                              deviceName: device.name,
                              deviceZone: device.zone,
                              siteId: alarm.siteId
                          });
                        }
                        observer.next(data);
                    });
                }
            );
        });
    }
}