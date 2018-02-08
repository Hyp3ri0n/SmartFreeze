import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpService, MethodRequest } from '../http/http.service';
import { Device, DeviceService } from '../devices/device.service';
import { ApplicationContext } from '../../components/root/login/login.service';

export interface Site {
    id : string;
    name : string;
    description : string;
    imageUri : string;
    department : string;
    region : string;
    siteType : ApplicationContext;
    hasActiveAlarms : boolean;  // ?
    activeAlarmsCount : number; // ?
    latitude : number;
    longitude : number;
    surfaceArea : number;
    surfaceAreaUnit : string;
    zones : string[];
    devices : Device[];
}

@Injectable()
export class SiteService {

    constructor(private http : HttpService, private deviceService : DeviceService) { /**/ }

    public getSite(id : string) : Observable<Site[]> {
        return Observable.create((observer) => {
            let params = {
                'sitedId' : id
            };
            this.http.request(MethodRequest.GET, '/api/Sites', params).subscribe(
                site => {
                    observer.next(site);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }
    public getSites() : Observable<Site[]> {
        return Observable.create((observer) => {
            this.http.request(MethodRequest.GET, '/api/Sites', {}).subscribe(
                sites => {
                    observer.next(sites.items);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getSitesWithIds(ids : string[]) : Observable<Site[]> {
        return Observable.create((observer) => {
            let param : string = '[';
            ids.forEach(id => {
                param += '\"' + id + '\"';
                if (ids.indexOf(id) !== ids.length - 1) {
                    param += ',';
                }
            });
            param += ']';
            let params = {
                "ids" : param
            };
            this.http.request(MethodRequest.GET, '/api/Sites/ids', params).subscribe(
                sites => {
                    observer.next(sites.items);
                },
                err => {
                    // TODO send test
                    observer.next({test : 'TEST'});
                }
            );
        });
    }

    public getSiteWithFavDevices() : Observable<Site[]> {
        return Observable.create((observer) => {
            this.deviceService.getFavDevices().subscribe(
                devices => {
                    let ids : string[] = [];
                    devices.forEach(device => {
                        if (ids.indexOf(device.siteId) === -1) {
                            ids.push(device.siteId);
                        }
                    });
                    this.getSitesWithIds(ids).subscribe(
                        sites => {
                            observer.next(sites);
                        }
                    );
                }
            );
        });
    }
}