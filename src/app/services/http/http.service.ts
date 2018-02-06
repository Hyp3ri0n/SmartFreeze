import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export enum MethodRequest {
    GET, POST
}

@Injectable()
export class HttpService {

    private ipServer : string = 'http://smartfreeze-back.azurewebsites.net';

    constructor(private http : HttpClient) { /**/ }

    public request(method : MethodRequest, url : string, params : any) : Observable<any> {
        return Observable.create((observer) => {

            let finalUrl = this.ipServer + url;

            let httpOptions = {
                headers: new HttpHeaders({'Content-Type': ['application/json']}),
                params: {}
            };

            if (method === MethodRequest.GET) {
                httpOptions.params = params;
                this.http.get(finalUrl, httpOptions).subscribe(
                    data => {
                        console.log('[HTTP] sucess request GET on : ' + finalUrl);
                        console.log(data);
                        observer.next(data);
                    },
                    err => {
                        console.error('[HTTP] error request GET on : ' + finalUrl);
                        console.error(err);
                        observer.error(err);
                    }
                );
            } else {
                let body = JSON.stringify(params);
                this.http.post(finalUrl, body, httpOptions).subscribe(
                    data => {
                        console.log('[HTTP] sucess request POST on : ' + finalUrl);
                        console.log(data);
                        observer.next(data);
                    },
                    err => {
                        console.error('[HTTP] error request POST on : ' + finalUrl);
                        console.error(err);
                        observer.error(err);
                    }
                );
            }
        });
    }
}