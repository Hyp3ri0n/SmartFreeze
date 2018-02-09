import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';

export interface Device {
    id : string;
    name : string;
    siteId : string;
    isFavorite : boolean;
    lastCommunication : string;
    activeAlarmsCount : number;
    hasActiveAlarms : boolean;
    latitude : number;
    longitude : number;
}

@Injectable()
export class DeviceService {

    constructor(private http : HttpService) { /**/ }

    public getDevice(id : string) : Observable<Device> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Devices/' + id, {}).subscribe(
                device => {
                    observer.next(device);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getDevices() : Observable<Device[]> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Devices', {}).subscribe(
                devices => {
                    observer.next(devices.items);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getFavDevices() : Observable<Device[]> {
        return Observable.create((observer) => {
            this.getDevices().subscribe(
                devices => {
                    let fav : Device[] = [];
                    devices.forEach(device => {
                        if (device.isFavorite) {
                            fav.push(device);
                        }
                    });
                    observer.next(fav);
                }
            );
        });
    }
}