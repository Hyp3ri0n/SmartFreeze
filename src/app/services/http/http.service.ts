import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoginService } from '../../components/root/login/login.service';

export enum MethodRequest {
    GET, POST
}

@Injectable()
export class HttpService {

    private ipServer : string = 'http://smartfreeze-back.azurewebsites.net';

    constructor(private http : HttpClient, private login : LoginService) { /**/ }

    public request(method : MethodRequest, url : string, params : any) : Observable<any> {
        return Observable.create((observer) => {

            let finalUrl : string = '';
            let httpOptions = {
                headers : {},
                params : {}
            };

            if (url.startsWith('/')) {
                finalUrl = this.ipServer + url;

                httpOptions = {
                    headers: new HttpHeaders({'Content-Type': ['application/json']}),
                    params: {'Context': '' + this.login.getApplicationContext()}
                };
            } else {
                finalUrl = url;
            }

            // Concat all params
            httpOptions.params = Object.assign({}, httpOptions.params, params);

            if (method === MethodRequest.GET) {
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
            } else if (method === MethodRequest.POST) {
                let body = JSON.stringify(httpOptions.params);
                this.http.post(finalUrl, body, {headers: httpOptions.headers}).subscribe(
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