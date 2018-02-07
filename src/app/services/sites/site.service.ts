import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';
import { Device } from '../devices/device.service';

export interface Site {
    id : string;
    devices : Device[];
}

@Injectable()
export class DeviceService {

    constructor(private http : HttpService) { /**/ }

    public getSites() : Observable<Site[]> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Sites', {}).subscribe(
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

    public getFavDevicesFromSite() : Observable<Device[]> {
        return Observable.create((observer) => {
            this.getSites().subscribe(
                devices => {
                    /**/
                }
            );
        });
    }
}